import { useForm } from '@tanstack/react-form';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import BtnRect from './buttons/BtnRect';
import Loading from './Loading';
import FormLayout from '../layouts/FormLayout';
import { useParams } from 'react-router-dom';
import LexicalEditor from './lexical/LexicalEditor';
import useNotesQuery from '../hooks/useNotesQuery/useNotesQuery';
import useCreateNotesMutation from '../hooks/useCreateNotesMutation/useCreateNotesMutation';

const NotesForm = ({ title, mode }: { title: string; mode?: string }) => {
  const { apiUrl } = useContext(AuthContext);
  const { campaignId, sessionId, characterId } = useParams();
  const [formMessage, setFormMessage] = useState('');
  const [deleteMode, setDeleteMode] = useState(false);

  const createNotes = useCreateNotesMutation(
    apiUrl,
    Number(campaignId),
    Number(sessionId),
    Number(characterId),
    setFormMessage,
  );

  const {
    data: notes,
    isLoading: notesLoading,
    isPaused: notesPending,
  } = useNotesQuery(
    apiUrl,
    Number(campaignId),
    Number(sessionId),
    Number(characterId),
  );

  const isLoading = notesLoading;
  const isPending = notesPending;

  const handleReset = async () => {
    notesForm.reset();
  };

  const notesForm = useForm({
    defaultValues: {
      content: notes?.content || ({} as { html: string; nodes: object }),
    },

    onSubmit: async ({ value }) => {
      if (mode === 'create' || mode === 'update') {
        await createNotes.mutate(value.content);
      }
    },
  });

  if (isLoading || isPending) return <Loading />;

  return (
    <FormLayout
      itemId={sessionId}
      createMutation={createNotes}
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
          if (createNotes.isPending) return;
          notesForm.handleSubmit();
        }}
      >
        <div className="flex items-center justify-center gap-4">
          <h1>{title} Notes</h1>
        </div>

        <notesForm.Field name="content">
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
        </notesForm.Field>
        <BtnRect
          ariaLabel={`${title} session`}
          type="submit"
          className="group w-full"
        >
          {createNotes.isPending ? (
            <Loading
              className="group-hover:text-accent dark:text-gray-900"
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

export default NotesForm;
