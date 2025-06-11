import { useContext, useRef, useState } from 'react';
import InputField from './InputField';
import BtnRect from './buttons/BtnRect';
import { AuthContext } from '../contexts/AuthContext';
import { useForm, useStore, ValidationError } from '@tanstack/react-form';
import useAttributeTree from '../hooks/useAttributeTree';
import StatBar from './StatBar';
import useCreateCharacterMutation from '../hooks/useCreateCharacterMutation/useCreateCharacterMutation';
import WardIcon from './icons/WardIcon';
import SpeedIcon from './icons/SpeedIcon';
import ArmorIcon from './icons/ArmorIcon';
import EvasionIcon from './icons/EvasionIcon';
import HealthIcon from './icons/HealthIcon';
import { LayoutContext } from '../contexts/LayoutContext';
import SanityIcon from './icons/SanityIcon';
import CyberIcon from './icons/CyberIcon';
import EquipIcon from './icons/EquipIcon';
import FormLayout from '../layouts/FormLayout';
import Loading from './Loading';
import useStats from '../hooks/useStats';
import { SortedInventory } from 'src/types/character';
import useCampaignsQuery from '../hooks/useCampaignsQuery/useCampaignsQuery';
import ArrowHeader2 from './ArrowHeader2';
import Divider from './Divider';
import InputFieldRadio from './InputFieldRadio';
import InputSelectField from './InputSelectField';
import PerkLinkField from './form_fields/PerkLinkField';
import { Perk } from 'src/types/perk';
import NpcPreferenceField from './form_fields/NpcPreferenceField';
import PictureField from './form_fields/PictureField';
import AttributeField from './form_fields/AttributeField';

const CharacterForm = () => {
  const { apiUrl } = useContext(AuthContext);
  const { layoutSize } = useContext(LayoutContext);

  const [formMessage, setFormMessage] = useState('');

  const cardRef = useRef(null);

  const { data: campaigns } = useCampaignsQuery(apiUrl);

  const { emptyAttributeTree } = useAttributeTree();

  const createCharacter = useCreateCharacterMutation(apiUrl, setFormMessage);

  const characterForm = useForm({
    defaultValues: {
      playerCharacter: '' as string | boolean,
      npcTypes: null as null | string[],
      campaignId: null,
      preferences: {
        firstName: true,
        lastName: true,
        age: true,
        height: true,
        weight: true,
        sex: true,
        picture: true,
        backstory: true,
        level: true,
        profits: true,
        stats: true,
        attributes: true,
        perks: true,
        equipment: true,
      },
      firstName: '',
      lastName: '',
      picture: '',
      position: { x: 50, y: 50 },
      height: '',
      weight: '',
      age: '',
      sex: '',
      stats: {
        currentHealth: 0,
        currentSanity: 0,
      },
      attributes: emptyAttributeTree,
      perks: [] as Perk[],
    },
    onSubmit: ({ value }) => {
      value.campaignId = value.campaignId?.id ? value.campaignId.id : null;
      value.npcTypes = value.npcTypes
        ? value.npcTypes.filter((type) => type)
        : null;

      value.stats = {
        currentHealth:
          10 + value.attributes.violence.skills.threshold.points * 2,
        currentSanity: 5 + value.attributes.esoterica.skills.mysticism.points,
      };

      const formData = new FormData();

      Object.entries(value).forEach(([key, value]) => {
        if (key === 'perks') {
          const perkIds = value?.map((perk: Perk) => perk.id) || [];
          formData.append(key, JSON.stringify(perkIds));
        } else if (key === 'picture' && value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, JSON.stringify(value));
        }
      });
      createCharacter.mutate(formData);
    },
  });

  const perks = useStore(characterForm.store, (state) => state.values.perks);

  const { stats } = useStats(
    {
      items: [],
    } as unknown as SortedInventory,
    [],
    emptyAttributeTree,
    perks,
  );

  return (
    <FormLayout createMutation={createCharacter} formMessage={formMessage}>
      <form
        ref={cardRef}
        className="flex flex-col gap-8"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          characterForm.handleSubmit();
        }}
      >
        <h1 className="text-center">Create Character</h1>
        <Divider />
        <ArrowHeader2 title="Campaign Information" />
        <characterForm.Field
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
                characterForm.setFieldValue('npcTypes', null);
              } else if (!value) {
                characterForm.setFieldValue('npcTypes', ['']);
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
                onChange={() => {
                  field.handleChange(true);
                }}
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
        </characterForm.Field>
        <characterForm.Field name="campaignId">
          {(field) => (
            <InputSelectField
              field={field}
              label="Campaign"
              options={campaigns}
            />
          )}
        </characterForm.Field>
        <NpcPreferenceField form={characterForm} />
        <Divider />
        <ArrowHeader2 title="Character Information" />
        <div className="grid w-full gap-8 max-sm:col-span-2 max-sm:grid-flow-row sm:grid-cols-2">
          <PictureField
            form={characterForm}
            sizeInfo={{ aspectRatio: '1/1', maxHeight: '', minHeight: '' }}
          />
          <div className="flex w-full flex-col gap-8 max-sm:col-span-2">
            <characterForm.Field
              name="firstName"
              validators={{
                onChange: ({ value }) =>
                  value.length < 2
                    ? 'First name must be at least 2 characters long'
                    : undefined,
              }}
            >
              {(field) => <InputField label="First name" field={field} />}
            </characterForm.Field>
            <characterForm.Field name="lastName">
              {(field) => <InputField label="Last name" field={field} />}
            </characterForm.Field>
            <div className="grid grid-cols-2 gap-8">
              <characterForm.Field name="height">
                {(field) => (
                  <InputField type="number" label="Height (in)" field={field} />
                )}
              </characterForm.Field>
              <characterForm.Field name="weight">
                {(field) => (
                  <InputField
                    type="number"
                    label="Weight (lbs)"
                    field={field}
                  />
                )}
              </characterForm.Field>
              <characterForm.Field name="age">
                {(field) => (
                  <InputField type="number" label="Age (yrs)" field={field} />
                )}
              </characterForm.Field>
              <characterForm.Field name="sex">
                {(field) => (
                  <InputSelectField
                    field={field}
                    label="Sex"
                    options={['male', 'female']}
                  />
                )}
              </characterForm.Field>
            </div>
          </div>
        </div>
        <characterForm.Subscribe selector={(state) => state.values.attributes}>
          {(attributes) => (
            <>
              <div
                className={`grid w-full grid-cols-[auto_auto_1fr_auto] gap-4`}
              >
                <StatBar
                  title="Health"
                  current={
                    stats.maxHealth +
                      attributes.violence.skills.threshold.points * 2 || 0
                  }
                  total={
                    stats.maxHealth +
                    attributes.violence.skills.threshold.points * 2
                  }
                  color="rgb(248 113 113)"
                  cardWidth={cardRef.current?.offsetWidth}
                >
                  <HealthIcon className="text-secondary size-8" />
                </StatBar>
                <StatBar
                  title="Sanity"
                  current={
                    stats.maxSanity +
                      attributes.esoterica.skills.mysticism.points || 0
                  }
                  total={
                    stats.maxSanity +
                    attributes.esoterica.skills.mysticism.points
                  }
                  color="rgb(96 165 250)"
                  cardWidth={cardRef.current?.offsetWidth}
                >
                  <SanityIcon className="text-secondary size-8" />
                </StatBar>
                <StatBar
                  title="Cyber"
                  current={
                    stats.maxCyber +
                      attributes.cybernetica.skills.chromebits.points || 0
                  }
                  total={
                    stats.maxCyber +
                    attributes.cybernetica.skills.chromebits.points
                  }
                  color="rgb(52 211 153)"
                  cardWidth={cardRef.current?.offsetWidth}
                >
                  <CyberIcon className="text-secondary size-8" />
                </StatBar>
                <StatBar
                  title="Equip"
                  current={
                    stats.maxEquip +
                      attributes.violence.skills.threshold.points || 0
                  }
                  total={
                    stats.maxEquip + attributes.violence.skills.threshold.points
                  }
                  color="rgb(251 191 36)"
                  cardWidth={cardRef.current?.offsetWidth}
                >
                  <EquipIcon className="text-secondary size-8" />
                </StatBar>
              </div>
              <div className="flex flex-wrap justify-around gap-6">
                <div className="flex flex-col items-center gap-2" key={'speed'}>
                  {layoutSize !== 'xsmall' && (
                    <h3 className="text-primary text-xl font-semibold tracking-widest">
                      Speed
                    </h3>
                  )}
                  <div className="flex items-center justify-center gap-2">
                    <SpeedIcon className="text-secondary size-8" />
                    <p className="text-secondary text-xl sm:pt-1 sm:text-2xl">
                      {stats.speed + attributes.violence.skills.assault.points}
                    </p>
                  </div>
                </div>
                <div
                  className="flex flex-col items-center gap-2"
                  key={'evasion'}
                >
                  {layoutSize !== 'xsmall' && (
                    <h3 className="text-primary text-xl font-semibold tracking-widest">
                      Evasion
                    </h3>
                  )}
                  <div className="flex items-center justify-center gap-2">
                    <EvasionIcon className="text-secondary size-8" />
                    <p className="text-secondary text-xl sm:pt-1 sm:text-2xl">
                      {stats.evasion}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2" key={'armor'}>
                  {layoutSize !== 'xsmall' && (
                    <h3 className="text-primary text-xl font-semibold tracking-widest">
                      Armor
                    </h3>
                  )}
                  <div className="flex items-center justify-center gap-2">
                    <ArmorIcon className="text-secondary size-8" />
                    <p className="text-secondary text-xl sm:pt-1 sm:text-2xl">
                      {stats.armor}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2" key={'ward'}>
                  {layoutSize !== 'xsmall' && (
                    <h3 className="text-primary text-xl font-semibold tracking-widest sm:text-2xl">
                      Ward
                    </h3>
                  )}
                  <div className="flex items-center justify-center gap-2">
                    <WardIcon className="text-secondary size-8" />
                    <p className="text-secondary text-xl sm:pt-1 sm:text-2xl">
                      {stats.ward}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </characterForm.Subscribe>
        <Divider />
        <ArrowHeader2 title="Attributes and skills" />
        <div className="flex w-full flex-col gap-3 border-l-2 border-gray-400 border-opacity-50 pl-4">
          <p className="text-secondary">
            Click the squares next to the attributes and skills below to
            allocate points. A new character starts with 6 attribute and 10
            skill points to distribute. Stat bonuses are awarded for allocating
            to the following skills (changes to these values are reflected in
            the "Character Information" section above):
          </p>
          <ul className="text-tertiary flex flex-col gap-1">
            <li className="text-secondary">Chromebits — 1 point of Cyber</li>
            <li className="text-secondary">Mysticism — 1 point of Sanity</li>
            <li className="text-secondary">Assault — 1 point of Speed</li>
            <li className="text-secondary">
              Threshold — 1 point of Health and 1 point of Equip
            </li>
          </ul>
          <characterForm.Subscribe
            selector={(state) => [
              state.values.attributes,
              state.values.attributes.cybernetica.skills,
              state.values.attributes.esoterica.skills,
              state.values.attributes.peace.skills,
              state.values.attributes.violence.skills,
            ]}
          >
            {([attributes, cybernetica, esoterica, peace, violence]) => {
              const attributePoints = Object.values(attributes).reduce(
                (sum, attribute) => sum + attribute.points,
                0,
              );

              const skillPoints = Object.values({
                ...cybernetica,
                ...esoterica,
                ...peace,
                ...violence,
              }).reduce((sum, skill) => sum + skill.points, 0);

              return (
                <>
                  <p className="flex justify-between">
                    <span className="text-tertiary">
                      Unallocated attribute points
                    </span>
                    <span className="text-xl">{6 - attributePoints}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-tertiary">
                      Unallocated skill points
                    </span>
                    <span className="text-xl">{10 - skillPoints}</span>
                  </p>
                </>
              );
            }}
          </characterForm.Subscribe>
        </div>
        <AttributeField form={characterForm} />
        <Divider />
        <ArrowHeader2 title="Starting Perk" />
        <p className="text-tertiary border-l-2 border-gray-400 border-opacity-50 pl-4">
          Select a starting perk for your character. Available perks are only
          shown if you meet the attribute and skill point requirements
        </p>
        <characterForm.Subscribe selector={(state) => state.values.attributes}>
          {(attributes) => (
            <div className="flex flex-col gap-4">
              <PerkLinkField form={characterForm} attributeTree={attributes} />
            </div>
          )}
        </characterForm.Subscribe>
        <Divider />
        <BtnRect
          ariaLabel="Create character"
          type="submit"
          className="group w-full"
        >
          {createCharacter.isPending ? (
            <Loading
              className="group-hover:text-yellow-300 dark:text-gray-900"
              size={1.15}
            />
          ) : (
            'Create'
          )}
        </BtnRect>
      </form>
    </FormLayout>
  );
};

export default CharacterForm;
