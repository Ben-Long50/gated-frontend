import ArrowHeader2 from '../ArrowHeader2';
import Divider from '../Divider';
import InputField from '../InputField';
import InputSelectField from '../InputSelectField';
import { capitalCase } from 'change-case';

const ModifierField = ({ form }: { form: FormApi }) => {
  const stats = [
    'health',
    'maxHealth',
    'sanity',
    'maxSanity',
    'cyber',
    'maxCyber',
    'weight',
    'maxWeight',
    'speed',
    'evasion',
    'armor',
    'ward',
    'permanentInjuries',
    'permanentInsanities',
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
                          <InputField
                            type="number"
                            label={capitalCase(stat)}
                            field={subField}
                          />
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
