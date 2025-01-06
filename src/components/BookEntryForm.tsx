import FormLayout from '../layouts/FormLayout';
import RichTextEditor from './RichTextEditor';
import { useOutletContext, useParams } from 'react-router-dom';
import InputField from './InputField';
import { useForm } from '@tanstack/react-form';
import BtnRect from './buttons/BtnRect';
import useCreateBookEntryMutation from '../hooks/useCreateBookEntryMutation/useCreateBookEntryMutation';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { LayoutContext } from '../contexts/LayoutContext';
import useBookEntryQuery from '../hooks/useBookEntryQuery/useBookEntryQuery';
import Loading from './Loading';
import Icon from '@mdi/react';
import { mdiAlertOutline } from '@mdi/js';
import useDeleteBookEntryMutation from '../hooks/useDeleteBookEntryMutation/useDeleteBookEntryMutation';

const BookEntryForm = () => {
  const { apiUrl } = useContext(AuthContext);
  const { layoutSize } = useContext(LayoutContext);
  const { navbarHeight } = useOutletContext();
  const { bookEntryTitle } = useParams();
  const [deleteMode, setDeleteMode] = useState(false);

  const { data: bookEntry } = useBookEntryQuery(apiUrl, bookEntryTitle);

  const createBookEntry = useCreateBookEntryMutation(apiUrl);
  const deleteBookEntry = useDeleteBookEntryMutation(apiUrl, bookEntry?.id);

  const bookEntryForm = useForm({
    defaultValues: {
      title: bookEntry?.title || '',
      content: bookEntry?.content || '',
    },
    onSubmit: async ({ value }) => {
      if (bookEntry) {
        value.bookEntryId = bookEntry.id;
      }

      console.log(value);

      await createBookEntry.mutate(value);
    },
  });

  const offsetHeight =
    layoutSize === 'xsmall' || layoutSize === 'small' ? '32px' : '64px';

  return (
    <FormLayout>
      <form
        className="bg-primary flex flex-col items-start gap-4 p-4 clip-8 sm:gap-8 sm:p-8"
        style={{
          minHeight: `calc(100dvh - ${navbarHeight}px - ${offsetHeight})`,
        }}
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          bookEntryForm.handleSubmit();
        }}
      >
        <div className="grid w-full grid-flow-row items-center gap-4 sm:gap-8 sm:px-8 lg:grid-flow-col">
          <h1 className="text-center sm:text-left">
            {bookEntry ? 'Update Book Entry' : 'Create Book Entry'}
          </h1>
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
              <InputField
                className="w-full"
                label="Section title"
                field={field}
              />
            )}
          </bookEntryForm.Field>
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
              <div className="relative w-full grow">
                <RichTextEditor
                  className="text-secondary min-h-96"
                  field={field}
                />
              </div>
              {field.state.meta.errors &&
                field.state.meta.errors.map((error, index) => (
                  <p
                    key={index}
                    className="timing text-error -my-5 text-base italic leading-5"
                    role="alert"
                  >
                    {error}
                  </p>
                ))}
            </>
          )}
        </bookEntryForm.Field>
        <div className="flex w-full flex-col gap-2">
          <div className="flex w-full items-center justify-between gap-8">
            {bookEntry && (
              <>
                <button
                  className="text-accent hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    deleteMode ? deleteBookEntry.mutate() : setDeleteMode(true);
                  }}
                >
                  Delete Entry
                </button>
                {deleteMode && (
                  <div className="grow">
                    <button
                      className="text-secondary text-left hover:underline"
                      onClick={() => setDeleteMode(false)}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </>
            )}
            <BtnRect type="submit" className="group ml-auto w-full max-w-64">
              {bookEntry?.isPending ? (
                <Loading
                  className="text-gray-900 group-hover:text-yellow-300"
                  size={1.15}
                />
              ) : bookEntry ? (
                'Update'
              ) : (
                'Create'
              )}
            </BtnRect>
          </div>
          {deleteMode && (
            <div className="flex items-center gap-4">
              <Icon className="text-error" path={mdiAlertOutline} size={1.5} />
              <p className="text-error text-base">
                Press the delete button one more time to permenantly delete this
                book entry
              </p>
            </div>
          )}
        </div>
      </form>
    </FormLayout>
  );
};

export default BookEntryForm;
