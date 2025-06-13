import FormLayout from '../layouts/FormLayout';
import { useParams } from 'react-router-dom';
import { useForm } from '@tanstack/react-form';
import BtnRect from './buttons/BtnRect';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Loading from './Loading';
import LexicalEditor from './lexical/LexicalEditor';
import useCharacterQuery from '../hooks/useCharacterQuery/useCharacterQuery';
import useUpdateCharacterMutation from '../hooks/useCharacterUpdateMutation/useCharacterUpdateMutation';
import ArrowHeader2 from './ArrowHeader2';

const ResumeForm = () => {
  const { apiUrl } = useContext(AuthContext);
  const [formMessage, setFormMessage] = useState('');
  const { characterId } = useParams();

  const {
    data: character,
    isLoading,
    isPending,
  } = useCharacterQuery(Number(characterId));

  const updateCharacter = useUpdateCharacterMutation(
    apiUrl,
    Number(characterId),
    setFormMessage,
  );

  const handleReset = async () => {
    resumeForm.reset();
  };

  const resumeForm = useForm({
    defaultValues: {
      backstory:
        character?.backstory ?? ({} as { html: string; nodes: object }),
      firstTaste:
        character?.firstTaste ?? ({} as { html: string; nodes: object }),
      badMedicine:
        character?.badMedicine ?? ({} as { html: string; nodes: object }),
    },
    onSubmit: async ({ value }) => {
      const formData = new FormData();

      Object.entries(value).forEach(([key, val]) => {
        formData.append(key, JSON.stringify(val));
      });

      await updateCharacter.mutate(formData);
    },
  });

  if (isLoading || isPending) return <Loading />;

  return (
    <FormLayout
      itemId={characterId}
      modifyMutation={updateCharacter}
      handleReset={handleReset}
      formMessage={formMessage}
    >
      <form
        className="flex flex-col items-start gap-8"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          resumeForm.handleSubmit();
        }}
      >
        <div className="flex w-full flex-col items-center gap-4">
          <h1 className="text-center sm:text-left">
            {'Update ' +
              character.firstName +
              ' ' +
              character.lastName +
              "'s Resume"}
          </h1>
        </div>
        <ArrowHeader2 title="Backstory" />
        <resumeForm.Field
          name="backstory"
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
        </resumeForm.Field>
        <ArrowHeader2 title="First Taste" />
        <resumeForm.Field
          name="firstTaste"
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
        </resumeForm.Field>
        <ArrowHeader2 title="Bad Medicine" />
        <resumeForm.Field
          name="badMedicine"
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
        </resumeForm.Field>
        <div className="flex w-full flex-col gap-4">
          <div className="flex w-full items-center justify-between gap-8">
            <BtnRect
              ariaLabel="Update resume"
              type="submit"
              className="group w-full"
            >
              {updateCharacter.isPending ? (
                <Loading
                  className="group-hover:text-accent dark:text-gray-900"
                  size={1.15}
                />
              ) : (
                'Update'
              )}
            </BtnRect>
          </div>
        </div>
      </form>
    </FormLayout>
  );
};

export default ResumeForm;
