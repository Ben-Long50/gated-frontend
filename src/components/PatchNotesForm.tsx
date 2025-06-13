import FormLayout from '../layouts/FormLayout';
import { useParams } from 'react-router-dom';
import InputField from './InputField';
import { useForm } from '@tanstack/react-form';
import BtnRect from './buttons/BtnRect';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Loading from './Loading';
import LexicalEditor from './lexical/LexicalEditor';
import useCreatePatchNoteMutation from '../hooks/useCreatePatchNoteMutation/useCreatePatchNoteMutation';
import useDeletePatchNoteMutation from '../hooks/useDeletePatchNoteMutation/useDeletePatchNoteMutation';
import { useQueryClient } from '@tanstack/react-query';

const PatchNoteForm = () => {
  const { apiUrl } = useContext(AuthContext);
  const [formMessage, setFormMessage] = useState('');
  const { patchNoteId } = useParams();
  const [deleteMode, setDeleteMode] = useState(false);
  const queryClient = useQueryClient();

  const patchNotesCache = queryClient.getQueryData(['patchNotes']) || null;

  const patchNote = (() => {
    if (patchNotesCache) {
      return patchNotesCache.find((patchNote) => patchNote.id == patchNoteId);
    }
    return null;
  })();

  const createPatchNote = useCreatePatchNoteMutation(apiUrl, setFormMessage);
  const deletePatchNote = useDeletePatchNoteMutation(
    apiUrl,
    patchNote?.id,
    setFormMessage,
  );

  const handleDelete = () => {
    if (deleteMode) {
      deletePatchNote.mutate();
    } else {
      setDeleteMode(true);
    }
  };

  const handleReset = async () => {
    patchNoteForm.reset();
  };

  const patchNoteForm = useForm({
    defaultValues: {
      version: patchNote?.version ?? '',
      title: patchNote?.title ?? '',
      content: patchNote?.content ?? ({} as { html: string; nodes: object }),
    },
    onSubmit: async ({ value }) => {
      if (patchNote) {
        value.patchNoteId = patchNote.id;
      }

      await createPatchNote.mutate(value);
    },
  });

  return (
    <FormLayout
      itemId={patchNoteId}
      createMutation={createPatchNote}
      deleteMutation={deletePatchNote}
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
          patchNoteForm.handleSubmit();
        }}
      >
        <div className="flex w-full flex-col items-center gap-4">
          <h1 className="text-center sm:text-left">
            {patchNote ? 'Update Patch Note' : 'Create Patch Note'}
          </h1>
          <div className="flex w-full gap-4">
            <patchNoteForm.Field
              name="title"
              validators={{
                onChange: ({ value }) =>
                  value.length < 2
                    ? 'Patch notes title needs be at least 2 characters long'
                    : undefined,
              }}
            >
              {(field) => (
                <InputField className="w-full" label="Title" field={field} />
              )}
            </patchNoteForm.Field>
            <patchNoteForm.Field
              name="version"
              validators={{
                onChange: ({ value }) =>
                  !value ? 'A version number must be provided' : undefined,
              }}
            >
              {(field) => (
                <InputField
                  className="w-24"
                  type="number"
                  label="Version"
                  field={field}
                />
              )}
            </patchNoteForm.Field>
          </div>
        </div>
        <patchNoteForm.Field
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
        </patchNoteForm.Field>
        <div className="flex w-full flex-col gap-4">
          <div className="flex w-full items-center justify-between gap-8">
            <BtnRect type="submit" className="group w-full">
              {createPatchNote.isPending ? (
                <Loading
                  className="group-hover:text-accent dark:text-gray-900"
                  size={1.15}
                />
              ) : patchNote ? (
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

export default PatchNoteForm;
