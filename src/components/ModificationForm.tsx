import { useContext, useState } from 'react';
import InputField from './InputField';
import BtnRect from './buttons/BtnRect';
import TextAreaField from './TextAreaField';
import { AuthContext } from '../contexts/AuthContext';
import { useForm } from '@tanstack/react-form';
import FormLayout from '../layouts/FormLayout';
import Loading from './Loading';
import { useLocation, useParams } from 'react-router-dom';
import useDeleteModificationMutation from '../hooks/useDeleteModificationMutation/useDeleteModificationMutation';
import useCreateModificationMutation from '../hooks/useCreateModificationMutation/useCreateModificationMutation';
import useModificationQuery from '../hooks/useModificationQuery/useModificationQuery';
import { Action } from 'src/types/action';
import { Keyword } from 'src/types/keyword';
import { extractItemListIds, extractKeywordListIds } from '../utils/extractIds';
import SelectField from './SelectField';
import KeywordLinkField from './form_fields/KeywordLinkField';
import Divider from './Divider';
import ActionLinkField from './form_fields/ActionLinkField';
import PictureField from './form_fields/PictureField';
import RarityField from './form_fields/RarityField';

const ModificationForm = () => {
  const { apiUrl } = useContext(AuthContext);
  const [formMessage, setFormMessage] = useState('');
  const [deleteMode, setDeleteMode] = useState(false);
  const { modificationId } = useParams();
  const location = useLocation();
  const parts = location.pathname.split('/').filter(Boolean);
  const mode = parts[parts.length - 1];

  const { data: modification } = useModificationQuery(
    apiUrl,
    Number(modificationId),
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

  const modificationForm = useForm({
    defaultValues: {
      id: modification?.id || null,
      name: modification?.name || '',
      rarity: modification?.rarity || '',
      grade: modification?.grade || 1,
      picture: modification?.picture || '',
      position: modification?.picture?.position || { x: 50, y: 50 },
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
        <h1 className="text-center">
          {mode.charAt(0).toUpperCase() + mode.slice(1) + ' Modification'}
        </h1>
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
          <RarityField form={modificationForm} />
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
        <div className="grid w-full gap-8 max-sm:col-span-2 max-sm:grid-flow-row sm:grid-cols-2">
          <PictureField
            form={modificationForm}
            sizeInfo={{ aspectRatio: '1/1', maxHeight: '', minHeight: '' }}
          />
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
          ariaLabel={`${mode.charAt(0).toUpperCase() + mode.slice(1)} modification`}
          type="submit"
          className="group w-full"
        >
          {createModification.isPending ? (
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

export default ModificationForm;
