import { useContext } from 'react';
import InputField from './InputField';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import BtnRect from './BtnRect';
import TextAreaField from './TextAreaField';
import { AuthContext } from '../contexts/AuthContext';
import { useForm } from '@tanstack/react-form';
import SelectField from './SelectField';
import useCreateKeywordMutation from '../hooks/useCreateKeywordMutation/useCreateKeywordMutation';

const KeywordForm = () => {
  const { apiUrl, authToken } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);

  const createKeyword = useCreateKeywordMutation(apiUrl, authToken);

  const keywordForm = useForm({
    defaultValues: {
      name: '',
      description: '',
      keywordType: '',
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      await createKeyword.mutate(value);
      keywordForm.reset({
        name: '',
        description: '',
        keywordType: '',
      });
    },
  });

  return (
    <ThemeContainer
      className="mb-auto w-full max-w-2xl lg:max-w-4xl"
      chamfer="32"
      borderColor={accentPrimary}
    >
      <form
        className="bg-primary flex w-full min-w-96 flex-col gap-8 p-4 clip-8 sm:p-6 lg:p-8"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          keywordForm.handleSubmit();
        }}
      >
        <h1 className="text-center">Create Keyword</h1>
        <keywordForm.Field
          name="name"
          validators={{
            onChange: ({ value }) =>
              value.length < 2
                ? 'Perk name must be at least 2 characters long'
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
                ? 'Perk description must be at least 2 characters long'
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
        <keywordForm.Field name="keywordType">
          {(field) => (
            <SelectField type="select" label="Keyword type" field={field}>
              <option defaultValue="" disabled></option>
              <option value="Weapon">Weapon</option>
              <option value="Armor">Armor</option>
            </SelectField>
          )}
        </keywordForm.Field>
        <BtnRect type="submit" className="w-full">
          Create
        </BtnRect>
      </form>
    </ThemeContainer>
  );
};

export default KeywordForm;
