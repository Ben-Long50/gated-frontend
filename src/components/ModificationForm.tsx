import { useContext, useEffect, useState } from 'react';
import InputField from './InputField';
import BtnRect from './buttons/BtnRect';
import TextAreaField from './TextAreaField';
import { AuthContext } from '../contexts/AuthContext';
import { useForm } from '@tanstack/react-form';
import FormLayout from '../layouts/FormLayout';
import Loading from './Loading';
import { useParams } from 'react-router-dom';
import useDeleteModificationMutation from '../hooks/useDeleteModificationMutation/useDeleteModificationMutation';
import useCreateModificationMutation from '../hooks/useCreateModificationMutation/useCreateModificationMutation';
import useModificationQuery from '../hooks/useModificationQuery/useModificationQuery';
import { Action } from 'src/types/action';
import { Keyword } from 'src/types/keyword';
import { extractItemListIds, extractKeywordListIds } from '../utils/extractIds';
import SelectField from './SelectField';
import Icon from '@mdi/react';
import { mdiCloseBox, mdiImagePlus } from '@mdi/js';
import ThemeContainer from './ThemeContainer';
import KeywordLinkField from './form_fields/KeywordLinkField';
import Divider from './Divider';
import ActionLinkField from './form_fields/ActionLinkField';
import { ThemeContext } from '../contexts/ThemeContext';

const ModificationForm = ({
  title,
  mode,
}: {
  title: string;
  mode?: string;
}) => {
  const { apiUrl } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);
  const [formMessage, setFormMessage] = useState('');
  const [deleteMode, setDeleteMode] = useState(false);
  const { modificationId } = useParams();

  const { data: modification } = useModificationQuery(
    apiUrl,
    Number(modificationId),
  );

  const [imagePreview, setImagePreview] = useState(
    modification?.picture?.imageUrl || '',
  );

  const createModification = useCreateModificationMutation(
    apiUrl,
    Number(modificationId),
    setFormMessage,
  );
  const deleteModification = useDeleteModificationMutation(
    apiUrl,
    Number(modificationId),
    setFormMessage,
  );

  const handleDelete = () => {
    if (deleteMode) {
      deleteModification.mutate();
    } else {
      setDeleteMode(true);
    }
  };

  const handleReset = async () => {
    modificationForm.reset();
  };

  useEffect(() => {
    if (modification) {
      setImagePreview(modification.picture?.imageUrl);
    } else setImagePreview('');
  }, [modification, modificationId]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      modificationForm.setFieldValue('picture', selectedFile);

      const fileUrl = URL.createObjectURL(selectedFile);
      setImagePreview(fileUrl);
    }
  };

  const modificationForm = useForm({
    defaultValues: {
      id: modification?.id || null,
      name: modification?.name || '',
      rarity: modification?.rarity || '',
      grade: modification?.grade || 1,
      picture: modification?.picture || '',
      description: modification?.description || '',
      category: modification?.category || '',
      price: modification?.price || '',
      actions: modification?.actions || ([] as Action[]),
      keywords:
        modification?.keywords ||
        ([] as { keyword: Keyword; value?: number }[]),
    },
    onSubmit: async ({ value }) => {
      const { actions, keywords, ...rest } = value;

      const data = {
        ...rest,
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
        await createModification.mutate(formData);
      }
    },
  });

  return (
    <FormLayout
      itemId={modificationId}
      createMutation={createModification}
      deleteMutation={deleteModification}
      handleDelete={handleDelete}
      handleReset={handleReset}
      formMessage={formMessage}
      deleteMode={deleteMode}
      setDeleteMode={setDeleteMode}
    >
      <form
        className="flex flex-col gap-8"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          modificationForm.handleSubmit();
        }}
      >
        <h1 className="text-center">{title} Modification</h1>
        <div className="flex w-full gap-4 lg:gap-8">
          <modificationForm.Field
            name="name"
            validators={{
              onChange: ({ value }) =>
                value.length < 2
                  ? 'Modification name must be at least 2 characters long'
                  : undefined,
            }}
          >
            {(field) => (
              <InputField
                className="w-full"
                label="Modification name"
                field={field}
              />
            )}
          </modificationForm.Field>
          <modificationForm.Field
            name="price"
            validators={{
              onChange: ({ value }) =>
                value < 0 ? 'Price cannot be a negative value' : undefined,
            }}
          >
            {(field) => (
              <InputField
                className="max-w-28"
                type="number"
                label="Price"
                field={field}
              />
            )}
          </modificationForm.Field>
        </div>
        <div className="flex w-full items-center gap-4 lg:gap-8">
          <modificationForm.Field
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
          </modificationForm.Field>
          <modificationForm.Field
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
                label="Item grade"
                field={field}
              />
            )}
          </modificationForm.Field>
        </div>
        <modificationForm.Field
          name="category"
          validators={{
            onSubmit: ({ value }) =>
              value.length < 1
                ? 'You must select a modification type'
                : undefined,
          }}
        >
          {(field) => (
            <SelectField className="w-full" label="Category" field={field}>
              <option value=""></option>
              <option value="amod">AMOD</option>
              <option value="salamander">Salamander</option>
              <option value="vehicle">Vehicle</option>
            </SelectField>
          )}
        </modificationForm.Field>
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
                    Upload item picture
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
                    modificationForm.setFieldValue('picture', '');
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
          <modificationForm.Field
            name="description"
            validators={{
              onChange: ({ value }) =>
                value.length < 2
                  ? 'Item description must be at least 2 characters long'
                  : undefined,
            }}
          >
            {(field) => (
              <TextAreaField label="Item description" field={field} />
            )}
          </modificationForm.Field>
        </div>
        <div className="flex flex-col gap-4">
          <KeywordLinkField form={modificationForm} />
          <Divider />
          <ActionLinkField form={modificationForm} />
          <Divider />
        </div>
        <BtnRect
          ariaLabel={`${title} modification`}
          type="submit"
          className="group w-full"
        >
          {createModification.isPending ? (
            <Loading
              className="group-hover:text-yellow-300 dark:text-gray-900"
              size={1.15}
            />
          ) : (
            title
          )}
        </BtnRect>
      </form>
    </FormLayout>
  );
};

export default ModificationForm;
