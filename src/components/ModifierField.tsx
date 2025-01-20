import { ModifierOperator, ModifierType, Stat } from 'src/types/modifier';
import SelectField from './SelectField';
import InputField from './InputField';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';

const ModifierField = ({ form, field, actions }) => {
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

  return (
    <div className="flex w-full flex-col gap-4 lg:gap-8">
      {field.state.value.map((_, i: number) => {
        return (
          <div key={i} className="flex flex-col gap-4 sm:flex-row lg:gap-6">
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
                          {type}
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
                  {modifierType === 'Roll' && (
                    <>
                      <form.Field name={`modifiers[${i}].action`}>
                        {(subField) => {
                          return (
                            <SelectField
                              className="grow"
                              label="Action"
                              field={subField}
                            >
                              <option defaultValue=""></option>
                              {Object.values(actions).flatMap((item) => {
                                return item.list.map((action) => (
                                  <option key={action.id} value={action.id}>
                                    {action.name}
                                  </option>
                                ));
                              })}
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
                      <form.Field name={`modifiers[${i}].dice`}>
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
                      </form.Field>
                    </>
                  )}
                  {modifierType === 'Stat' && (
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
                      <form.Field name={`modifiers[${i}].value`}>
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
                    </>
                  )}
                </>
              )}
            </form.Subscribe>
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
  );
};

export default ModifierField;
