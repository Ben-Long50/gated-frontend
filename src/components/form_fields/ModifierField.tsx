import { FormApi } from '@tanstack/react-form';
import ArrowHeader2 from '../ArrowHeader2';
import Divider from '../Divider';
import { capitalCase } from 'change-case';
import { useContext, useState } from 'react';
import Modal from '../Modal';
import ThemeContainer from '../ThemeContainer';
import { ThemeContext } from 'src/contexts/ThemeContext';
import BtnRect from '../buttons/BtnRect';
import InputSelectField from '../InputSelectField';

const ModifierField = ({ form }: { form: FormApi }) => {
  const { accentPrimary } = useContext(ThemeContext);
  const [statModalOpen, setStatModalOpen] = useState(false);

  const toggleStatModalOpen = () => {
    setStatModalOpen(!statModalOpen);
  };

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
      <div className="flex w-full items-center justify-between gap-8">
        <ArrowHeader2 title="Stat Modifiers" />
        <BtnRect
          type="button"
          ariaLabel="Manage Modifiers"
          onClick={() => toggleStatModalOpen()}
        >
          Manage Modifiers
        </BtnRect>
      </div>
      <form.Field name="modifiers">
        {(field) => {
          const modifiedStats = Object.entries(field.state.value) || [];
          return (
            <div className="flex w-full flex-col gap-4 lg:gap-8">
              <Modal
                modalOpen={statModalOpen}
                toggleModal={toggleStatModalOpen}
              >
                <h1>Stat Modifiers</h1>
                <ThemeContainer
                  className="w-full"
                  chamfer="large"
                  borderColor={accentPrimary}
                >
                  <div className="flex w-full flex-col gap-4 p-8">
                    {stats.map((stat) => {
                      const checked = field.state.value[stat];
                      return (
                        <div
                          key={stat}
                          className="flex w-full items-center justify-between gap-4"
                        >
                          <h3>{capitalCase(stat)}</h3>
                          {checked && (
                            <form.Field key={stat} name={`modifiers[${stat}]`}>
                              {(subfield) => (
                                <InputSelectField
                                  className="ml-auto max-w-80"
                                  label={`${capitalCase(stat)} Value`}
                                  field={subfield}
                                  options={[
                                    1,
                                    2,
                                    3,
                                    4,
                                    5,
                                    'chromebits',
                                    'hardwired',
                                    'motorized',
                                    'networked',
                                    'gestalt',
                                    'outerworld',
                                    'mysticism',
                                    'godhead',
                                    'barter',
                                    'rhetoric',
                                    'erudition',
                                    'treatment',
                                    'assault',
                                    'shooting',
                                    'subterfuge',
                                    'threshold',
                                  ]}
                                />
                              )}
                            </form.Field>
                          )}
                          <input
                            type="checkbox"
                            checked={checked}
                            className="size-7 shrink-0"
                            onChange={() => {
                              if (checked) {
                                const { [stat]: _, ...rest } =
                                  field.state.value;
                                field.handleChange(rest);
                              } else {
                                field.handleChange((prev) => ({
                                  ...prev,
                                  [stat]: 1,
                                }));
                              }
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </ThemeContainer>
              </Modal>
              {modifiedStats.length > 0 && (
                <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
                  {modifiedStats.map(([stat, value]) => (
                    <ThemeContainer
                      key={stat}
                      className="mb-auto"
                      borderColor="transparent"
                      chamfer="small"
                    >
                      <div className="bg-secondary flex w-full items-center justify-between gap-8 p-4 clip-4">
                        <h4>{capitalCase(stat)}</h4>
                        <h4 className="text-accent">
                          {typeof value === 'number'
                            ? value
                            : capitalCase(value)}
                        </h4>
                      </div>
                    </ThemeContainer>
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
