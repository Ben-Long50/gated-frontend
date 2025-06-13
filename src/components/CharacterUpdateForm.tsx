import { useContext, useRef, useState } from 'react';
import InputField from './InputField';
import { ThemeContext } from '../contexts/ThemeContext';
import BtnRect from './buttons/BtnRect';
import { AuthContext } from '../contexts/AuthContext';
import { useForm, ValidationError } from '@tanstack/react-form';
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
import { Perk } from 'src/types/perk';
import InputFieldRadio from './InputFieldRadio';
import ArrowHeader2 from './ArrowHeader2';
import Divider from './Divider';
import useCampaignsQuery from '../hooks/useCampaignsQuery/useCampaignsQuery';
import InputSelectField from './InputSelectField';
import InjuryIcon from './icons/InjuryIcon';
import InsanityIcon from './icons/InsanityIcon';
import PerkLinkField from './formFields/PerkLinkField';
import NpcPreferenceField from './formFields/NpcPreferenceField';
import PictureField from './formFields/PictureField';
import useCharacter from 'src/hooks/useCharacter';
import AttributeField from './formFields/AttributeField';
import CyberIcon from './icons/CyberIcon';
import EquipIcon from './icons/EquipIcon';

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
    filteredCharacter: character,
    isLoading: characterLoading,
    isPending: characterPending,
  } = useCharacter(Number(characterId));

  const isLoading = characterLoading || campaignsLoading;
  const isPending = characterPending || campaignsPending;

  const perks = usePerks(character?.attributes);

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
      playerCharacter: character?.playerCharacter ?? '',
      campaignId: character?.campaign ?? null,
      npcTypes:
        character?.npcTypes ?? (character?.playerCharacter ? null : ['']),
      preferences: {
        firstName: character?.preferences?.firstName ?? true,
        lastName: character?.preferences?.lastName ?? true,
        age: character?.preferences?.age ?? true,
        height: character?.preferences?.height ?? true,
        weight: character?.preferences?.weight ?? true,
        sex: character?.preferences?.sex ?? true,
        picture: character?.preferences?.picture ?? true,
        backstory: character?.preferences?.backstory ?? true,
        level: character?.preferences?.level ?? true,
        profits: character?.preferences?.profits ?? true,
        stats: character?.preferences?.stats ?? true,
        attributes: character?.preferences?.attributes ?? true,
        perks: character?.preferences?.perks ?? true,
        equipment: character?.preferences?.equipment ?? true,
      },
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
      position: character?.picture?.position ?? { x: 50, y: 50 },
      height: character?.height ?? '',
      weight: character?.weight ?? '',
      age: character?.age ?? '',
      sex: character?.sex ?? '',
      attributes: character?.attributes ?? '',
      perks: character?.perks ?? ([] as Perk[]),
    },
    onSubmit: async ({ value }) => {
      value.campaignId = value.campaignId?.id ? value.campaignId.id : null;
      value.npcTypes = value.npcTypes
        ? value.npcTypes.filter((type) => type)
        : null;

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
          listeners={{
            onChange: ({ value }) => {
              if (value) {
                characterUpdateForm.setFieldValue('npcTypes', null);
              } else if (!value) {
                characterUpdateForm.setFieldValue('npcTypes', ['']);
              }
            },
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
        <characterUpdateForm.Subscribe
          selector={(state) => state.values.attributes}
        >
          {(attributes) => (
            <>
              <div
                className={`${cardRef.current?.offsetWidth < 500 ? 'gap-2' : 'gap-4'} grid h-full w-full grow grid-cols-[auto_auto_1fr_auto] place-items-center gap-y-2`}
              >
                {character?.stats.currentHealth !== undefined && (
                  <characterUpdateForm.Field name="stats.currentHealth">
                    {(field) => (
                      <StatBar
                        title="Health"
                        current={field.state.value}
                        total={
                          character?.stats.maxHealth +
                          (attributes.violence.skills.threshold.points -
                            character?.attributes.violence.skills.threshold
                              .points) *
                            2
                        }
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
                {character?.stats.currentSanity !== undefined && (
                  <characterUpdateForm.Field name="stats.currentSanity">
                    {(field) => (
                      <StatBar
                        title="Sanity"
                        current={field.state.value}
                        total={
                          character?.stats.maxSanity +
                          (attributes.esoterica.skills.mysticism.points -
                            character?.attributes.esoterica.skills.mysticism
                              .points)
                        }
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
                <StatBar
                  title="Cyber"
                  current={character?.stats.cyber || 0}
                  total={
                    character?.stats.maxCyber +
                    attributes.cybernetica.skills.chromebits.points -
                    character?.attributes.cybernetica.skills.chromebits.points
                  }
                  color="rgb(52 211 153)"
                  cardWidth={cardRef.current?.offsetWidth}
                >
                  <CyberIcon className="text-secondary size-8" />
                </StatBar>
                <StatBar
                  title="Equip"
                  current={character?.stats.weight || 0}
                  total={
                    character?.stats.maxEquip +
                    attributes.violence.skills.threshold.points -
                    character?.attributes.violence.skills.threshold.points
                  }
                  color="rgb(251 191 36)"
                  cardWidth={cardRef.current?.offsetWidth}
                >
                  <EquipIcon className="text-secondary size-8" />
                </StatBar>
                <characterUpdateForm.Field
                  name="stats.injuries"
                  validators={{
                    onChange: ({ value }) => {
                      if (value > character?.stats.permanentInjuries) {
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
                          length: character?.stats.permanentInjuries,
                        }).map((_, index) => (
                          <button
                            key={index}
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
                      if (value > character?.stats.permanentInsanities) {
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
                          length: character?.stats.permanentInsanities,
                        }).map((_, index) => (
                          <button
                            key={index}
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
            </>
          )}
        </characterUpdateForm.Subscribe>
        <ArrowHeader2 title="Attributes and Skills" />
        <AttributeField form={characterUpdateForm} />
        <Divider />
        <ArrowHeader2 title="Manage Perks" />
        <p className="text-secondary border-l-2 border-gray-400 border-opacity-50 pl-4">
          Select the perks associated with your character. Available perks are
          only shown if you meet the attribute and skill point requirements
        </p>
        <characterUpdateForm.Subscribe
          selector={(state) => state.values.attributes}
        >
          {(attributes) => (
            <div className="flex flex-col gap-4">
              <PerkLinkField
                form={characterUpdateForm}
                attributeTree={attributes}
              />
            </div>
          )}
        </characterUpdateForm.Subscribe>
        <Divider />
        <div className="flex flex-col gap-4 sm:gap-8">
          <BtnRect
            ariaLabel="Update character"
            type="submit"
            className="group w-full"
          >
            {updateCharacter.isPending ? (
              <Loading
                className="group-hover:text-accent dark:text-gray-900"
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
                You are about to permanently delete this character. This action
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
