import { useContext, useState } from 'react';
import InputField from './InputField';
import BtnRect from './buttons/BtnRect';
import TextAreaField from './TextAreaField';
import { AuthContext } from '../contexts/AuthContext';
import { useForm } from '@tanstack/react-form';
import SelectField from './SelectField';
import useCreateKeywordMutation from '../hooks/useCreateKeywordMutation/useCreateKeywordMutation';
import FormLayout from '../layouts/FormLayout';
import Loading from './Loading';
import { useParams } from 'react-router-dom';
import useKeywordQuery from '../hooks/useKeywordQuery/useKeywordQuery';
import useDeleteKeywordMutation from '../hooks/useDeleteKeywordMutation/useDeleteKeywordMutation';

const KeywordForm = () => {
  const { apiUrl } = useContext(AuthContext);
  const [formMessage, setFormMessage] = useState('');
  const [deleteMode, setDeleteMode] = useState(false);
  const { keywordId } = useParams();

  const { data: keyword } = useKeywordQuery(apiUrl, keywordId);

  const createKeyword = useCreateKeywordMutation(
    apiUrl,
    keywordId,
    setFormMessage,
  );
  const deleteKeyword = useDeleteKeywordMutation(
    apiUrl,
    keywordId,
    setFormMessage,
  );

  const handleDelete = () => {
    if (deleteMode) {
      deleteKeyword.mutate();
    } else {
      setDeleteMode(true);
    }
  };

  const handleReset = async () => {
    keywordForm.reset();
  };

  const keywordForm = useForm({
    defaultValues: {
      name: keyword?.name || '',
      description: keyword?.description || '',
      keywordType: keyword?.keywordType || '',
    },
    onSubmit: async ({ value }) => {
      await createKeyword.mutate(value);
    },
  });

  return (
    <FormLayout
      itemId={keywordId}
      createMutation={createKeyword}
      deleteMutation={deleteKeyword}
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
          keywordForm.handleSubmit();
        }}
      >
        <h1 className="text-center">
          {keyword ? 'Update Keyword' : 'Create Keyword'}
        </h1>
        <keywordForm.Field
          name="name"
          validators={{
            onChange: ({ value }) =>
              value.length < 2
                ? 'Keyword name must be at least 2 characters long'
                : undefined,
          }}
        >
          {(field) => <InputField label="Keyword name" field={field} />}
        </keywordForm.Field>
        <keywordForm.Field
          name="description"
          validators={{
            onChange: ({ value }) =>
              value.length < 2
                ? 'Keyword description must be at least 2 characters long'
                : undefined,
          }}
        >
          {(field) => (
            <TextAreaField
              className="h-40 w-full"
              label="Keyword description"
              field={field}
            />
          )}
        </keywordForm.Field>
        <keywordForm.Field
          name="keywordType"
          validators={{
            onSubmit: ({ value }) =>
              value.length < 1 ? 'You must select a keyword type' : undefined,
          }}
        >
          {(field) => (
            <SelectField type="select" label="Keyword type" field={field}>
              <option defaultValue="" disabled></option>
              <option value="weapon">Weapon</option>
              <option value="armor">Armor</option>
              <option value="cybernetic">Cybernetic</option>
            </SelectField>
          )}
        </keywordForm.Field>
        <BtnRect type="submit" className="group w-full">
          {createKeyword.isPending ? (
            <Loading
              className="group-hover:text-yellow-300 dark:text-gray-900"
              size={1.15}
            />
          ) : keyword ? (
            'Update'
          ) : (
            'Create'
          )}
        </BtnRect>
      </form>
    </FormLayout>
  );
};

export default KeywordForm;
