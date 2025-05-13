import { useContext, useEffect, useRef, useState } from 'react';
import InputField from './InputField';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import BtnRect from './buttons/BtnRect';
import AttributeCard from './AttributeCard';
import { AuthContext } from '../contexts/AuthContext';
import { useForm, ValidationError } from '@tanstack/react-form';
import useAttributeTree from '../hooks/useAttributeTree';
import SelectField from './SelectField';
import StatBar from './StatBar';
import PerkList from './PerkList';
import usePerks from '../hooks/usePerks';
import Icon from '@mdi/react';
import {
  mdiAlertOutline,
  mdiCircleOutline,
  mdiCloseBox,
  mdiImagePlus,
} from '@mdi/js';
import HealthIcon from './icons/HealthIcon';
import { LayoutContext } from '../contexts/LayoutContext';
import SanityIcon from './icons/SanityIcon';
import { useParams } from 'react-router-dom';
import useUpdateCharacterMutation from '../hooks/useCharacterUpdateMutation/useCharacterUpdateMutation';
import useDeleteCharacterMutation from '../hooks/useDeleteCharacterMutation/useDeleteCharacterMutation';
import Loading from './Loading';
import FormLayout from '../layouts/FormLayout';
import useCharacterQuery from '../hooks/useCharacterQuery/useCharacterQuery';
import useStats from '../hooks/useStats';
import { Perk } from 'src/types/perk';
import InputFieldRadio from './InputFieldRadio';
import ArrowHeader2 from './ArrowHeader2';
import Divider from './Divider';
import useCampaignsQuery from '../hooks/useCampaignsQuery/useCampaignsQuery';
import InputSelectField from './InputSelectField';
import ArrowHeader3 from './ArrowHeader3';
import { AttributeName, SkillName } from 'src/types/attributeTree';
import InjuryIcon from './icons/InjuryIcon';
import InsanityIcon from './icons/InsanityIcon';
import PerkLinkField from './form_fields/PerkLinkField';

const CharacterUpdateForm = () => {
  const { apiUrl } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);
  const { layoutSize, mobile } = useContext(LayoutContext);
  const { characterId } = useParams();
  const [formMessage, setFormMessage] = useState('');
  const [deleteMode, setDeleteMode] = useState(false);

  const cardRef = useRef(null);

  const {
    data: campaigns,
    isLoading: campaignsLoading,
    isPending: campaignsPending,
  } = useCampaignsQuery(apiUrl);

  const {
    data: character,
    isLoading: characterLoading,
    isPending: characterPending,
  } = useCharacterQuery(apiUrl, characterId);

  const isLoading = characterLoading || campaignsLoading;
  const isPending = characterPending || campaignsPending;

  const [imagePreview, setImagePreview] = useState(character?.picture.imageUrl);

  const attributeTree = useAttributeTree(character?.attributes);
  const perks = usePerks(attributeTree?.tree);

  const { stats } = useStats(
    character?.characterInventory,
    attributeTree.tree,
    character?.perks,
  );

  const updateCharacter = useUpdateCharacterMutation(
    apiUrl,
    characterId,
    setFormMessage,
  );
  const deleteCharacter = useDeleteCharacterMutation(apiUrl, characterId);

  const handleDelete = () => {
    if (deleteMode) {
      deleteCharacter.mutate();
    } else {
      setDeleteMode(true);
    }
  };

  const handleReset = async () => {
    characterUpdateForm.reset();
  };

  const characterUpdateForm = useForm({
    defaultValues: {
      playerCharacter: character?.playerCharacter ?? '',
      campaignId: character?.campaign ?? null,
      firstName: character?.firstName ?? '',
      lastName: character?.lastName ?? '',
      level: character?.level ?? '',
      profits: character?.profits ?? '',
      stats: {
        currentHealth: character?.stats.currentHealth ?? '',
        currentSanity: character?.stats.currentSanity ?? '',
        injuries: character?.stats.injuries ?? '',
        insanities: character?.stats.insanities ?? '',
      },
      picture: character?.picture ?? '',
      height: character?.height ?? '',
      weight: character?.weight ?? '',
      age: character?.age ?? '',
      sex: character?.sex ?? '',
      attributes: character?.attributes ?? '',
      perks: character?.perks ?? ([] as Perk[]),
    },
    onSubmit: async ({ value }) => {
      value.campaignId = value.campaignId?.id ? value.campaignId.id : null;
      const formData = new FormData();

      Object.entries(value).forEach(([key, val]) => {
        if (key === 'perks') {
          const perkIds = val.map((perk: Perk) => perk.id) || [];
          formData.append(key, JSON.stringify(perkIds));
        } else if (key === 'picture') {
          if (val instanceof File) {
            formData.append(key, val);
          } else {
            formData.append(key, JSON.stringify(val));
          }
        } else {
          formData.append(key, JSON.stringify(val));
        }
      });
      updateCharacter.mutate(formData);
    },
  });

  useEffect(() => {
    characterUpdateForm.setFieldValue(
      'attributes',
      attributeTree.destructureTree(),
    );
  }, [attributeTree, characterUpdateForm]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // Get the selected file

    if (selectedFile) {
      characterUpdateForm.setFieldValue('picture', selectedFile);

      // Create a URL for the selected file to preview
      const fileUrl = URL.createObjectURL(selectedFile);
      setImagePreview(fileUrl);
    }
  };

  if (perks.isLoading || perks.isPending || isLoading || isPending) {
    return <Loading />;
  }

  return (
    <FormLayout
      itemId={characterId}
      createMutation={updateCharacter}
      deleteMutation={deleteCharacter}
      handleDelete={handleDelete}
      handleReset={handleReset}
      formMessage={formMessage}
      deleteMode={deleteMode}
      setDeleteMode={setDeleteMode}
    >
      <form
        ref={cardRef}
        className="flex flex-col gap-8"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          characterUpdateForm.handleSubmit();
        }}
      >
        <h1 className="text-center">Update Character</h1>
        <Divider />
        <ArrowHeader2 title="Campaign Information" />
        <characterUpdateForm.Field
          name="playerCharacter"
          validators={{
            onSubmit: ({ value }) =>
              typeof value !== 'boolean'
                ? 'You must choose whether this character is a playable character'
                : undefined,
          }}
        >
          {(field) => (
            <>
              <InputFieldRadio
                label="Player Character"
                field={field}
                checked={field.state.value === true}
                onChange={() => field.handleChange(true)}
              />
              <InputFieldRadio
                label="Non-player Character"
                field={field}
                checked={field.state.value === false}
                onChange={() => field.handleChange(false)}
              />
              {field.state.meta.errors &&
                field.state.meta.errors.map((error: ValidationError) => (
                  <p
                    key={error?.toString()}
                    className="timing text-error col-span-2 mt-1 text-base italic leading-5"
                    role="alert"
                  >
                    {error}
                  </p>
                ))}
            </>
          )}
        </characterUpdateForm.Field>
        <characterUpdateForm.Field name="campaignId">
          {(field) => (
            <InputSelectField
              className="w-full"
              field={field}
              label="Campaign"
              options={campaigns}
            />
          )}
        </characterUpdateForm.Field>
        <Divider />
        <ArrowHeader2 title="Character Information" />
        <div className="flex w-full flex-col gap-8 sm:flex-row">
          <ThemeContainer
            className="mx-auto w-full max-w-sm"
            chamfer="medium"
            borderColor={accentPrimary}
          >
            {!imagePreview ? (
              <label className="flex aspect-square size-full w-full cursor-pointer flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center gap-2 pb-6 pt-5">
                  <Icon
                    className="text-tertiary"
                    path={mdiImagePlus}
                    size={3}
                  />
                  <p className="text-tertiary font-semibold">
                    Upload character picture
                  </p>
                  <p className="text-tertiary">PNG, JPG, JPEG</p>
                </div>
                <input
                  id="file"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            ) : (
              <div className="bg-secondary relative flex aspect-square max-w-4xl items-center justify-center overflow-hidden bg-black clip-6">
                <img
                  className="fade-in-bottom"
                  src={imagePreview}
                  alt="Preview"
                />
                <button
                  className="text-secondary absolute right-2 top-2"
                  onClick={() => {
                    characterUpdateForm.setFieldValue('picture', '');
                    setImagePreview('');
                  }}
                >
                  <Icon path={mdiCloseBox} size={1.5} />
                </button>
              </div>
            )}
          </ThemeContainer>
          <div className="flex w-full flex-col gap-8 max-sm:col-span-2">
            <characterUpdateForm.Field
              name="firstName"
              validators={{
                onChange: ({ value }) =>
                  value.length < 2
                    ? 'First name must be at least 2 characters long'
                    : undefined,
              }}
            >
              {(field) => (
                <InputField
                  className="w-full"
                  label="First name"
                  field={field}
                />
              )}
            </characterUpdateForm.Field>
            <characterUpdateForm.Field name="lastName">
              {(field) => (
                <InputField
                  className="w-full"
                  label="Last name"
                  field={field}
                />
              )}
            </characterUpdateForm.Field>
            <div className="grid grid-cols-2 gap-4 sm:gap-8">
              <characterUpdateForm.Field
                name="level"
                validators={{
                  onChange: ({ value }) =>
                    value < 1
                      ? 'You cannot be a lower level than 1'
                      : undefined,
                }}
              >
                {(field) => (
                  <InputField type="number" label="Level" field={field} />
                )}
              </characterUpdateForm.Field>
              <characterUpdateForm.Field name="profits">
                {(field) => (
                  <InputField type="number" label="Profits" field={field} />
                )}
              </characterUpdateForm.Field>
              <characterUpdateForm.Field name="height">
                {(field) => (
                  <InputField type="number" label="Height (in)" field={field} />
                )}
              </characterUpdateForm.Field>
              <characterUpdateForm.Field name="weight">
                {(field) => (
                  <InputField
                    type="number"
                    label="Weight (lbs)"
                    field={field}
                  />
                )}
              </characterUpdateForm.Field>
              <characterUpdateForm.Field name="age">
                {(field) => (
                  <InputField type="number" label="Age (yrs)" field={field} />
                )}
              </characterUpdateForm.Field>
              <characterUpdateForm.Field name="sex">
                {(field) => (
                  <SelectField type="select" label="Sex" field={field}>
                    <option defaultValue="" disabled></option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </SelectField>
                )}
              </characterUpdateForm.Field>
            </div>
          </div>
        </div>
        <div
          className={`${mobile ? 'grid-cols-[0px_auto_1fr_auto_auto]' : 'grid-cols-[auto_auto_1fr_auto_auto]'} grid w-full items-center gap-4`}
        >
          <characterUpdateForm.Field
            name="stats.currentHealth"
            validators={{
              onChange: ({ value }) => {
                if (value > stats.maxHealth) {
                  return 'Cannot exceed max health';
                } else if (value < 0) {
                  return 'Health cannot be lower than 0';
                }
                return undefined;
              },
            }}
          >
            {(field) => (
              <>
                <StatBar
                  title={mobile ? '' : 'Health'}
                  mode="edit"
                  current={field.state.value}
                  total={stats.maxHealth}
                  color="rgb(248 113 113)"
                  cardWidth={cardRef.current?.offsetWidth}
                >
                  <HealthIcon
                    className={`${mobile && 'col-span-2'} text-secondary size-8`}
                  />
                </StatBar>
                <InputField
                  className="w-28 justify-self-end"
                  field={field}
                  label="Cur. health"
                  type="number"
                />
              </>
            )}
          </characterUpdateForm.Field>
          <characterUpdateForm.Field
            name="stats.currentSanity"
            validators={{
              onChange: ({ value }) => {
                if (value > stats.maxSanity) {
                  return 'Cannot exceed max sanity';
                } else if (value < 0) {
                  return 'Sanity cannot be lower than 0';
                }
                return undefined;
              },
            }}
          >
            {(field) => (
              <>
                <StatBar
                  title={mobile ? '' : 'Sanity'}
                  mode="edit"
                  current={field.state.value}
                  total={stats.maxSanity}
                  color="rgb(96 165 250)"
                  cardWidth={cardRef.current?.offsetWidth}
                >
                  <SanityIcon
                    className={`${mobile && 'col-span-2'} text-secondary size-8`}
                  />
                </StatBar>
                <InputField
                  className="w-28 justify-self-end"
                  field={field}
                  label="Cur. sanity"
                  type="number"
                />
              </>
            )}
          </characterUpdateForm.Field>
          <characterUpdateForm.Field
            name="stats.injuries"
            validators={{
              onChange: ({ value }) => {
                if (value > stats.permanentInjuries) {
                  return 'Cannot exceed max injuries';
                } else if (value < 0) {
                  return 'Injuries cannot be lower than 0';
                }
                return undefined;
              },
            }}
          >
            {(field) => (
              <>
                {!mobile && <h4>Injuries</h4>}
                <div
                  className={`${mobile ? 'col-span-4 gap-0' : 'col-span-3 gap-2'} flex grow items-center`}
                >
                  {Array.from({ length: field.state.value }).map((_, index) => (
                    <InjuryIcon
                      key={index}
                      className="text-secondary size-7 shrink-0 sm:size-8"
                    />
                  ))}
                  {Array.from({
                    length: stats.permanentInjuries - field.state.value,
                  }).map((_, index) => (
                    <Icon
                      path={mdiCircleOutline}
                      key={index}
                      className="text-tertiary size-7 shrink-0 p-1 sm:size-8"
                    />
                  ))}
                </div>
                <InputField
                  className="w-28 justify-self-end"
                  field={field}
                  label="Injuries"
                  type="number"
                />
              </>
            )}
          </characterUpdateForm.Field>
          <characterUpdateForm.Field
            name="stats.insanities"
            validators={{
              onChange: ({ value }) => {
                if (value > stats.permanentInsanities) {
                  return 'Cannot exceed max insanities';
                } else if (value < 0) {
                  return 'Insanities cannot be lower than 0';
                }
                return undefined;
              },
            }}
          >
            {(field) => (
              <>
                {!mobile && <h4>Insanities</h4>}
                <div
                  className={`${mobile ? 'col-span-4 gap-0' : 'col-span-3 gap-2'} flex grow items-center`}
                >
                  {Array.from({ length: field.state.value }).map((_, index) => (
                    <InsanityIcon
                      key={index}
                      className="text-secondary size-7 shrink-0 sm:size-8"
                    />
                  ))}
                  {Array.from({
                    length: stats.permanentInsanities - field.state.value,
                  }).map((_, index) => (
                    <Icon
                      path={mdiCircleOutline}
                      key={index}
                      className="text-tertiary size-7 shrink-0 p-1 sm:size-8"
                    />
                  ))}
                </div>
                <InputField
                  className="w-28 justify-self-end"
                  field={field}
                  label="Insanities"
                  type="number"
                />
              </>
            )}
          </characterUpdateForm.Field>
        </div>
        <ArrowHeader2 title="Attributes and Skills" />
        <div className="flex w-full grow flex-col gap-6 lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:gap-10">
          {Object.entries(attributeTree.tree).map(
            ([attribute, { points, skills }]) => (
              <div key={attribute}>
                <AttributeCard
                  attribute={attribute}
                  points={points}
                  skills={skills}
                  updatePoints={attributeTree.updatePoints}
                />
              </div>
            ),
          )}
        </div>
        <Divider />
        <ArrowHeader2 title="Manage Perks" />
        <p className="text-tertiary border-l border-gray-400 pl-4">
          Select the perks associated with your character. Available perks are
          only shown if you meet the attribute and skill point requirements
        </p>
        <div className="flex flex-col gap-4">
          <PerkLinkField
            form={characterUpdateForm}
            perkTree={perks.filteredPerkTree}
          />
        </div>
        <Divider />
        <div className="flex flex-col gap-4 sm:gap-8">
          <BtnRect
            ariaLabel="Update character"
            type="submit"
            className="group w-full"
          >
            {updateCharacter.isPending ? (
              <Loading
                className="group-hover:text-yellow-300 dark:text-gray-900"
                size={1.15}
              />
            ) : (
              'Update'
            )}
          </BtnRect>
          {deleteMode && (
            <div className="col-span-2 flex flex-col items-center justify-center gap-2 lg:gap-4">
              <div className="flex items-center gap-4 self-start">
                <Icon
                  className="text-error shrink-0"
                  path={mdiAlertOutline}
                  size={layoutSize === 'large' ? 2 : 1.5}
                />
                <h2 className="text-error font-semibold">Warning: </h2>
              </div>
              <p className="text-error">
                You are about to permenantly delete this character. This action
                cannot be undone and all data relating to this character will be
                gone forever. To continue, click the "Delete character" button
                again.
              </p>
            </div>
          )}
        </div>
      </form>
    </FormLayout>
  );
};

export default CharacterUpdateForm;
