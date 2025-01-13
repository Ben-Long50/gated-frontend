import FormLayout from '../layouts/FormLayout';
import { useParams } from 'react-router-dom';
import InputField from './InputField';
import { useForm } from '@tanstack/react-form';
import BtnRect from './buttons/BtnRect';
import useCreateBookEntryMutation from '../hooks/useCreateBookEntryMutation/useCreateBookEntryMutation';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import useBookEntryQuery from '../hooks/useBookEntryQuery/useBookEntryQuery';
import Loading from './Loading';
import useDeleteBookEntryMutation from '../hooks/useDeleteBookEntryMutation/useDeleteBookEntryMutation';
import LexicalEditor from './lexical/LexicalEditor';
import SelectField from './SelectField';
import useBookSectionsQuery from '../hooks/useBookSectionsQuery/useBookSectionsQuery';

const BookEntryForm = () => {
  const { apiUrl } = useContext(AuthContext);
  const [formMessage, setFormMessage] = useState('');
  const { bookEntryId } = useParams();
  const [deleteMode, setDeleteMode] = useState(false);

  const { data: bookSections } = useBookSectionsQuery(apiUrl);
  const { data: bookEntry } = useBookEntryQuery(apiUrl, bookEntryId);

  const createBookEntry = useCreateBookEntryMutation(apiUrl, setFormMessage);
  const deleteBookEntry = useDeleteBookEntryMutation(
    apiUrl,
    bookEntry?.id,
    setFormMessage,
  );

  const handleDelete = () => {
    if (deleteMode) {
      deleteBookEntry.mutate();
    } else {
      setDeleteMode(true);
    }
  };

  const handleReset = async () => {
    bookEntryForm.reset();
  };

  const bookEntryForm = useForm({
    defaultValues: {
      page: bookEntry?.page || '',
      title: bookEntry?.title || '',
      section: bookEntry?.sectionId || '',
      content: bookEntry?.content || ({} as { html: string; nodes: string }),
    },
    onSubmit: async ({ value }) => {
      if (bookEntry) {
        value.bookEntryId = bookEntry.id;
      }

      console.log(value);

      await createBookEntry.mutate(value);
    },
  });

  return (
    <FormLayout
      itemId={bookEntryId}
      createMutation={createBookEntry}
      deleteMutation={deleteBookEntry}
      handleDelete={handleDelete}
      handleReset={handleReset}
      formMessage={formMessage}
      deleteMode={deleteMode}
      setDeleteMode={setDeleteMode}
    >
      <form
        className="flex flex-col items-start gap-8"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          bookEntryForm.handleSubmit();
        }}
      >
        <div className="flex w-full flex-col items-center gap-4">
          <h1 className="text-center sm:text-left">
            {bookEntry ? 'Update Book Entry' : 'Create Book Entry'}
          </h1>
          <div className="flex w-full gap-4">
            <bookEntryForm.Field
              name="title"
              validators={{
                onChange: ({ value }) =>
                  value.length < 2
                    ? 'Section title be at least 2 characters long'
                    : undefined,
              }}
            >
              {(field) => (
                <InputField className="w-full" label="Title" field={field} />
              )}
            </bookEntryForm.Field>
            <div className="flex items-center gap-4">
              <bookEntryForm.Field
                name="section"
                validators={{
                  onChange: ({ value }) =>
                    !value ? 'A book section must be chosen' : undefined,
                }}
              >
                {(field) => (
                  <SelectField
                    className="w-full min-w-72"
                    label="Section"
                    field={field}
                  >
                    <option value=""></option>
                    {bookSections?.map((section) => {
                      return (
                        <option key={section.id} value={section.id}>
                          {section.title[0].toUpperCase() +
                            section.title.slice(1)}
                        </option>
                      );
                    })}
                  </SelectField>
                )}
              </bookEntryForm.Field>
              <bookEntryForm.Field
                name="page"
                validators={{
                  onChange: ({ value }) =>
                    !value ? 'A page number must be provided' : undefined,
                }}
              >
                {(field) => (
                  <InputField
                    className="w-24"
                    type="number"
                    label="Page"
                    field={field}
                  />
                )}
              </bookEntryForm.Field>
            </div>
          </div>
        </div>
        <bookEntryForm.Field
          name="content"
          validators={{
            onChange: ({ value }) =>
              value.length < 20
                ? 'Section content has not met the minimum length requirement'
                : undefined,
          }}
        >
          {(field) => (
            <>
              <LexicalEditor field={field} />
              {field.state.meta.errors &&
                field.state.meta.errors.map((error, index) => (
                  <p
                    key={index}
                    className="timing text-error text-base italic leading-5"
                    role="alert"
                  >
                    {error}
                  </p>
                ))}
            </>
          )}
        </bookEntryForm.Field>
        <div className="flex w-full flex-col gap-4">
          <div className="flex w-full items-center justify-between gap-8">
            <BtnRect type="submit" className="group w-full">
              {createBookEntry.isPending ? (
                <Loading
                  className="group-hover:text-yellow-300 dark:text-gray-900"
                  size={1.15}
                />
              ) : bookEntry ? (
                'Update'
              ) : (
                'Create'
              )}
            </BtnRect>
          </div>
        </div>
      </form>
    </FormLayout>
  );
};

export default BookEntryForm;
