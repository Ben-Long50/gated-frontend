import Icon from '@mdi/react';
import TextAreaField from './TextAreaField';
import { mdiClose } from '@mdi/js';
import SelectField from './SelectField';
import InputField from './InputField';
import { useForm } from '@tanstack/react-form';
import useAttributeTree from '../hooks/useAttributeTree';
import ArrowHeader2 from './ArrowHeader2';

const SubactionForm = ({ form }: { form: ReturnType<typeof useForm<T>> }) => {
  const attributeTree = useAttributeTree();

  const durationUnits = [
    'second',
    'minute',
    'hour',
    'day',
    'week',
    'month',
    'year',
    'turn',
    'round',
    'scene',
    'session',
  ];

  return (
    <form.Field name="actions" mode="array">
      {(field) => (
        <>
          {field.state.value.length > 0 && (
            <ArrowHeader2 title="Unique Actions" />
          )}
          {field.state.value.map((_, i) => {
            return (
              <div className="flex flex-col gap-8" key={i}>
                <form.Field
                  name={`actions[${i}].name`}
                  validators={{
                    onChange: ({ value }) =>
                      value.length < 2
                        ? 'Action name must be at least 2 characters long'
                        : undefined,
                  }}
                >
                  {(field) => (
                    <InputField
                      className="grow"
                      label="Action name"
                      field={field}
                    />
                  )}
                </form.Field>
                <form.Field name={`actions[${i}].costs`} mode="array">
                  {(field) => {
                    return (
                      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:gap-8">
                        {field.state.value.map((_, j: number) => {
                          return (
                            <div
                              key={j}
                              className="flex gap-2 sm:gap-4 lg:gap-6"
                            >
                              <form.Field
                                name={`actions[${i}].costs[${j}].stat`}
                              >
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
                                      <option value="reactionPoints">
                                        Reaction points
                                      </option>
                                      <option value="power">Power</option>
                                      <option value="health">Health</option>
                                      <option value="sanity">Sanity</option>
                                      <option value="wyrmShells">
                                        Wyrm shells
                                      </option>
                                    </SelectField>
                                  );
                                }}
                              </form.Field>
                              <form.Field
                                key={j}
                                name={`actions[${i}].costs[${j}].value`}
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
                              </form.Field>
                              <button
                                className="sm:-ml-2 lg:-ml-4"
                                onClick={() => field.removeValue(j)}
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
                                stat: '',
                                value: 1,
                              })
                            }
                            type="button"
                          >
                            Add cost
                          </button>
                        </div>
                      </div>
                    );
                  }}
                </form.Field>
                <form.Field name={`actions[${i}].roll`} mode="array">
                  {(field) => {
                    return (
                      <div className="flex w-full flex-col gap-4 sm:gap-6 lg:gap-8">
                        {field.state.value?.map((_, j: number) => (
                          <div
                            key={j}
                            className="flex w-full gap-4 sm:gap-6 lg:gap-8"
                          >
                            <div className="flex w-full flex-col gap-4 sm:flex-row sm:gap-6 lg:gap-8">
                              <form.Field
                                name={`actions[${i}].roll[${j}].attribute`}
                                listeners={{
                                  onChange: () => {
                                    form.setFieldValue(
                                      `actions[${i}].roll[${j}].skill`,
                                      '',
                                    );
                                  },
                                }}
                              >
                                {(field) => (
                                  <SelectField
                                    className="w-full"
                                    label="Attribute"
                                    field={field}
                                  >
                                    <option defaultValue=""></option>
                                    {Object.entries(attributeTree.tree).map(
                                      ([attribute, _]) => {
                                        return (
                                          <option
                                            key={attribute}
                                            value={`${attribute}`}
                                          >
                                            {attribute[0].toUpperCase() +
                                              attribute.slice(1)}
                                          </option>
                                        );
                                      },
                                    )}
                                  </SelectField>
                                )}
                              </form.Field>
                              <form.Field
                                name={`actions[${i}].roll[${j}].skill`}
                              >
                                {(field) => {
                                  return (
                                    <SelectField
                                      className="w-full"
                                      label="Skill"
                                      field={field}
                                    >
                                      <option defaultValue=""></option>
                                      {form.state.values.actions[i].roll[j]
                                        .attribute &&
                                        Object.entries(
                                          attributeTree.tree[
                                            form.state.values.actions[i].roll[j]
                                              .attribute
                                          ].skills,
                                        ).map(([skill, _]) => {
                                          return (
                                            <option
                                              key={skill}
                                              value={`${skill}`}
                                            >
                                              {skill[0].toUpperCase() +
                                                skill.slice(1)}
                                            </option>
                                          );
                                        })}
                                    </SelectField>
                                  );
                                }}
                              </form.Field>
                            </div>
                            <button
                              className="sm:-ml-2 lg:-ml-4"
                              onClick={() => field.removeValue(j)}
                              type="button"
                            >
                              <Icon
                                className="text-tertiary"
                                path={mdiClose}
                                size={1}
                              />
                            </button>
                          </div>
                        ))}
                        <div className="my-auto flex items-center justify-end gap-4 self-end sm:col-start-2 lg:gap-8">
                          <button
                            className="text-accent self-end hover:underline"
                            onClick={() =>
                              field.pushValue({
                                attribute: '',
                                skill: '',
                              })
                            }
                            type="button"
                          >
                            Add roll
                          </button>
                        </div>
                      </div>
                    );
                  }}
                </form.Field>
                <form.Field name={`actions[${i}].actionType`}>
                  {(field) => (
                    <SelectField label="Action type" field={field}>
                      <option defaultValue="" disabled></option>
                      <option value="action">Action</option>
                      <option value="extendedAction">Ex. action</option>
                      <option value="reaction">Reaction</option>
                    </SelectField>
                  )}
                </form.Field>
                <form.Field name={`actions[${i}].actionSubtypes`} mode="array">
                  {(field) => {
                    const actionSubtypes = [
                      'attack',
                      'movement',
                      'upkeep',
                      'unique',
                    ];
                    return (
                      <div className="flex flex-col gap-4">
                        {field.state.value.map((_, j) => {
                          return (
                            <div
                              key={j}
                              className="flex gap-2 sm:gap-4 lg:gap-6"
                            >
                              <form.Field
                                name={`actions[${i}].actionSubtypes[${j}]`}
                              >
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
                              </form.Field>
                              <button
                                className="sm:-ml-2 lg:-ml-4"
                                onClick={() => field.removeValue(j)}
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
                </form.Field>
                <div className="flex w-full items-center gap-4 lg:gap-8">
                  <form.Field name={`actions[${i}].duration.unit`}>
                    {(field) => (
                      <SelectField
                        className="w-full"
                        label="Effect duration"
                        field={field}
                      >
                        <option value=""></option>
                        {durationUnits.map((unit) => (
                          <option key={unit} value={unit}>
                            {unit[0].toUpperCase() + unit.slice(1)}
                          </option>
                        ))}
                      </SelectField>
                    )}
                  </form.Field>
                  <form.Field
                    name={`actions[${i}].duration.value`}
                    validators={{
                      onChange: ({ value }) =>
                        value && value <= 0 ? 'Minimum value is 1' : undefined,
                    }}
                  >
                    {(field) => (
                      <InputField
                        className="w-full max-w-28"
                        type="number"
                        label="Dur. value"
                        field={field}
                      />
                    )}
                  </form.Field>
                </div>
                <form.Field
                  name={`actions[${i}].description`}
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
                </form.Field>
              </div>
            );
          })}
          <div className="flex w-full flex-row-reverse items-center justify-between">
            <button
              className="text-accent hover:underline"
              onClick={(e) => {
                e.preventDefault();
                field.pushValue({
                  name: '',
                  costs: [{ stat: 'actionPoints', value: 1 }] as {
                    stat: string;
                    value: number;
                  }[],
                  roll: [] as {
                    attribute: string;
                    skill: string;
                  }[],
                  // duration: { units: '', value: null } as {
                  //   units: string;
                  //   value: number | null;
                  // },
                  actionType: '',
                  actionSubtypes: ['unique'] as string[],
                  description: '',
                });
              }}
            >
              Add unique action
            </button>
            {form.state.values.actions.length > 0 && (
              <button
                className="text-accent hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  field.removeValue(form.state.values.actions.length - 1);
                }}
              >
                Remove unique action
              </button>
            )}
          </div>
        </>
      )}
    </form.Field>
  );
};

export default SubactionForm;
