import { ModifierOperator, ModifierType } from 'src/types/modifier';
import SelectField from './SelectField';
import InputField from './InputField';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import useActions from '../hooks/useActions';
import usePerks from '../hooks/usePerks';

const ModifierField = ({ form }) => {
  const types: ModifierType[] = ['roll', 'stat'];

  const { filteredActions } = useActions();

  const perks = usePerks();

  const operators: ModifierOperator[] = [
    'add',
    'subtract',
    'multiply',
    'divide',
  ];

  const stats = {
    health: 'Health',
    maxHealth: 'Max health',
    sanity: 'Sanity',
    maxSanity: 'Max sanity',
    cyber: 'Cyber',
    maxCyber: 'Max cyber',
    weight: 'Equip',
    maxWeight: 'Max Equip',
    speed: 'Speed',
    evasion: 'Evasion',
    armor: 'Armor',
    ward: 'Ward',
    permanentInjuries: 'Permanent injury',
    permanentInsanities: 'Permanent insanity',
  };

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
    <form.Field name="modifiers" mode="array">
      {(field) => (
        <div className="flex w-full flex-col gap-4 lg:gap-8">
          {field.state.value.map((_, i: number) => {
            return (
              <div key={i} className="flex w-full items-center gap-4 lg:gap-8">
                <div className="flex w-full flex-col gap-4 lg:gap-8">
                  <div className="grid w-full grid-cols-3 gap-4 lg:gap-8">
                    <form.Field name={`modifiers[${i}].type`}>
                      {(subField) => {
                        return (
                          <SelectField
                            className="grow"
                            label="Modifier Type"
                            field={subField}
                          >
                            <option value=""></option>
                            {types.map((type) => {
                              return (
                                <option key={type} value={type}>
                                  {type[0].toUpperCase() + type.slice(1)}
                                </option>
                              );
                            })}
                          </SelectField>
                        );
                      }}
                    </form.Field>
                    <form.Subscribe
                      selector={(state) => state.values.modifiers[i].type}
                    >
                      {(modifierType: string) => (
                        <>
                          {modifierType === 'roll' && (
                            <>
                              <form.Field name={`modifiers[${i}].actionId`}>
                                {(subField) => {
                                  return (
                                    <SelectField
                                      className="grow"
                                      label="Action"
                                      field={subField}
                                    >
                                      <option defaultValue=""></option>
                                      {filteredActions.map((action) => (
                                        <option
                                          key={action.id}
                                          value={action.id}
                                        >
                                          {action.name}
                                        </option>
                                      ))}
                                    </SelectField>
                                  );
                                }}
                              </form.Field>
                              <form.Field name={`modifiers[${i}].operator`}>
                                {(subField) => {
                                  return (
                                    <SelectField
                                      className="grow"
                                      label="Operator"
                                      field={subField}
                                    >
                                      <option defaultValue=""></option>
                                      {Object.values(operators).map((item) => {
                                        return (
                                          <option key={item} value={item}>
                                            {item}
                                          </option>
                                        );
                                      })}
                                    </SelectField>
                                  );
                                }}
                              </form.Field>
                            </>
                          )}
                          {modifierType === 'stat' && (
                            <>
                              <form.Field name={`modifiers[${i}].stat`}>
                                {(subField) => {
                                  return (
                                    <SelectField
                                      className="grow"
                                      label="Stat"
                                      field={subField}
                                    >
                                      <option defaultValue=""></option>
                                      {Object.entries(stats).map(
                                        ([key, value]) => {
                                          return (
                                            <option key={key} value={key}>
                                              {value}
                                            </option>
                                          );
                                        },
                                      )}
                                    </SelectField>
                                  );
                                }}
                              </form.Field>
                              <form.Field name={`modifiers[${i}].operator`}>
                                {(subField) => {
                                  return (
                                    <SelectField
                                      className="grow"
                                      label="Operator"
                                      field={subField}
                                    >
                                      <option defaultValue=""></option>
                                      {Object.values(operators).map((item) => {
                                        return (
                                          <option key={item} value={item}>
                                            {item}
                                          </option>
                                        );
                                      })}
                                    </SelectField>
                                  );
                                }}
                              </form.Field>
                            </>
                          )}
                        </>
                      )}
                    </form.Subscribe>
                    <form.Field
                      name={`modifiers[${i}.valueType]`}
                      listeners={{
                        onChange: () => {
                          form.setFieldValue(`modifiers[${i}.attribute]`, null);
                          form.setFieldValue(`modifiers[${i}.skill]`, null);
                          form.setFieldValue(`modifiers[${i}.value]`, null);
                        },
                      }}
                    >
                      {(subField) => (
                        <SelectField
                          className="grow"
                          label="Value Type"
                          field={subField}
                        >
                          <option defaultValue=""></option>
                          <option value="number">Number</option>
                          <option value="attribute">Attribute Points</option>
                          <option value="skill">Skill Points</option>
                        </SelectField>
                      )}
                    </form.Field>
                    <form.Subscribe
                      selector={(state) => state.values.modifiers[i].valueType}
                    >
                      {(valueType) => (
                        <>
                          {(valueType === 'attribute' ||
                            valueType === 'skill') && (
                            <form.Field name={`modifiers[${i}.attribute]`}>
                              {(field) => (
                                <SelectField
                                  label="Attribute"
                                  field={field}
                                  onChange={() => {
                                    perks.filterByAttribute(field.state.value);
                                    perks.filterBySkill('');
                                  }}
                                >
                                  <option value=""></option>
                                  <option value="cybernetica">
                                    Cybernetica
                                  </option>
                                  <option value="esoterica">Esoterica</option>
                                  <option value="peace">Peace</option>
                                  <option value="violence">Violence</option>
                                </SelectField>
                              )}
                            </form.Field>
                          )}

                          {valueType === 'skill' && (
                            <form.Subscribe
                              selector={(state) =>
                                state.values.modifiers[i].attribute
                              }
                            >
                              {(selectedAttribute) => (
                                <form.Field name={`modifiers[${i}.skill]`}>
                                  {(field) => (
                                    <SelectField
                                      label="Skill"
                                      field={field}
                                      onChange={() => {
                                        perks.filterBySkill(field.state.value);
                                      }}
                                    >
                                      <option value=""></option>
                                      {Object.entries(perks.emptyTree).map(
                                        ([attribute, skills]) =>
                                          attribute === selectedAttribute
                                            ? Object.entries(skills).map(
                                                ([skill]) => (
                                                  <option
                                                    key={skill}
                                                    value={skill}
                                                  >
                                                    {skill[0].toUpperCase() +
                                                      skill.slice(1)}
                                                  </option>
                                                ),
                                              )
                                            : null,
                                      )}
                                    </SelectField>
                                  )}
                                </form.Field>
                              )}
                            </form.Subscribe>
                          )}
                          {valueType === 'number' && (
                            <form.Field name={`modifiers[${i}].value`}>
                              {(subField) => (
                                <InputField
                                  className="max-w-28"
                                  type="number"
                                  label="Value"
                                  field={subField}
                                />
                              )}
                            </form.Field>
                          )}
                        </>
                      )}
                    </form.Subscribe>
                  </div>
                  <div className="flex w-full items-center gap-4 lg:gap-8">
                    <form.Field name={`modifiers[${i}].duration.unit`}>
                      {(field) => (
                        <SelectField
                          className="w-full"
                          label="Modifier duration"
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
                      name={`modifiers[${i}].duration.value`}
                      validators={{
                        onChange: ({ value }) =>
                          value && value <= 0
                            ? 'Minimum value is 1'
                            : undefined,
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
                </div>
                <button
                  className="sm:-ml-2 lg:-ml-4"
                  onClick={() => field.removeValue(i)}
                  type="button"
                >
                  <Icon className="text-tertiary" path={mdiClose} size={1} />
                </button>
              </div>
            );
          })}
          <div className="my-auto flex items-center justify-end gap-4 self-end sm:col-start-2 lg:gap-8">
            <button
              className="text-accent self-end hover:underline"
              onClick={() => field.pushValue({ type: '' })}
              type="button"
            >
              Add modifier
            </button>
          </div>
        </div>
      )}
    </form.Field>
  );
};

export default ModifierField;
