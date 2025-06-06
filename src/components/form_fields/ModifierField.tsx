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
import BtnAuth from '../buttons/BtnAuth';
import InputField from '../InputField';
import BtnIcon from '../buttons/BtnIcon';
import { mdiSync } from '@mdi/js';

const ModifierField = ({ form }: { form: FormApi }) => {
  const { accentPrimary } = useContext(ThemeContext);
  const [statModalOpen, setStatModalOpen] = useState(false);
  const [tab, setTab] = useState<'character' | 'item'>('character');
  const [inputType, setInputType] = useState<'number' | 'skill'>('number');

  const toggleStatModalOpen = () => {
    setStatModalOpen(!statModalOpen);
  };

  const characterStats = [
    'maxHealth',
    'currentHealth',
    'maxSanity',
    'currentSanity',
    'maxCyber',
    'maxEquip',
    'maxHull',
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

  const itemStats = [
    'damage',
    'salvo',
    'flurry',
    'range',
    'magCapacity',
    'magCount',
    'armor',
    'ward',
    'block',
    'cyber',
    'power',
    'weight',
    'size',
    'speed',
    'agility',
    'hull',
    'cargo',
    'pass',
    'turret',
    'weapon',
    'wyrmMoldSlots',
    'wyrmMoldPoints',
    'esotericCharges',
  ];

  const stats = tab === 'character' ? characterStats : itemStats;

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
                  <div className="flex w-full flex-col p-8">
                    <div className="mb-8 grid w-full grid-cols-2 gap-4 sm:gap-8">
                      <BtnAuth
                        onClick={() => {
                          setTab('character');
                        }}
                        active={tab === 'character'}
                      >
                        Character Stats
                      </BtnAuth>
                      <BtnAuth
                        onClick={() => {
                          setTab('item');
                        }}
                        active={tab === 'item'}
                      >
                        Item Stats
                      </BtnAuth>
                    </div>
                    {stats.map((stat) => {
                      const checked = field.state.value[stat] !== undefined;
                      return (
                        <>
                          <div
                            key={stat}
                            className="flex w-full items-center justify-between gap-4"
                          >
                            <h3>{capitalCase(stat)}</h3>
                            {checked && (
                              <form.Field
                                key={stat}
                                name={`modifiers[${stat}]`}
                              >
                                {(subfield) =>
                                  inputType === 'number' ? (
                                    <div className="ml-auto flex items-center gap-4">
                                      <BtnIcon
                                        active={true}
                                        path={mdiSync}
                                        onClick={() => {
                                          setInputType('skill');
                                          subfield.handleChange('chromebits');
                                        }}
                                      />
                                      <InputField
                                        className="max-w-80"
                                        type="number"
                                        label={`${capitalCase(stat)} Value`}
                                        field={subfield}
                                      />
                                    </div>
                                  ) : (
                                    <div className="ml-auto flex items-center gap-4">
                                      <BtnIcon
                                        active={true}
                                        path={mdiSync}
                                        onClick={() => {
                                          setInputType('number');
                                          subfield.handleChange(1);
                                        }}
                                      />
                                      <InputSelectField
                                        className="max-w-80"
                                        label={`${capitalCase(stat)} Value`}
                                        field={subfield}
                                        options={[
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
                                    </div>
                                  )
                                }
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
                          <Divider />
                        </>
                      );
                    })}
                    <BtnRect
                      ariaLabel="Close"
                      type="button"
                      className="mt-4"
                      onClick={() => toggleStatModalOpen()}
                    >
                      Close
                    </BtnRect>
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
                        <h4
                          className={`${value > 0 || typeof value === 'string' ? 'text-accent' : 'text-error'}`}
                        >
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
