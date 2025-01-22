import { useForm } from '@tanstack/react-form';
import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import BtnRect from './buttons/BtnRect';
import Loading from './Loading';
import TextAreaField from './TextAreaField';
import InputField from './InputField';
import useCreateConditionMutation from '../hooks/useCreateConditionMutation/useCreateConditionMutation';
import useDeleteConditionMutation from '../hooks/useDeleteConditionMutation/useDeleteConditionMutation';
import FormLayout from '../layouts/FormLayout';
import SelectField from './SelectField';
import useConditions from '../hooks/useConditions';
import { Condition } from 'src/types/condition';

const ConditionForm = () => {
  const { apiUrl } = useContext(AuthContext);
  const [formMessage, setFormMessage] = useState('');
  const [deleteMode, setDeleteMode] = useState(false);
  const { conditionId } = useParams();

  const conditions = useConditions();

  const condition = conditions.filteredConditions.filter(
    (condition: Condition) => condition.id === Number(conditionId),
  )[0];

  const createCondition = useCreateConditionMutation(
    apiUrl,
    conditionId,
    setFormMessage,
  );
  const deleteCondition = useDeleteConditionMutation(
    apiUrl,
    conditionId,
    setFormMessage,
  );

  const handleDelete = () => {
    if (deleteMode) {
      deleteCondition.mutate();
    } else {
      setDeleteMode(true);
    }
  };

  const handleReset = async () => {
    conditionForm.reset();
  };

  const conditionForm = useForm({
    defaultValues: {
      name: condition?.name || '',
      type: condition?.conditionType || '',
      description: condition?.description || '',
    },
    onSubmit: async ({ value }) => {
      console.log(value);

      await createCondition.mutate(value);
    },
  });

  return (
    <FormLayout
      itemId={conditionId}
      createMutation={createCondition}
      deleteMutation={deleteCondition}
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
          conditionForm.handleSubmit();
        }}
      >
        <h1 className="text-center">
          {condition ? 'Update Condition' : 'Create Condition'}
        </h1>
        <conditionForm.Field
          name="name"
          validators={{
            onChange: ({ value }) =>
              value.length < 2
                ? 'Condition name must be at least 2 characters long'
                : undefined,
          }}
        >
          {(field) => (
            <InputField className="grow" label="Condition name" field={field} />
          )}
        </conditionForm.Field>
        <conditionForm.Field
          name="type"
          validators={{
            onChange: ({ value }) =>
              value.length < 1
                ? 'A condition type must be selected'
                : undefined,
          }}
        >
          {(field) => (
            <SelectField className="grow" label="Condition type" field={field}>
              <option defaultValue=""></option>
              <option value="character">Character</option>
              <option value="item">Item</option>
            </SelectField>
          )}
        </conditionForm.Field>
        <conditionForm.Field
          name="description"
          validators={{
            onChange: ({ value }) =>
              value.length < 2
                ? 'Condition description must be at least 2 characters long'
                : undefined,
          }}
        >
          {(field) => (
            <TextAreaField
              className="h-40 w-full"
              label="Condition description"
              field={field}
            />
          )}
        </conditionForm.Field>
        <BtnRect type="submit" className="group w-full">
          {createCondition.isPending ? (
            <Loading
              className="group-hover:text-yellow-300 dark:text-gray-900"
              size={1.15}
            />
          ) : condition ? (
            'Update'
          ) : (
            'Create'
          )}
        </BtnRect>
      </form>
    </FormLayout>
  );
};

export default ConditionForm;
