import { useForm } from '@tanstack/react-form';
import { useContext, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import BtnRect from './buttons/BtnRect';
import Loading from './Loading';
import TextAreaField from './TextAreaField';
import InputField from './InputField';
import useCreateConditionMutation from '../hooks/useCreateConditionMutation/useCreateConditionMutation';
import useDeleteConditionMutation from '../hooks/useDeleteConditionMutation/useDeleteConditionMutation';
import FormLayout from '../layouts/FormLayout';
import useConditions from '../hooks/useConditions';
import { Condition } from 'src/types/condition';
import ArrowHeader2 from './ArrowHeader2';
import Divider from './Divider';
import InputSelectField from './InputSelectField';
import { capitalCase } from 'change-case';

const ConditionForm = () => {
  const { apiUrl } = useContext(AuthContext);
  const [formMessage, setFormMessage] = useState('');
  const [deleteMode, setDeleteMode] = useState(false);
  const { conditionId } = useParams();
  const location = useLocation();
  const parts = location.pathname.split('/').filter(Boolean);
  const mode = parts[parts.length - 1];

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
        <h1 className="text-center">{capitalCase(mode) + ' Condition'}</h1>
        <Divider />
        <ArrowHeader2 title="Condition Information" />
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
            <InputField className="grow" label="Condition Name" field={field} />
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
            <InputSelectField
              className="grow"
              label="Condition Type"
              field={field}
              options={['character', 'item']}
            />
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
            <TextAreaField label="Condition Description" field={field} />
          )}
        </conditionForm.Field>
        <BtnRect
          ariaLabel={capitalCase(mode)}
          type="submit"
          className="group w-full"
        >
          {createCondition.isPending ? (
            <Loading
              className="group-hover:text-accent dark:text-gray-900"
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

export default ConditionForm;
