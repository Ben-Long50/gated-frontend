import { useForm } from '@tanstack/react-form';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';
import ThemeContainer from './ThemeContainer';
import BtnRect from './buttons/BtnRect';
import InputField from './InputField';
import TextAreaField from './TextAreaField';
import useKeywords from '../hooks/useKeywords';
import Icon from '@mdi/react';
import { mdiCloseBox, mdiImagePlus } from '@mdi/js';
import Loading from './Loading';
import useCreateCyberneticMutation from '../hooks/useCreateCyberneticMutation/useCreateCyberneticMutation';
import SelectField from './SelectField';
import FormLayout from '../layouts/FormLayout';
import { useLocation, useParams } from 'react-router-dom';
import useDeleteCyberneticMutation from '../hooks/useDeleteCyberneticMutation/useDeleteCyberneticMutation';
import useCyberneticQuery from '../hooks/useCyberneticQuery/useCyberneticQuery';
import { Keyword } from 'src/types/keyword';
import { Action } from 'src/types/action';
import useModifyCyberneticMutation from '../hooks/useModifyCyberneticMutation/useModifyCyberneticMutation';
import Divider from './Divider';
import ArrowHeader2 from './ArrowHeader2';
import WeaponLinkField from './form_fields/WeaponLinkField';
import ArmorLinkField from './form_fields/ArmorLinkField';
import ActionLinkField from './form_fields/ActionLinkField';
import KeywordLinkField from './form_fields/KeywordLinkField';
import { extractItemListIds, extractKeywordListIds } from '../utils/extractIds';
import { Item } from 'src/types/item';
import InputSelectField from './InputSelectField';

const CyberneticForm = () => {
  const { apiUrl } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);
  const [formMessage, setFormMessage] = useState('');
  const [deleteMode, setDeleteMode] = useState(false);
  const { cyberneticId } = useParams();
  const location = useLocation();
  const parts = location.pathname.split('/').filter(Boolean);
  const mode = parts[parts.length - 1];

  const { data: cybernetic } = useCyberneticQuery(
    apiUrl,
    Number(cyberneticId),
    { enabled: !!cyberneticId },
  );

  const keywords = useKeywords();

  const [imagePreview, setImagePreview] = useState(
    cybernetic?.picture?.imageUrl || '',
  );

  const createCybernetic = useCreateCyberneticMutation(
    apiUrl,
    setFormMessage,
    Number(cyberneticId),
  );

  const modifyCybernetic = useModifyCyberneticMutation(
    apiUrl,
    Number(cyberneticId),
    setFormMessage,
  );
  const deleteCybernetic = useDeleteCyberneticMutation(
    apiUrl,
    Number(cyberneticId),
    setFormMessage,
  );

  const handleDelete = () => {
    if (deleteMode) {
      deleteCybernetic.mutate();
    } else {
      setDeleteMode(true);
    }
  };

  const handleReset = async () => {
    cyberneticForm.reset();
  };

  useEffect(() => {
    if (cybernetic) {
      setImagePreview(cybernetic.picture?.imageUrl);
    }
  }, [cybernetic]);

  const cyberneticForm = useForm({
    defaultValues: {
      id: cybernetic?.id || null,
      name: cybernetic?.name || '',
      rarity: cybernetic?.rarity || '',
      grade: cybernetic?.grade || 1,
      itemSubtype: cybernetic?.itemSubtype || '',
      picture: cybernetic?.picture || '',
      description: cybernetic?.description || '',
      price: cybernetic?.price || '',
      stats: {
        cyber: cybernetic?.stats.cyber || '',
        power: cybernetic?.stats.power || '',
        currentPower: cybernetic?.stats.currentPower || '',
      } as { cyber: number; power?: number; currentPower?: number },
      weapons:
        cybernetic?.itemLinkReference?.items.filter(
          (item: Item) => item.itemType === 'weapon',
        ) || ([] as Item[]),
      armor:
        cybernetic?.itemLinkReference?.items.filter(
          (item: Item) => item.itemType === 'armor',
        ) || ([] as Item[]),
      actions: cybernetic?.itemLinkReference?.actions || ([] as Action[]),
      keywords:
        cybernetic?.keywords || ([] as { keyword: Keyword; value?: number }[]),
    },
    onSubmit: async ({ value }) => {
      value.stats.currentPower = value.stats.power;

      const filteredStats = Object.fromEntries(
        Object.entries(value.stats).filter(([_, val]) => val),
      ) as { cyber: number; power?: number; currentPower?: number };

      value.stats = { ...filteredStats };

      const { weapons, armor, actions, keywords, ...rest } = value;

      const data = {
        ...rest,
        itemIds: extractItemListIds([...value.weapons, ...value.armor]),
        actionIds: extractItemListIds(value.actions),
        keywordIds: extractKeywordListIds(value.keywords),
      };

      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (key === 'picture' && value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, JSON.stringify(value));
        }
      });

      if (mode === 'create' || mode === 'update') {
        await createCybernetic.mutate(formData);
      } else if (mode === 'modify') {
        await modifyCybernetic.mutate(formData);
      }
    },
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      cyberneticForm.setFieldValue('picture', selectedFile);

      const fileUrl = URL.createObjectURL(selectedFile);
      setImagePreview(fileUrl);
    }
  };

  if (keywords.isLoading || keywords.isPending) {
    return <Loading />;
  }

  return (
    <FormLayout
      itemId={cyberneticId}
      createMutation={createCybernetic}
      modifyMutation={modifyCybernetic}
      deleteMutation={deleteCybernetic}
      handleDelete={handleDelete}
      handleReset={handleReset}
      formMessage={formMessage}
      deleteMode={deleteMode}
      setDeleteMode={setDeleteMode}
    >
      <form
        className="flex flex-col gap-4 sm:gap-8"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          cyberneticForm.handleSubmit();
        }}
      >
        <div className="flex items-center justify-center gap-4">
          <h1>
            {mode.charAt(0).toUpperCase() + mode.slice(1) + ' Augmentation'}
          </h1>
        </div>
        <Divider />
        <ArrowHeader2 title="Augment Information" />
        <div className="flex w-full gap-4 sm:gap-8">
          <cyberneticForm.Field
            name="name"
            validators={{
              onChange: ({ value }) =>
                value.length < 2
                  ? 'Augment name must be at least 2 characters long'
                  : undefined,
            }}
          >
            {(field) => (
              <InputField className="grow" label="Augment Name" field={field} />
            )}
          </cyberneticForm.Field>
          <cyberneticForm.Field name="price">
            {(field) => (
              <InputField
                className="max-w-28"
                type="number"
                label="Price"
                field={field}
              />
            )}
          </cyberneticForm.Field>
        </div>
        <div className="flex w-full items-center gap-4 lg:gap-8">
          <cyberneticForm.Field
            name="rarity"
            validators={{
              onSubmit: ({ value }) => (!value ? 'Select a rarity' : undefined),
            }}
          >
            {(field) => (
              <SelectField className="w-full" label="Item rarity" field={field}>
                <option value=""></option>
                <option value="common">Common</option>
                <option value="uncommon">Uncommon</option>
                <option value="rare">Rare</option>
                <option value="blackMarket">Black Market</option>
                <option value="artifact">Artifact</option>
              </SelectField>
            )}
          </cyberneticForm.Field>
          <cyberneticForm.Field
            name="grade"
            validators={{
              onChange: ({ value }) =>
                value <= 0 ? 'Minimum grade is 1' : undefined,
            }}
          >
            {(field) => (
              <InputField
                className="w-full max-w-28"
                type="number"
                label="Item Grade"
                field={field}
              />
            )}
          </cyberneticForm.Field>
        </div>
        <div className="grid w-full gap-4 max-sm:grid-rows-2 sm:grid-cols-2 sm:flex-row sm:gap-8">
          <cyberneticForm.Field
            name="itemSubtype"
            listeners={{
              onChange: ({ value }) => {
                if (value !== 'offensive') {
                  const length = cyberneticForm.getFieldValue('weapons').length;
                  for (let i = 0; i < length; i++) {
                    cyberneticForm.removeFieldValue('weapons', i);
                  }
                }
                if (value !== 'defensive') {
                  const length = cyberneticForm.getFieldValue('armor').length;
                  for (let i = 0; i < length; i++) {
                    cyberneticForm.removeFieldValue('armor', i);
                  }
                }
              },
            }}
            validators={{
              onSubmit: ({ value }) =>
                value.length < 1
                  ? 'You must select a cybernetic type'
                  : undefined,
            }}
          >
            {(field) => (
              <InputSelectField
                field={field}
                label="Augment Type"
                options={['cybernetic', 'mutation']}
              />
            )}
          </cyberneticForm.Field>
          <div className="flex gap-4 sm:gap-8">
            <cyberneticForm.Field name="stats.cyber">
              {(field) => (
                <InputField
                  className="sm:max-w-28"
                  type="number"
                  label="Cyber"
                  field={field}
                />
              )}
            </cyberneticForm.Field>
            <cyberneticForm.Field name="stats.power">
              {(field) => (
                <InputField
                  className="sm:max-w-28"
                  type="number"
                  label="Power"
                  field={field}
                />
              )}
            </cyberneticForm.Field>
          </div>
        </div>
        <div className="flex flex-col gap-8 sm:flex-row">
          <ThemeContainer
            className="mx-auto w-full max-w-sm"
            chamfer="medium"
            borderColor={accentPrimary}
            overflowHidden={true}
          >
            {!imagePreview ? (
              <label className="bg-secondary flex aspect-square size-full w-full cursor-pointer flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center gap-2 pb-6 pt-5">
                  <Icon
                    className="text-tertiary"
                    path={mdiImagePlus}
                    size={3}
                  />
                  <p className="text-tertiary font-semibold">
                    Upload cybernetic picture
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
                  alt="Cybernetic preview"
                />
                <button
                  className="text-secondary absolute right-2 top-2"
                  onClick={() => {
                    cyberneticForm.setFieldValue('picture', '');
                    setImagePreview('');
                  }}
                >
                  <div className="rounded bg-zinc-950">
                    <Icon path={mdiCloseBox} size={1.5} />
                  </div>
                </button>
              </div>
            )}
          </ThemeContainer>
          <cyberneticForm.Field
            name="description"
            validators={{
              onChange: ({ value }) =>
                value.length < 2
                  ? 'Cybernetic description must be at least 2 characters long'
                  : undefined,
            }}
          >
            {(field) => (
              <TextAreaField label="Cybernetic Description" field={field} />
            )}
          </cyberneticForm.Field>
        </div>
        <div className="flex flex-col gap-4">
          <KeywordLinkField form={cyberneticForm} keywordType="chromebits" />
          <Divider />
          <WeaponLinkField form={cyberneticForm} />
          <Divider />
          <ArmorLinkField form={cyberneticForm} />
          <Divider />
          <ActionLinkField form={cyberneticForm} />
          <Divider />
        </div>
        <BtnRect
          ariaLabel={mode.charAt(0).toUpperCase() + mode.slice(1)}
          type="submit"
          className="group w-full"
        >
          {createCybernetic.isPending || modifyCybernetic.isPending ? (
            <Loading
              className="group-hover:text-yellow-300 dark:text-gray-900"
              size={1.15}
            />
          ) : (
            mode.charAt(0).toUpperCase() + mode.slice(1)
          )}
        </BtnRect>
      </form>
    </FormLayout>
  );
};

export default CyberneticForm;
