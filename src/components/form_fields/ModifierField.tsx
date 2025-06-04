import { FormApi } from '@tanstack/react-form';
import ArrowHeader2 from '../ArrowHeader2';
import Divider from '../Divider';
import InputField from '../InputField';
import InputSelectField from '../InputSelectField';
import { capitalCase } from 'change-case';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';

const ModifierField = ({ form }: { form: FormApi }) => {
  const stats = [
    'maxHealth',
    'maxSanity',
    'maxCyber',
    'maxEquip',
    'speed',
    'evasion',
    'armor',
    'ward',
    'permanentInjuries',
    'permanentInsanities',
    'uploadRange',
    'mindExpansionRange',
    'jumpBracket',
    'actions',
    'reactions',
    'chomebitsTn',
    'hardwiredTn',
    'motorizedTn',
    'networkedTn',
    'gestaltTn',
    'godheadTn',
    'mysticismTn',
    'outerworldTn',
    'barterTn',
    'rhetoricTn',
    'eruditionTn',
    'treatmentTn',
    'assaultTn',
    'shootingTn',
    'subterfugeTn',
    'thresholdTn',
  ];

  return (
    <>
      <ArrowHeader2 title="Stat Modifiers" />
      <form.Field name="modifiers">
        {(field) => {
          const modifiedStats = Object.entries(field.state.value) || [];
          return (
            <div className="flex w-full flex-col gap-4 lg:gap-8">
              <InputSelectField
                label="Add Stat Modifier"
                onChange={(value) =>
                  field.handleChange((prev) => ({ ...prev, [value]: null }))
                }
                options={stats}
              />
              {modifiedStats.length > 0 && (
                <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-8">
                  {modifiedStats.map(([stat, value]) => (
                    <form.Field key={stat} name={`modifiers[${stat}]`}>
                      {(subField) => {
                        return (
                          <div className="flex items-center gap-2">
                            <InputField
                              type="number"
                              label={capitalCase(stat)}
                              field={subField}
                            />
                            <button
                              onClick={() => {
                                const { [stat]: _, ...rest } =
                                  field.state.value;
                                field.handleChange(rest);
                              }}
                            >
                              <Icon
                                path={mdiClose}
                                className="text-tertiary hover:text-accent timing size-10"
                              />
                            </button>
                          </div>
                        );
                      }}
                    </form.Field>
                  ))}
                </div>
              )}
            </div>
          );
        }}
      </form.Field>
      <Divider />
    </>
  );
};

export default ModifierField;
