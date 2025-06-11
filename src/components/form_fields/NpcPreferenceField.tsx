import { FormApi } from '@tanstack/react-form';
import ThemeContainer from '../ThemeContainer';
import Modal from '../Modal';
import BtnRect from '../buttons/BtnRect';
import { useContext, useState } from 'react';
import { ThemeContext } from 'src/contexts/ThemeContext';
import Divider from '../Divider';
import ArrowHeader4 from '../ArrowHeader4';
import { capitalCase } from 'change-case';
import InputSelectField from '../InputSelectField';

const NpcPreferenceField = ({ form }: { form: FormApi }) => {
  const { accentPrimary } = useContext(ThemeContext);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  const togglePreferences = () => {
    setPreferencesOpen((prev) => !prev);
  };

  return (
    <form.Subscribe selector={(state) => state.values.playerCharacter}>
      {(playerCharacter) =>
        playerCharacter === false && (
          <>
            <form.Field name="npcTypes" mode="array">
              {(field) =>
                field.state.value &&
                field.state.value.map((_, i) => (
                  <form.Field key={i} name={`npcTypes[${i}]`}>
                    {(subField) => (
                      <InputSelectField
                        field={subField}
                        label="Npc Type"
                        options={['shop']}
                      />
                    )}
                  </form.Field>
                ))
              }
            </form.Field>
            <BtnRect
              type="button"
              ariaLabel="NPC preferences"
              onClick={togglePreferences}
            >
              NPC Preferences
            </BtnRect>
            <Modal modalOpen={preferencesOpen} toggleModal={togglePreferences}>
              <ThemeContainer
                className="h-80dvh w-full max-w-3xl"
                chamfer="large"
                borderColor={accentPrimary}
                overflowHidden={true}
              >
                <div className="grid h-full grid-rows-[1fr_auto] p-4 sm:p-8">
                  <div
                    className="scrollbar-primary-2 relative flex w-full flex-col items-center gap-8 overflow-y-auto"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <h1>NPC Preferences</h1>
                    <p className="text-tertiary border-l-2 border-gray-400 border-opacity-50 pl-4">
                      Set your visibility preferences for this NPC. These
                      options will determine how much of this NPC's information
                      is viewable by players when interacting with them. If a
                      box is checked, that means players can see that
                      information.
                    </p>
                    <Divider />
                    <div className="flex w-full justify-between">
                      <button
                        className="text-accent text-base hover:underline"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          form.setFieldValue('preferences', () => {
                            const currentValues =
                              form.getFieldValue('preferences');
                            return Object.fromEntries(
                              Object.entries(currentValues).map(
                                ([key, value]) => [key, true],
                              ),
                            );
                          });
                        }}
                      >
                        Check All
                      </button>
                      <button
                        className="text-accent text-base hover:underline"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          form.setFieldValue('preferences', () => {
                            const currentValues =
                              form.getFieldValue('preferences');
                            return Object.fromEntries(
                              Object.entries(currentValues).map(
                                ([key, value]) => [key, false],
                              ),
                            );
                          });
                        }}
                      >
                        Uncheck All
                      </button>
                    </div>
                    <div className="flex w-full flex-col gap-4 px-2">
                      <form.Subscribe
                        selector={(state) => state.values.preferences}
                      >
                        {(preferences) =>
                          Object.keys(preferences).map((key) => (
                            <form.Field key={key} name={`preferences.${key}`}>
                              {(field) => (
                                <label
                                  className="flex w-full items-center justify-between"
                                  htmlFor={key}
                                >
                                  <ArrowHeader4
                                    className={`${field.state.value ? 'text-accent' : 'text-secondary'}`}
                                    title={capitalCase(key)}
                                  />
                                  <input
                                    id={key}
                                    className="size-6"
                                    name={key}
                                    type="checkbox"
                                    checked={field.state.value}
                                    onChange={() => {
                                      field.handleChange(!field.state.value);
                                    }}
                                  />
                                </label>
                              )}
                            </form.Field>
                          ))
                        }
                      </form.Subscribe>
                    </div>
                  </div>
                  <div className="pt-4">
                    <BtnRect
                      type="button"
                      ariaLabel="Confirm preferences"
                      className="w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        togglePreferences();
                      }}
                    >
                      Done
                    </BtnRect>
                  </div>
                </div>
              </ThemeContainer>
            </Modal>
          </>
        )
      }
    </form.Subscribe>
  );
};

export default NpcPreferenceField;
