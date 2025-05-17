import { useContext, useEffect, useRef, useState } from 'react';
import InputField from './InputField';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import BtnRect from './buttons/BtnRect';
import AttributeCard from './AttributeCard';
import { AuthContext } from '../contexts/AuthContext';
import { useForm, useStore, ValidationError } from '@tanstack/react-form';
import useAttributeTree from '../hooks/useAttributeTree';
import StatBar from './StatBar';
import usePerks from '../hooks/usePerks';
import useCreateCharacterMutation from '../hooks/useCreateCharacterMutation/useCreateCharacterMutation';
import Icon from '@mdi/react';
import { mdiCloseBox, mdiImagePlus } from '@mdi/js';
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
import { CharacterInventory } from 'src/types/character';
import useCampaignsQuery from '../hooks/useCampaignsQuery/useCampaignsQuery';
import ArrowHeader2 from './ArrowHeader2';
import Divider from './Divider';
import InputFieldRadio from './InputFieldRadio';
import InputSelectField from './InputSelectField';
import PerkLinkField from './form_fields/PerkLinkField';
import { Perk } from 'src/types/perk';
import NpcPreferenceField from './form_fields/NpcPreferenceField';

const CharacterForm = () => {
  const { apiUrl } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);
  const { layoutSize } = useContext(LayoutContext);

  const [imagePreview, setImagePreview] = useState('');
  const [formMessage, setFormMessage] = useState('');

  const cardRef = useRef(null);

  const { data: campaigns } = useCampaignsQuery(apiUrl);

  const attributeTree = useAttributeTree();

  const perks = usePerks(attributeTree?.tree);

  const createCharacter = useCreateCharacterMutation(apiUrl, setFormMessage);

  const characterForm = useForm({
    defaultValues: {
      playerCharacter: '' as string | boolean,
      campaignId: null,
      preferences: {
        firstName: true,
        lastName: true,
        age: true,
        height: true,
        weight: true,
        sex: true,
        picture: true,
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
      height: '',
      weight: '',
      age: '',
      sex: '',
      stats: {
        currentHealth: 0,
        currentSanity: 0,
      },
      attributes: attributeTree.tree,
      perks: [] as Perk[],
    },
    onSubmit: ({ value }) => {
      value.campaignId = value.campaignId?.id ? value.campaignId.id : null;

      const formData = new FormData();

      Object.entries(value).forEach(([key, value]) => {
        if (key === 'perks') {
          const perkIds = value.map((perk: Perk) => perk.id) || [];
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

  const perkIds = useStore(characterForm.store, (state) =>
    state.values.perks.map((perk) => perk.id),
  );

  const selectedPerks = perks
    .flattenPerkTree(perks.filteredPerkTree)
    .filter((perk) => perkIds.includes(perk.id));

  const { stats } = useStats(
    {
      items: [],
      actions: [],
    } as unknown as CharacterInventory,
    attributeTree?.tree,
    selectedPerks,
  );

  useEffect(() => {
    characterForm.setFieldValue('attributes', attributeTree.tree);
    characterForm.setFieldValue('stats.currentHealth', stats.maxHealth);
    characterForm.setFieldValue('stats.currentSanity', stats.maxSanity);
  }, [attributeTree, characterForm]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // Get the selected file

    if (selectedFile) {
      characterForm.setFieldValue('picture', selectedFile);

      // Create a URL for the selected file to preview
      const fileUrl = URL.createObjectURL(selectedFile);
      setImagePreview(fileUrl);
    }
  };

  if (perks.isPending) return <Loading />;

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
        <div className="flex w-full flex-col gap-8 sm:flex-row">
          <ThemeContainer
            className="mx-auto w-full max-w-sm"
            chamfer="medium"
            borderColor={accentPrimary}
          >
            {!imagePreview ? (
              <label className="flex aspect-square size-full w-full cursor-pointer flex-col items-center justify-center clip-6">
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
                    characterForm.setFieldValue('picture', '');
                    setImagePreview('');
                  }}
                >
                  <Icon path={mdiCloseBox} size={1.5} />
                </button>
              </div>
            )}
          </ThemeContainer>
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

        <div className={`grid w-full grid-cols-[auto_auto_1fr_auto] gap-4`}>
          <StatBar
            title="Health"
            current={stats.maxHealth}
            total={stats.maxHealth}
            color="rgb(248 113 113)"
            cardWidth={cardRef.current?.offsetWidth}
          >
            <HealthIcon className="text-secondary size-8" />
          </StatBar>
          <StatBar
            title="Sanity"
            current={stats.maxSanity}
            total={stats.maxSanity}
            color="rgb(96 165 250)"
            cardWidth={cardRef.current?.offsetWidth}
          >
            <SanityIcon className="text-secondary size-8" />
          </StatBar>
          <StatBar
            title="Cyber"
            current={stats.maxCyber}
            total={stats.maxCyber}
            color="rgb(52 211 153)"
            cardWidth={cardRef.current?.offsetWidth}
          >
            <CyberIcon className="text-secondary size-8" />
          </StatBar>
          <StatBar
            title="Equip"
            current={stats.maxWeight}
            total={stats.maxWeight}
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
                {stats.speed}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2" key={'evasion'}>
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
        <Divider />
        <ArrowHeader2 title="Attributes and skills" />
        <div className="flex w-full flex-col gap-3 border-l border-gray-400 pl-4">
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
          <p className="flex justify-between">
            <span className="text-tertiary">Unallocated attribute points</span>
            <span className="text-xl">
              {6 - attributeTree.getAttributePoints()}
            </span>
          </p>
          <p className="flex justify-between">
            <span className="text-tertiary">Unallocated skill points</span>
            <span className="text-xl">
              {10 - attributeTree.getSkillPoints()}
            </span>
          </p>
        </div>
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
        <ArrowHeader2 title="Starting Perk" />
        <p className="text-tertiary border-l border-gray-400 pl-4">
          Select a starting perk for your character. Available perks are only
          shown if you meet the attribute and skill point requirements
        </p>
        <div className="flex flex-col gap-4">
          <PerkLinkField
            form={characterForm}
            perkTree={perks.filteredPerkTree}
          />
        </div>
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
