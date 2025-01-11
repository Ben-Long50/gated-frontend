import { useContext, useEffect, useState } from 'react';
import InputField from './InputField';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import BtnRect from './buttons/BtnRect';
import AttributeCard from './AttributeCard';
import TextAreaField from './TextAreaField';
import { AuthContext } from '../contexts/AuthContext';
import { useForm } from '@tanstack/react-form';
import useAttributeTree from '../hooks/useAttributeTree';
import SelectField from './SelectField';
import StatBar from './StatBar';
import PerkList from './PerkList';
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

const CharacterForm = () => {
  const { apiUrl } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);
  const { layoutSize } = useContext(LayoutContext);

  const [checkedPerks, setCheckedPerks] = useState([]);
  const [imagePreview, setImagePreview] = useState('');

  const attributeTree = useAttributeTree();

  const perks = usePerks(attributeTree?.tree);

  const createCharacter = useCreateCharacterMutation(apiUrl);

  const characterForm = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      picture: '',
      height: '',
      weight: '',
      age: '',
      sex: '',
      background: '',
      stats: {
        currentHealth: 0,
        currentSanity: 0,
      },
      attributes: attributeTree.tree,
      perks: [],
    },
    onSubmit: ({ value }) => {
      const formData = new FormData();

      Object.entries(value).forEach(([key, value]) => {
        if (key === 'picture' && value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, JSON.stringify(value));
        }
      });
      createCharacter.mutate(formData);
    },
  });

  useEffect(() => {
    characterForm.setFieldValue('attributes', attributeTree.destructureTree());
    characterForm.setFieldValue(
      'stats.currentHealth',
      attributeTree.stats.health,
    );
    characterForm.setFieldValue(
      'stats.currentSanity',
      attributeTree.stats.sanity,
    );
  }, [attributeTree, characterForm]);

  useEffect(() => {
    characterForm.setFieldValue('perks', checkedPerks);
  }, [checkedPerks, characterForm]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // Get the selected file

    if (selectedFile) {
      characterForm.setFieldValue('picture', selectedFile);

      // Create a URL for the selected file to preview
      const fileUrl = URL.createObjectURL(selectedFile);
      setImagePreview(fileUrl);
    }
  };

  if (perks.isPending) {
    return <span></span>;
  }

  return (
    <FormLayout>
      <form
        className="flex flex-col gap-8"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          characterForm.handleSubmit();
        }}
      >
        <h1 className="text-center">Create Character</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:gap-8">
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
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-8">
          <characterForm.Field name="height">
            {(field) => (
              <InputField type="number" label="Height (in)" field={field} />
            )}
          </characterForm.Field>
          <characterForm.Field name="weight">
            {(field) => (
              <InputField type="number" label="Weight (lbs)" field={field} />
            )}
          </characterForm.Field>
          <characterForm.Field name="age">
            {(field) => (
              <InputField type="number" label="Age (yrs)" field={field} />
            )}
          </characterForm.Field>
          <characterForm.Field name="sex">
            {(field) => (
              <SelectField type="select" label="Sex" field={field}>
                <option defaultValue="" disabled></option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </SelectField>
            )}
          </characterForm.Field>
        </div>
        <div className="grid grid-rows-2 gap-8 sm:grid-cols-2 sm:grid-rows-1">
          <ThemeContainer
            className="mx-auto w-full max-w-sm"
            chamfer="24"
            borderColor={accentPrimary}
          >
            {!imagePreview ? (
              <label className="bg-secondary flex aspect-square size-full w-full cursor-pointer flex-col items-center justify-center clip-6">
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

          <characterForm.Field
            name="background"
            validators={{
              onChange: ({ value }) =>
                value.length < 2
                  ? 'Character description must be at least 2 characters long'
                  : undefined,
            }}
          >
            {(field) => (
              <TextAreaField
                className="h-full w-full"
                label="Character background "
                field={field}
              />
            )}
          </characterForm.Field>
        </div>
        <div
          className={` ${layoutSize !== 'xsmall' && layoutSize !== 'small' ? 'stat-bar-layout' : 'stat-bar-layout-sm'} w-full gap-4`}
        >
          <StatBar
            title="Health"
            current={attributeTree.stats.health}
            total={attributeTree.stats.health}
            color="rgb(248 113 113)"
          >
            <HealthIcon className="size-8" />
          </StatBar>
          <StatBar
            title="Sanity"
            current={attributeTree.stats.sanity}
            total={attributeTree.stats.sanity}
            color="rgb(96 165 250)"
          >
            <SanityIcon className="size-8" />
          </StatBar>
          <StatBar
            title="Cyber"
            current={attributeTree.stats.cyber}
            total={attributeTree.stats.cyber}
            color="rgb(52 211 153)"
          >
            <CyberIcon className="size-8" />
          </StatBar>
          <StatBar
            title="Equip"
            current={attributeTree.stats.equip}
            total={attributeTree.stats.equip}
            color="rgb(251 191 36)"
          >
            <EquipIcon className="size-8" />
          </StatBar>
        </div>
        <div className="flex flex-wrap justify-around gap-6">
          {Object.entries(attributeTree.stats).map(([stat, points]) => {
            const stats = ['speed', 'evasion', 'armor', 'ward'];
            return (
              stats.includes(stat) && (
                <div className="flex flex-col items-center gap-2" key={stat}>
                  {layoutSize !== 'xsmall' && (
                    <h3 className="text-primary text-xl font-semibold tracking-widest">
                      {stat.charAt(0).toUpperCase() + stat.slice(1)}{' '}
                    </h3>
                  )}
                  <div className="flex items-center justify-center gap-2">
                    <SpeedIcon className="text-secondary size-8" />
                    <p className="text-secondary text-xl sm:pt-1 sm:text-2xl">
                      {points}
                    </p>
                  </div>
                </div>
              )
            );
          })}
          <div className="flex flex-col items-center gap-2" key={'evasion'}>
            {layoutSize !== 'xsmall' && (
              <h3 className="text-primary text-xl font-semibold tracking-widest">
                Evasion
              </h3>
            )}
            <div className="flex items-center justify-center gap-2">
              <EvasionIcon className="size-8" />
              <p className="text-secondary text-xl sm:pt-1 sm:text-2xl">1</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2" key={'armor'}>
            {layoutSize !== 'xsmall' && (
              <h3 className="text-primary text-xl font-semibold tracking-widest">
                Armor
              </h3>
            )}
            <div className="flex items-center justify-center gap-2">
              <ArmorIcon className="size-8" />
              <p className="text-secondary text-xl sm:pt-1 sm:text-2xl">0</p>
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
              <p className="text-secondary text-xl sm:pt-1 sm:text-2xl">0</p>
            </div>
          </div>
        </div>
        <h2>Attributes and skills</h2>
        <div className="flex w-full flex-col gap-2">
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
        <h2>Starting Perk</h2>
        <p className="text-tertiary sm:px-4 lg:px-6">
          (Available perks are only shown if you meet the attribute and skill
          point requirements)
        </p>
        <PerkList
          perkTree={perks.filteredPerkTree}
          mode="edit"
          checkedPerks={checkedPerks}
          setCheckedPerks={setCheckedPerks}
        />
        <BtnRect type="submit" className="group w-full">
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
