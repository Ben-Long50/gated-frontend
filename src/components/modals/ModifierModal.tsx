import { useContext, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import useModalStore from 'src/stores/modalStore';
import Modal from './Modal';
import BtnAuth from '../buttons/BtnAuth';
import { capitalCase } from 'change-case';
import BtnIcon from '../buttons/BtnIcon';
import InputField from '../InputField';
import { mdiSync } from '@mdi/js';
import InputSelectField from '../InputSelectField';
import Divider from '../Divider';
import BtnRect from '../buttons/BtnRect';
import ThemeContainer from '../ThemeContainer';
import { ThemeContext } from 'src/contexts/ThemeContext';
import ArrowHeader2 from '../ArrowHeader2';

const ModifierModal = () => {
  const { accentPrimary } = useContext(ThemeContext);
  const [tab, setTab] = useState<'character' | 'item'>('character');
  const [inputType, setInputType] = useState<'number' | 'skill'>('number');
  const navigate = useNavigate();

  const backgroundPath = useModalStore((state) => state.backgroundPath);

  const { form, field } = useOutletContext() || {};

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
    <Modal>
      <h1>Stat Modifiers</h1>
      <div className="flex w-full flex-col">
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
        <ThemeContainer
          className="w-full"
          borderColor={accentPrimary}
          chamfer="medium"
        >
          <div className="flex w-full flex-col gap-8 p-4 sm:p-8">
            <ArrowHeader2 title={capitalCase(tab) + ' Stats'} />
            <div>
              {stats.map((stat, index) => {
                const checked = field.state.value[stat] !== undefined;
                return (
                  <>
                    <div
                      key={stat}
                      className="flex w-full items-center justify-between gap-4"
                    >
                      <h3>{capitalCase(stat)}</h3>
                      {checked && (
                        <form.Field key={stat} name={`modifiers[${stat}]`}>
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
                            const { [stat]: _, ...rest } = field.state.value;
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
                    {index < stats.length - 1 && <Divider />}
                  </>
                );
              })}
            </div>
          </div>
        </ThemeContainer>
        <BtnRect
          ariaLabel="Close"
          type="button"
          className="mt-4"
          onClick={() => navigate(backgroundPath)}
        >
          Close
        </BtnRect>
      </div>
    </Modal>
  );
};

export default ModifierModal;
