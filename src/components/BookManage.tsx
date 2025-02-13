import FormLayout from '../layouts/FormLayout';
import InputField from './InputField';
import { useForm } from '@tanstack/react-form';
import BtnRect from './buttons/BtnRect';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Loading from './Loading';
import useBookSectionsQuery from '../hooks/useBookSectionsQuery/useBookSectionsQuery';
import useCreateBookSectionMutation from '../hooks/useCreateBookSectionMutation/useCreateBookSectionMutation';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import useDeleteBookSectionMutation from '../hooks/useDeleteBookSectionMutation/useDeleteBookSectionMutation';

const BookManage = () => {
  const { apiUrl } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);
  const [formMessage, setFormMessage] = useState('');
  const [deleteMode, setDeleteMode] = useState(false);
  const [section, setSection] = useState({});

  const {
    data: bookSections,
    isLoading,
    isPending,
  } = useBookSectionsQuery(apiUrl);

  const createBookSection = useCreateBookSectionMutation(
    apiUrl,
    setFormMessage,
  );

  const deleteBookSection = useDeleteBookSectionMutation(
    apiUrl,
    setFormMessage,
  );

  const handleDelete = () => {
    if (deleteMode) {
      deleteBookSection.mutate(section.id);
      setDeleteMode(false);
    } else {
      setDeleteMode(true);
    }
  };

  const handleReset = async () => {
    bookSectionForm.reset({ title: '' });
    setSection({});
    setFormMessage('');
  };

  const bookSectionForm = useForm({
    defaultValues: {
      title: section.title || '',
    },
    onSubmit: async ({ value }) => {
      if (section.id) {
        value.bookSectionId = section.id;
      }

      await createBookSection.mutate(value);
    },
  });

  if (isLoading || isPending) {
    return <Loading />;
  }

  return (
    <div className="flex w-full max-w-5xl flex-col gap-8">
      <h1 className="text-center">Manage Book</h1>
      <ThemeContainer
        className="rounded-5xl shadow-xl shadow-zinc-950"
        chamfer="32"
        borderColor={accentPrimary}
      >
        <div className="bg-primary flex flex-col gap-4 p-4 clip-8 sm:p-6 lg:p-8">
          {bookSections?.map((section) => {
            return (
              <div
                className={`bg-secondary mb-auto flex w-full cursor-pointer flex-col gap-4 p-4 clip-6`}
                key={section.id}
              >
                <div className="flex w-full justify-between px-4">
                  <h3>
                    {section.title[0].toUpperCase() + section.title.slice(1)}
                  </h3>
                  <div className="flex items-center gap-8">
                    <button
                      className="text-accent hover:underline"
                      onClick={() => setSection(section)}
                    >
                      Edit
                    </button>
                    <h3 className="text-accent">{section.order}</h3>
                  </div>
                </div>

                {section.entries.length > 0 && (
                  <>
                    <hr className="border border-yellow-300 border-opacity-50" />
                    <div className="flex flex-col gap-2">
                      {section.entries?.map((entry) => {
                        return (
                          <div
                            className={`mb-auto flex w-full items-center justify-between px-8`}
                            key={entry.id}
                          >
                            <p>
                              {entry.title[0].toUpperCase() +
                                entry.title.slice(1)}
                            </p>
                            <p>{entry.page}</p>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </ThemeContainer>
      <FormLayout
        itemId={section.id}
        createMutation={createBookSection}
        deleteMutation={deleteBookSection}
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
            bookSectionForm.handleSubmit();
          }}
        >
          <div className="grid w-full grid-flow-row items-center gap-4 sm:gap-8 sm:px-8 lg:grid-flow-col">
            <h2 className="text-center sm:text-left">
              {section.id ? 'Update book section' : 'Create Book Section'}
            </h2>
            <bookSectionForm.Field
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
            </bookSectionForm.Field>
          </div>
          <div className="flex w-full flex-col gap-4">
            <div className="flex w-full items-center justify-between gap-8">
              <BtnRect type="submit" className="group w-full">
                {createBookSection.isPending ? (
                  <Loading
                    className="group-hover:text-yellow-300 dark:text-gray-900"
                    size={1.15}
                  />
                ) : section.id ? (
                  'Update'
                ) : (
                  'Create'
                )}
              </BtnRect>
            </div>
          </div>
        </form>
      </FormLayout>
    </div>
  );
};

export default BookManage;
