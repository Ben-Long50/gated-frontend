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
import { useLocation, useParams } from 'react-router-dom';
import useDeleteKeywordMutation from '../hooks/useDeleteKeywordMutation/useDeleteKeywordMutation';
import useKeywords from '../hooks/useKeywords';
import { Keyword } from 'src/types/keyword';
import Divider from './Divider';
import ArrowHeader2 from './ArrowHeader2';

const KeywordForm = () => {
  const { apiUrl } = useContext(AuthContext);
  const [formMessage, setFormMessage] = useState('');
  const [deleteMode, setDeleteMode] = useState(false);
  const { keywordId } = useParams();
  const location = useLocation();
  const parts = location.pathname.split('/').filter(Boolean);
  const mode = parts[parts.length - 1];

  const keywords = useKeywords();

  const keyword = Object.values(keywords.filteredKeywords)
    .flatMap((keywords) => keywords)
    .filter((keyword: Keyword) => keyword.id === Number(keywordId))[0];

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
          {mode.charAt(0).toUpperCase() + mode.slice(1) + ' Trait'}
        </h1>
        <Divider />
        <ArrowHeader2 title="Trait Information" />
        <keywordForm.Field
          name="name"
          validators={{
            onChange: ({ value }) =>
              value.length < 2
                ? 'Trait name must be at least 2 characters long'
                : undefined,
          }}
        >
          {(field) => <InputField label="Trait Name" field={field} />}
        </keywordForm.Field>
        <keywordForm.Field
          name="description"
          validators={{
            onChange: ({ value }) =>
              value.length < 2
                ? 'Trait description must be at least 2 characters long'
                : undefined,
          }}
        >
          {(field) => (
            <TextAreaField
              className="h-40 w-full"
              label="Trait Description"
              field={field}
            />
          )}
        </keywordForm.Field>
        <keywordForm.Field
          name="keywordType"
          validators={{
            onSubmit: ({ value }) =>
              value.length < 1 ? 'You must select a trait type' : undefined,
          }}
        >
          {(field) => (
            <SelectField label="Trait Type" field={field}>
              <option defaultValue="" disabled></option>
              <option value="weapon">Weapon</option>
              <option value="armor">Armor</option>
              <option value="vehicle">Vehicle</option>
              <option value="chromebits">Chromebits</option>
              <option value="hardwired">Hardwired</option>
              <option value="networked">Networked</option>
            </SelectField>
          )}
        </keywordForm.Field>
        <BtnRect
          ariaLabel={mode.charAt(0).toUpperCase() + mode.slice(1)}
          type="submit"
          className="group w-full"
        >
          {createKeyword.isPending ? (
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

export default KeywordForm;
