import { useContext, useState } from 'react';
import InputField from './InputField';
import BtnRect from './buttons/BtnRect';
import TextAreaField from './TextAreaField';
import { AuthContext } from '../contexts/AuthContext';
import { useForm } from '@tanstack/react-form';
import useCreateKeywordMutation from '../hooks/useCreateKeywordMutation/useCreateKeywordMutation';
import FormLayout from '../layouts/FormLayout';
import Loading from './Loading';
import { useLocation, useParams } from 'react-router-dom';
import useDeleteKeywordMutation from '../hooks/useDeleteKeywordMutation/useDeleteKeywordMutation';
import useKeywords from '../hooks/useKeywords';
import { Keyword } from 'src/types/keyword';
import Divider from './Divider';
import ArrowHeader2 from './ArrowHeader2';
import InputSelectField from './InputSelectField';
import { capitalCase } from 'change-case';

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
    Number(keywordId),
    setFormMessage,
  );
  const deleteKeyword = useDeleteKeywordMutation(
    apiUrl,
    Number(keywordId),
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
      gpCost: keyword?.gpCost || null,
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
        <h1 className="text-center">{capitalCase(mode) + ' Trait'}</h1>
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
              className="w-full"
              label="Trait Description"
              field={field}
            />
          )}
        </keywordForm.Field>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <keywordForm.Field
            name="keywordType"
            validators={{
              onSubmit: ({ value }) =>
                value.length < 1 ? 'You must select a trait type' : undefined,
            }}
          >
            {(field) => (
              <InputSelectField
                options={[
                  'weapon',
                  'armor',
                  'vehicle',
                  'chromebits',
                  'hardwired',
                  'networked',
                ]}
                field={field}
                label="Trait Type"
              />
            )}
          </keywordForm.Field>
          <keywordForm.Field
            name="gpCost"
            validators={{
              onSubmit: ({ value }) =>
                !value ? 'You must enter GP cost' : undefined,
            }}
          >
            {(field) => (
              <InputField field={field} type="number" label="GP Cost" />
            )}
          </keywordForm.Field>
        </div>
        <BtnRect
          ariaLabel={capitalCase(mode)}
          type="submit"
          className="group w-full"
        >
          {createKeyword.isPending ? (
            <Loading
              className="group-hover:text-yellow-300 dark:text-gray-900"
              size={1.15}
            />
          ) : (
            capitalCase(mode)
          )}
        </BtnRect>
      </form>
    </FormLayout>
  );
};

export default KeywordForm;
