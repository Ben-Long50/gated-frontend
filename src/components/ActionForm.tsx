import { useContext } from 'react';
import InputField from './InputField';
import BtnRect from './BtnRect';
import TextAreaField from './TextAreaField';
import { AuthContext } from '../contexts/AuthContext';
import { useForm } from '@tanstack/react-form';
import useAttributeTree from '../hooks/useAttributeTree';
import SelectField from './SelectField';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import FormLayout from '../layouts/FormLayout';
import useCreateActionMutation from '../hooks/useCreateActionMutation/useCreateActionMutation';

const ActionForm = () => {
  const { apiUrl, authToken } = useContext(AuthContext);

  const createAction = useCreateActionMutation(apiUrl, authToken);
  const attributeTree = useAttributeTree();

  const actionForm = useForm({
    defaultValues: {
      name: '',
      costs: [{ stat: 'actionPoints', value: 1 }] as {
        stat: string;
        value: number;
      }[],
      attribute: '',
      skill: '',
      actionType: '',
      actionSubtypes: [] as string[],
      description: '',
    },
    onSubmit: async ({ value }) => {
      await createAction.mutate(value);

      console.log(value);

      actionForm.reset({
        name: '',
        costs: [] as { stat: string; value: number }[],
        attribute: '',
        skill: '',
        actionType: '',
        actionSubtypes: [] as string[],
        description: '',
      });
    },
  });

  return (
    <FormLayout>
      <form
        className="bg-primary flex w-full min-w-96 flex-col gap-8 p-4 clip-8 sm:p-6 lg:p-8"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          actionForm.handleSubmit();
        }}
      >
        <h1 className="text-center">Create Action</h1>
        <actionForm.Field
          name="name"
          validators={{
            onChange: ({ value }) =>
              value.length < 2
                ? 'Action name must be at least 2 characters long'
                : undefined,
          }}
        >
          {(field) => (
            <InputField className="grow" label="Action name" field={field} />
          )}
        </actionForm.Field>
        <actionForm.Field name="costs" mode="array">
          {(field) => {
            return (
              <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:gap-8">
                {field.state.value.map((_, i) => {
                  return (
                    <div key={i} className="flex gap-2 sm:gap-4 lg:gap-6">
                      <actionForm.Field name={`costs[${i}].stat`}>
                        {(subField) => {
                          return (
                            <SelectField
                              className="grow"
                              label="Stat"
                              field={subField}
                            >
                              <option defaultValue=""></option>
                              <option value="actionPoints">
                                Action points
                              </option>
                              <option value="power">Power</option>
                              <option value="health">Health</option>
                              <option value="sanity">Sanity</option>
                            </SelectField>
                          );
                        }}
                      </actionForm.Field>
                      <actionForm.Field key={i} name={`costs[${i}].value`}>
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
                      </actionForm.Field>
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
                    onClick={() => field.pushValue({ stat: '', value: 1 })}
                    type="button"
                  >
                    Add cost
                  </button>
                </div>
              </div>
            );
          }}
        </actionForm.Field>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:gap-8">
          <actionForm.Field
            name="attribute"
            listeners={{
              onChange: () => {
                actionForm.setFieldValue('skill', '');
              },
            }}
          >
            {(field) => (
              <SelectField label="Attribute" field={field}>
                <option defaultValue=""></option>
                {Object.entries(attributeTree.tree).map(([attribute, _]) => {
                  return (
                    <option key={attribute} value={`${attribute}`}>
                      {attribute[0].toUpperCase() + attribute.slice(1)}
                    </option>
                  );
                })}
              </SelectField>
            )}
          </actionForm.Field>
          <actionForm.Field name="skill">
            {(field) => {
              return (
                <SelectField label="Skill" field={field}>
                  <option defaultValue=""></option>
                  {actionForm.state.values.attribute &&
                    Object.entries(
                      attributeTree.tree[actionForm.state.values.attribute]
                        .skills,
                    ).map(([skill, _]) => {
                      return (
                        <option key={skill} value={`${skill}`}>
                          {skill[0].toUpperCase() + skill.slice(1)}
                        </option>
                      );
                    })}
                </SelectField>
              );
            }}
          </actionForm.Field>
        </div>
        <actionForm.Field name="actionType">
          {(field) => (
            <SelectField label="Action type" field={field}>
              <option defaultValue="" disabled></option>
              <option value="action">Action</option>
              <option value="extendedAction">Ex. action</option>
              <option value="reaction">Reaction</option>
            </SelectField>
          )}
        </actionForm.Field>
        <actionForm.Field name="actionSubtypes" mode="array">
          {(field) => {
            const actionSubtypes = ['attack', 'movement', 'upkeep', 'unique'];
            return (
              <div className="flex flex-col gap-4">
                {field.state.value.map((_, i) => {
                  return (
                    <div key={i} className="flex gap-2 sm:gap-4 lg:gap-6">
                      <actionForm.Field name={`actionSubtypes[${i}]`}>
                        {(subField) => {
                          return (
                            <SelectField
                              className="grow"
                              label="Action subtype"
                              field={subField}
                            >
                              <option defaultValue=""></option>
                              {actionSubtypes.map((subtype) => {
                                return (
                                  <option key={subtype} value={subtype}>
                                    {subtype[0].toUpperCase() +
                                      subtype.slice(1)}
                                  </option>
                                );
                              })}
                            </SelectField>
                          );
                        }}
                      </actionForm.Field>
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
                    onClick={() => field.pushValue('')}
                    type="button"
                  >
                    Add subtype
                  </button>
                </div>
              </div>
            );
          }}
        </actionForm.Field>
        <actionForm.Field
          name="description"
          validators={{
            onChange: ({ value }) =>
              value.length < 2
                ? 'Action description must be at least 2 characters long'
                : undefined,
          }}
        >
          {(field) => (
            <TextAreaField
              className="h-40 w-full"
              label="Action description"
              field={field}
            />
          )}
        </actionForm.Field>
        <BtnRect type="submit" className="w-full">
          Create
        </BtnRect>
      </form>
    </FormLayout>
  );
};

export default ActionForm;
