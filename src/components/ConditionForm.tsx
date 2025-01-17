import { useForm } from '@tanstack/react-form';
import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import BtnRect from './buttons/BtnRect';
import Loading from './Loading';
import TextAreaField from './TextAreaField';
import InputField from './InputField';
import SelectField from './SelectField';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import {
  Modifier,
  ModifierOperator,
  ModifierType,
  Stat,
} from 'src/types/modifier';
import useConditionQuery from '../hooks/useConditionQuery/useConditionQuery';
import useCreateConditionMutation from '../hooks/useCreateConditionMutation/useCreateConditionMutation';
import useDeleteConditionMutation from '../hooks/useDeleteConditionMutation/useDeleteConditionMutation';
import FormLayout from '../layouts/FormLayout';
import useActions from '../hooks/useActions';

const ConditionForm = () => {
  const { apiUrl } = useContext(AuthContext);
  const [formMessage, setFormMessage] = useState('');
  const [deleteMode, setDeleteMode] = useState(false);
  const { conditionId } = useParams();

  const actions = useActions();

  const { data: condition } = useConditionQuery(apiUrl, conditionId);

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

  const types: ModifierType[] = ['Roll', 'Stat'];

  const operators: ModifierOperator[] = [
    'add',
    'subtract',
    'multiply',
    'divide',
  ];
  const stats: Stat[] = [
    'Health',
    'Max health',
    'Sanity',
    'Max sanity',
    'Cyber',
    'Equip',
    'Speed',
    'Evasion',
    'Armor',
    'Ward',
  ];

  const conditionForm = useForm({
    defaultValues: {
      name: condition?.name || '',
      description: condition?.description || '',
      modifiers: condition?.modifiers || ([] as Modifier[]),
    },
    onSubmit: async ({ value }) => {
      console.log(value);

      //   await createCondition.mutate(value);
    },
  });

  if (actions.isLoading || actions.isPending) return <Loading />;

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
        <conditionForm.Field name="modifiers" mode="array">
          {(field) => {
            return (
              <div className="flex w-full flex-col gap-4 lg:gap-8">
                {field.state.value.map((_, i: number) => {
                  return (
                    <div
                      key={i}
                      className="flex flex-col gap-4 sm:flex-row lg:gap-6"
                    >
                      <conditionForm.Field name={`modifiers[${i}].type`}>
                        {(subField) => {
                          return (
                            <SelectField
                              className="grow"
                              label="Modifier Type"
                              field={subField}
                            >
                              {types.map((type) => {
                                return (
                                  <option key={type} value={type}>
                                    {type}
                                  </option>
                                );
                              })}
                            </SelectField>
                          );
                        }}
                      </conditionForm.Field>
                      <conditionForm.Subscribe
                        selector={(state) => state.values.modifiers[i].type}
                      >
                        {(modifierType) => (
                          <>
                            {modifierType === 'Roll' && (
                              <>
                                <conditionForm.Field
                                  name={`modifiers[${i}].action`}
                                >
                                  {(subField) => {
                                    return (
                                      <SelectField
                                        className="grow"
                                        label="Action"
                                        field={subField}
                                      >
                                        <option defaultValue=""></option>
                                        {Object.values(
                                          actions.filteredActions,
                                        ).flatMap((item) => {
                                          return item.list.map((action) => (
                                            <option
                                              key={action.id}
                                              value={action.name}
                                            >
                                              {action.name}
                                            </option>
                                          ));
                                        })}
                                      </SelectField>
                                    );
                                  }}
                                </conditionForm.Field>
                                <conditionForm.Field
                                  name={`modifiers[${i}].operator`}
                                >
                                  {(subField) => {
                                    return (
                                      <SelectField
                                        className="grow"
                                        label="Operator"
                                        field={subField}
                                      >
                                        <option defaultValue=""></option>
                                        {Object.values(operators).map(
                                          (item) => {
                                            return (
                                              <option key={item} value={item}>
                                                {item}
                                              </option>
                                            );
                                          },
                                        )}
                                      </SelectField>
                                    );
                                  }}
                                </conditionForm.Field>
                                <conditionForm.Field
                                  name={`modifiers[${i}].dice`}
                                >
                                  {(subField) => {
                                    return (
                                      <InputField
                                        className="max-w-28"
                                        type="number"
                                        label="Dice"
                                        field={subField}
                                      />
                                    );
                                  }}
                                </conditionForm.Field>
                              </>
                            )}
                            {modifierType === 'Stat' && (
                              <>
                                <conditionForm.Field
                                  name={`modifiers[${i}].stat`}
                                >
                                  {(subField) => {
                                    return (
                                      <SelectField
                                        className="grow"
                                        label="Stat"
                                        field={subField}
                                      >
                                        <option defaultValue=""></option>
                                        {stats.map((item) => {
                                          return (
                                            <option key={item} value={item}>
                                              {item}
                                            </option>
                                          );
                                        })}
                                      </SelectField>
                                    );
                                  }}
                                </conditionForm.Field>
                                <conditionForm.Field
                                  name={`modifiers[${i}].operator`}
                                >
                                  {(subField) => {
                                    return (
                                      <SelectField
                                        className="grow"
                                        label="Operator"
                                        field={subField}
                                      >
                                        <option defaultValue=""></option>
                                        {Object.values(operators).map(
                                          (item) => {
                                            return (
                                              <option key={item} value={item}>
                                                {item}
                                              </option>
                                            );
                                          },
                                        )}
                                      </SelectField>
                                    );
                                  }}
                                </conditionForm.Field>
                                <conditionForm.Field
                                  name={`modifiers[${i}].value`}
                                >
                                  {(subField) => {
                                    return (
                                      <InputField
                                        className="max-w-28"
                                        type="number"
                                        label="Value"
                                        field={subField}
                                      />
                                    );
                                  }}
                                </conditionForm.Field>
                              </>
                            )}
                          </>
                        )}
                      </conditionForm.Subscribe>
                      <button
                        className="sm:-ml-2 lg:-ml-4"
                        onClick={() => field.removeValue(i)}
                        type="button"
                      >
                        <Icon
                          className="text-tertiary"
                          path={mdiClose}
                          size={1}
                        />
                      </button>
                    </div>
                  );
                })}
                <div className="my-auto flex items-center justify-end gap-4 self-end sm:col-start-2 lg:gap-8">
                  <button
                    className="text-accent self-end hover:underline"
                    onClick={() =>
                      field.pushValue({
                        type: 'Roll',
                      })
                    }
                    type="button"
                  >
                    Add modifier
                  </button>
                </div>
              </div>
            );
          }}
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
