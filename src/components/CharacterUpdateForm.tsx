import { useContext, useEffect, useState } from 'react';
import InputField from './InputField';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import BtnRect from './BtnRect';
import AttributeCard from './AttributeCard';
import TextAreaField from './TextAreaField';
import { AuthContext } from '../contexts/AuthContext';
import { useForm } from '@tanstack/react-form';
import useAttributeTree from '../hooks/useAttributeTree';
import SelectField from './SelectField';
import StatBar from './StatBar';
import PerkList from './PerkList';
import usePerks from '../hooks/usePerks';
import Icon from '@mdi/react';
import { mdiAlertOutline, mdiCloseBox, mdiImagePlus } from '@mdi/js';
import HealthIcon from './icons/HealthIcon';
import { LayoutContext } from '../contexts/LayoutContext';
import SanityIcon from './icons/SanityIcon';
import { useParams } from 'react-router-dom';
import useCharacterQuery from '../hooks/useCharacterQuery/useCharacterQuery';
import useUpdateCharacterMutation from '../hooks/useCharacterUpdateMutation/useCharacterUpdateMutation';
import useDeleteCharacterMutation from '../hooks/useDeleteCharacterMutation/useDeleteCharacterMutation';
import Loading from './Loading';

const CharacterUpdateForm = () => {
  const { apiUrl, authToken } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);
  const { layoutSize } = useContext(LayoutContext);
  const { characterId } = useParams();

  const [deleteMode, setDeleteMode] = useState(false);

  const { data: character } = useCharacterQuery(apiUrl, authToken, characterId);

  const [checkedPerks, setCheckedPerks] = useState(() => {
    return character?.perks.map((perk) => perk.id);
  });
  const [imagePreview, setImagePreview] = useState(character?.picture.imageUrl);

  const attributeTree = useAttributeTree(character?.attributes);
  const perks = usePerks(attributeTree?.tree);

  const updateCharacter = useUpdateCharacterMutation(
    characterId,
    apiUrl,
    authToken,
  );
  const deleteCharacter = useDeleteCharacterMutation(
    characterId,
    apiUrl,
    authToken,
  );

  const characterUpdateForm = useForm({
    defaultValues: {
      name: character?.name ?? '',
      level: character?.level ?? '',
      profits: character?.profits ?? '',
      stats: {
        currentHealth: character?.stats.currentHealth ?? '',
        currentSanity: character?.stats.currentSanity ?? '',
        injuries: character?.stats.injuries ?? '',
        insanities: character?.stats.insanities ?? '',
      },
      picture: '',
      height: character?.height ?? '',
      weight: character?.weight ?? '',
      age: character?.age ?? '',
      sex: character?.sex ?? '',
      background: character?.background ?? '',
      attributes: character?.attributes ?? '',
      perks: character?.perks ?? '',
    },
    onSubmit: async ({ value }) => {
      const formData = new FormData();

      if (value.stats.currentHealth == 0) {
        value.stats.injuries++;
        value.stats.currentHealth = attributeTree.stats.health;
      }
      if (value.stats.currentSanity == 0) {
        console.log(value.stats.currentSanity);

        value.stats.insanities++;
        value.stats.currentSanity = attributeTree.stats.sanity;
      }

      Object.entries(value).forEach(([key, val]) => {
        if (key === 'picture') {
          if (val instanceof File) {
            formData.append(key, val);
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

  useEffect(() => {
    characterUpdateForm.setFieldValue('perks', checkedPerks);
  }, [checkedPerks, characterUpdateForm]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // Get the selected file

    if (selectedFile) {
      characterUpdateForm.setFieldValue('picture', selectedFile);

      // Create a URL for the selected file to preview
      const fileUrl = URL.createObjectURL(selectedFile);
      setImagePreview(fileUrl);
    }
  };

  if (
    perks.isLoading ||
    perks.isPending ||
    character.isLoading ||
    character.isPending
  ) {
    return <span></span>;
  }

  return (
    <ThemeContainer
      className="mb-auto w-full max-w-2xl lg:max-w-4xl"
      chamfer="32"
      borderColor={accentPrimary}
    >
      <form
        className="bg-primary flex w-full min-w-96 flex-col gap-8 p-4 clip-8 lg:p-8"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          characterUpdateForm.handleSubmit();
        }}
      >
        <h1 className="text-center">Update Character</h1>
        <div className="grid gap-4 max-sm:grid-rows-2 sm:grid-cols-2 sm:gap-8">
          <characterUpdateForm.Field
            name="name"
            validators={{
              onChange: ({ value }) =>
                value.length < 2
                  ? 'Perk name must be at least 2 characters long'
                  : undefined,
            }}
          >
            {(field) => (
              <InputField className="w-full" label="Name" field={field} />
            )}
          </characterUpdateForm.Field>
          <div className="flex gap-4 sm:gap-8">
            <characterUpdateForm.Field
              name="level"
              validators={{
                onChange: ({ value }) =>
                  value < 1 ? 'You cannot be a lower level than 1' : undefined,
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
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-8 lg:grid-cols-4">
          <characterUpdateForm.Field name="height">
            {(field) => (
              <InputField type="number" label="Height (in)" field={field} />
            )}
          </characterUpdateForm.Field>
          <characterUpdateForm.Field name="weight">
            {(field) => (
              <InputField type="number" label="Weight (lbs)" field={field} />
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
                    characterUpdateForm.setFieldValue('picture', '');
                    setImagePreview('');
                  }}
                >
                  <Icon path={mdiCloseBox} size={1.5} />
                </button>
              </div>
            )}
          </ThemeContainer>

          <characterUpdateForm.Field
            name="background"
            validators={{
              onChange: ({ value }) =>
                value.length < 2
                  ? 'Perk description must be at least 2 characters long'
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
          </characterUpdateForm.Field>
        </div>
        <div
          className={` ${layoutSize !== 'xsmall' && layoutSize !== 'small' ? 'stat-bar-layout' : 'stat-bar-layout-sm'} w-full items-center gap-4`}
        >
          <characterUpdateForm.Field
            name="stats.currentHealth"
            validators={{
              onChange: ({ value }) =>
                value > attributeTree.stats.health
                  ? 'Cannot exceed max health'
                  : undefined,
            }}
          >
            {(field) => (
              <>
                <StatBar
                  title="Health"
                  mode="edit"
                  current={field.state.value}
                  total={attributeTree.stats.health || 0}
                  color="rgb(248 113 113)"
                >
                  <HealthIcon className="size-8" />
                </StatBar>
                <InputField
                  className="w-28"
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
              onChange: ({ value }) =>
                value > attributeTree.stats.sanity
                  ? 'Cannot exceed max sanity'
                  : undefined,
            }}
          >
            {(field) => (
              <>
                <StatBar
                  title="Sanity"
                  mode="edit"
                  current={field.state.value}
                  total={attributeTree.stats.sanity || 0}
                  color="rgb(96 165 250)"
                >
                  <SanityIcon className="size-8" />
                </StatBar>
                <InputField
                  className="w-28"
                  field={field}
                  label="Cur. sanity"
                  type="number"
                />
              </>
            )}
          </characterUpdateForm.Field>
        </div>
        <h2>Attributes and skills</h2>
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
        <h2>Available Perks</h2>
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
        <div className="grid grid-cols-2 gap-4 sm:gap-8">
          <BtnRect type="submit" className="group w-full">
            {updateCharacter.isPending ? (
              <Loading
                className="text-gray-900 group-hover:text-yellow-300"
                size={1.15}
              />
            ) : (
              'Update'
            )}
          </BtnRect>
          <BtnRect
            className="ml-auto"
            onClick={(e) => {
              e.preventDefault();
              !deleteMode ? setDeleteMode(true) : deleteCharacter.mutate();
            }}
          >
            Delete character
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
              <button
                className="text-secondary self-end pr-4 text-xl hover:underline"
                onClick={() => setDeleteMode(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </form>
    </ThemeContainer>
  );
};

export default CharacterUpdateForm;
