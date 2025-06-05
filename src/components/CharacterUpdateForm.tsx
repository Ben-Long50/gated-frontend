import { useContext, useEffect, useRef, useState } from 'react';
import InputField from './InputField';
import { ThemeContext } from '../contexts/ThemeContext';
import BtnRect from './buttons/BtnRect';
import AttributeCard from './AttributeCard';
import { AuthContext } from '../contexts/AuthContext';
import { useForm, ValidationError } from '@tanstack/react-form';
import useAttributeTree from '../hooks/useAttributeTree';
import StatBar from './StatBar';
import usePerks from '../hooks/usePerks';
import Icon from '@mdi/react';
import { mdiAlertOutline, mdiCircleOutline } from '@mdi/js';
import HealthIcon from './icons/HealthIcon';
import { LayoutContext } from '../contexts/LayoutContext';
import SanityIcon from './icons/SanityIcon';
import { useParams } from 'react-router-dom';
import useUpdateCharacterMutation from '../hooks/useCharacterUpdateMutation/useCharacterUpdateMutation';
import useDeleteCharacterMutation from '../hooks/useDeleteCharacterMutation/useDeleteCharacterMutation';
import Loading from './Loading';
import FormLayout from '../layouts/FormLayout';
import useCharacterQuery from '../hooks/useCharacterQuery/useCharacterQuery';
import { Perk } from 'src/types/perk';
import InputFieldRadio from './InputFieldRadio';
import ArrowHeader2 from './ArrowHeader2';
import Divider from './Divider';
import useCampaignsQuery from '../hooks/useCampaignsQuery/useCampaignsQuery';
import InputSelectField from './InputSelectField';
import InjuryIcon from './icons/InjuryIcon';
import InsanityIcon from './icons/InsanityIcon';
import PerkLinkField from './form_fields/PerkLinkField';
import NpcPreferenceField from './form_fields/NpcPreferenceField';
import PictureField from './form_fields/PictureField';
import useCharacter from 'src/hooks/useCharacter';

const CharacterUpdateForm = () => {
  const { apiUrl } = useContext(AuthContext);
  const { statColorMap } = useContext(ThemeContext);
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
  } = useCharacterQuery(apiUrl, Number(characterId));

  const {
    filteredCharacter,
    isLoading: inventoryLoading,
    isPending: inventoryPending,
  } = useCharacter(character);

  const isLoading = characterLoading || campaignsLoading || inventoryLoading;
  const isPending = characterPending || campaignsPending || inventoryPending;

  const attributeTree = useAttributeTree(filteredCharacter?.attributes);
  const perks = usePerks(attributeTree?.tree);

  const updateCharacter = useUpdateCharacterMutation(
    apiUrl,
    Number(characterId),
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
      playerCharacter: filteredCharacter?.playerCharacter ?? '',
      campaignId: filteredCharacter?.campaign ?? null,
      preferences: {
        firstName: filteredCharacter?.preferences?.firstName ?? true,
        lastName: filteredCharacter?.preferences?.lastName ?? true,
        age: filteredCharacter?.preferences?.age ?? true,
        height: filteredCharacter?.preferences?.height ?? true,
        weight: filteredCharacter?.preferences?.weight ?? true,
        sex: filteredCharacter?.preferences?.sex ?? true,
        picture: filteredCharacter?.preferences?.picture ?? true,
        backstory: filteredCharacter?.preferences?.backstory ?? true,
        level: filteredCharacter?.preferences?.level ?? true,
        profits: filteredCharacter?.preferences?.profits ?? true,
        stats: filteredCharacter?.preferences?.stats ?? true,
        attributes: filteredCharacter?.preferences?.attributes ?? true,
        perks: filteredCharacter?.preferences?.perks ?? true,
        equipment: filteredCharacter?.preferences?.equipment ?? true,
      },
      firstName: filteredCharacter?.firstName ?? '',
      lastName: filteredCharacter?.lastName ?? '',
      level: filteredCharacter?.level ?? '',
      profits: filteredCharacter?.profits ?? '',
      stats: {
        currentHealth: filteredCharacter?.stats.currentHealth ?? '',
        currentSanity: filteredCharacter?.stats.currentSanity ?? '',
        injuries: filteredCharacter?.stats.injuries ?? '',
        insanities: filteredCharacter?.stats.insanities ?? '',
      },
      picture: filteredCharacter?.picture ?? '',
      position: filteredCharacter?.picture?.position ?? { x: 50, y: 50 },
      height: filteredCharacter?.height ?? '',
      weight: filteredCharacter?.weight ?? '',
      age: filteredCharacter?.age ?? '',
      sex: filteredCharacter?.sex ?? '',
      attributes: filteredCharacter?.attributes ?? '',
      perks: filteredCharacter?.perks ?? ([] as Perk[]),
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
    characterUpdateForm.setFieldValue('attributes', attributeTree.tree);
  }, [attributeTree, characterUpdateForm]);

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
        <NpcPreferenceField form={characterUpdateForm} />
        <Divider />
        <ArrowHeader2 title="Character Information" />
        <div className="grid w-full gap-8 max-sm:col-span-2 max-sm:grid-flow-row sm:grid-cols-2">
          <PictureField
            form={characterUpdateForm}
            sizeInfo={{
              aspectRatio: '1/1',
              maxHeight: '',
              minHeight: '',
            }}
          />
          <div className="flex w-full flex-col gap-8">
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
                  <InputSelectField
                    label="Sex"
                    field={field}
                    options={['male', 'female']}
                  />
                )}
              </characterUpdateForm.Field>
            </div>
          </div>
        </div>
        <div
          className={`${cardRef.current?.offsetWidth < 500 ? 'gap-2' : 'gap-4'} grid h-full w-full grow grid-cols-[auto_auto_1fr_auto] place-items-center gap-y-2`}
        >
          {filteredCharacter?.stats.currentHealth !== undefined && (
            <characterUpdateForm.Field name="stats.currentHealth">
              {(field) => (
                <StatBar
                  title="Health"
                  current={field.state.value}
                  total={filteredCharacter?.stats.maxHealth}
                  color={statColorMap['Health']}
                  cardWidth={cardRef.current?.offsetWidth}
                  mutation={(value: number) =>
                    field.handleChange(field.state.value + value)
                  }
                  mode="adjustable"
                >
                  <HealthIcon className="text-secondary size-8" />
                </StatBar>
              )}
            </characterUpdateForm.Field>
          )}
          {filteredCharacter?.stats.currentSanity !== undefined && (
            <characterUpdateForm.Field name="stats.currentSanity">
              {(field) => (
                <StatBar
                  title="Sanity"
                  current={field.state.value}
                  total={filteredCharacter?.stats.maxSanity}
                  color={statColorMap['Sanity']}
                  cardWidth={cardRef.current?.offsetWidth}
                  mutation={(value: number) =>
                    field.handleChange(field.state.value + value)
                  }
                  mode="adjustable"
                >
                  <SanityIcon className="text-secondary size-8" />
                </StatBar>
              )}
            </characterUpdateForm.Field>
          )}
          <characterUpdateForm.Field
            name="stats.injuries"
            validators={{
              onChange: ({ value }) => {
                if (value > filteredCharacter?.stats.permanentInjuries) {
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
                  className={`${mobile ? 'col-span-4 gap-0' : 'col-span-3 gap-2'} flex grow items-center justify-self-end`}
                >
                  {Array.from({
                    length: filteredCharacter?.stats.permanentInjuries,
                  }).map((_, index) => (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        if (field.state.value === 1 && index === 0) {
                          field.handleChange(index);
                        } else {
                          field.handleChange(index + 1);
                        }
                      }}
                    >
                      {index < field.state.value ? (
                        <InjuryIcon
                          key={index}
                          className="text-secondary size-7 shrink-0 sm:size-8"
                        />
                      ) : (
                        <Icon
                          path={mdiCircleOutline}
                          key={index}
                          className="text-tertiary size-7 shrink-0 p-1 sm:size-8"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </characterUpdateForm.Field>
          <characterUpdateForm.Field
            name="stats.insanities"
            validators={{
              onChange: ({ value }) => {
                if (value > filteredCharacter?.stats.permanentInsanities) {
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
                  className={`${mobile ? 'col-span-4 gap-0' : 'col-span-3 gap-2'} flex grow items-center justify-self-end`}
                >
                  {Array.from({
                    length: filteredCharacter?.stats.permanentInsanities,
                  }).map((_, index) => (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        if (field.state.value === 1 && index === 0) {
                          field.handleChange(index);
                        } else {
                          field.handleChange(index + 1);
                        }
                      }}
                    >
                      {index < field.state.value ? (
                        <InsanityIcon
                          key={index}
                          className="text-secondary size-7 shrink-0 sm:size-8"
                        />
                      ) : (
                        <Icon
                          path={mdiCircleOutline}
                          key={index}
                          className="text-tertiary size-7 shrink-0 p-1 sm:size-8"
                        />
                      )}
                    </button>
                  ))}
                </div>
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
        <p className="text-secondary border-l-2 border-gray-400 border-opacity-50 pl-4">
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
