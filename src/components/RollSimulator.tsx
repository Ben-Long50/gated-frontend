import { useForm } from '@tanstack/react-form';
import { Action } from 'src/types/action';
import useActions from '../hooks/useActions';
import ArrowHeader3 from './ArrowHeader3';
import SelectField from './SelectField';
import ThemeContainer from './ThemeContainer';
import { useContext, useState } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import InputFieldRadio from './InputFieldRadio';
import ArrowHeader4 from './ArrowHeader4';
import Divider from './Divider';
import useActiveCharacterQuery from '../hooks/useActiveCharacterQuery/useActiveCharacterQuery';
import { AuthContext } from '../contexts/AuthContext';
import useAttributeTree from '../hooks/useAttributeTree';
import Loading from './Loading';
import BtnRect from './buttons/BtnRect';
import DieIcon from './icons/DieIcon';
import Icon from '@mdi/react';
import { mdiArrowDown, mdiTriangleDown } from '@mdi/js';
import InputFieldCheckbox from './InputFieldCheckbox';
import Die3Icon from './icons/Die3Icon';
import Die2Icon from './icons/Die2Icon';
import Die6Icon from './icons/Die6Icon';
import InputField from './InputField';
import CharacterPicture from './CharacterPicture';
import ArrowHeader2 from './ArrowHeader2';
import AccountPicture from './AccountPicture';
import ArrowHeader1 from './ArrowHeader1';
import Die1Icon from './icons/Die1Icon';
import Die5Icon from './icons/Die5Icon';
import Die4Icon from './icons/Die4Icon';

const RollSimulator = ({
  modalOpen,
  toggleModal,
}: {
  modalOpen?: boolean;
  toggleModal?: () => void;
}) => {
  const { apiUrl } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);
  const {
    data: character,
    isLoading,
    isPending,
  } = useActiveCharacterQuery(apiUrl);
  const [dieArray, setDieArray] = useState<number[]>([]);
  const [rolling, setRolling] = useState(false);

  const { filteredActions: actions } = useActions();
  const { tree, getPoints } = useAttributeTree(character?.attributes);

  const [selectedAction, setSelectedAction] = useState<Action | null>(null);

  const rollDice = (diceCount: number) => {
    let count = 0;
    const maxRolls = 12;

    setRolling(true);

    const interval = setInterval(() => {
      const dieArray = Array.from(
        { length: diceCount },
        () => Math.floor(Math.random() * 6) + 1,
      );
      setDieArray(dieArray);

      count++;
      if (count >= maxRolls) {
        clearInterval(interval);
        setRolling(false);
      }
    }, 50);
  };

  const rollForm = useForm({
    defaultValues: {
      action: '',
      attribute: '',
      skill: '',
      modifiers: [] as string[],
      diceCount: null,
    },
    onSubmit: ({ value }) => {
      rollDice(
        value.diceCount +
          getPoints(value.attribute) +
          getPoints(value.attribute, value.skill),
      );
    },
  });

  const rolls = selectedAction?.roll ? selectedAction?.roll : [];

  if (isLoading || isPending) return <Loading />;

  return (
    <ThemeContainer
      className="w-full max-w-5xl"
      borderColor={accentPrimary}
      chamfer="medium"
    >
      <div className="bg-primary grid w-full grid-cols-2 gap-8 p-4 clip-6">
        <div className="flex flex-col">
          <div className="col-span-3 flex w-full justify-start gap-8 justify-self-start">
            <img
              className="z-10 size-20 shrink-0 rounded-full shadow shadow-zinc-950"
              src={character.picture.imageUrl}
              alt={
                character.firstName +
                ' ' +
                character.lastName +
                "'s profile picture"
              }
            />
            <ArrowHeader1
              title={character.firstName + ' ' + character.lastName}
            />
          </div>
          <Divider />
          <div className="grid grid-cols-3 place-items-start">
            {dieArray.map((number) => {
              switch (number) {
                case 1:
                  return <Die1Icon className="text-primary" />;
                  break;
                case 2:
                  return <Die2Icon className="text-primary" />;
                  break;
                case 3:
                  return <Die3Icon className="text-primary" />;
                  break;
                case 4:
                  return <Die4Icon className="text-primary" />;
                  break;
                case 5:
                  return <Die5Icon className="text-primary" />;
                  break;
                case 6:
                  return <Die6Icon className="text-primary" />;
                  break;
                default:
                  return;
                  break;
              }
            })}
            {/* <rollForm.Subscribe
              selector={(state) => [
                state.values.attribute,
                state.values.skill,
                state.values.diceCount,
              ]}
            >
              {([attribute, skill, dice]) =>
                Array.from({
                  length: skill
                    ? getPoints(attribute) + getPoints(attribute, skill) + dice
                    : getPoints(attribute) + dice,
                }).map((_, i) => (
                  <Die2Icon className="text-primary shrink-0" key={i} />
                ))
              }
            </rollForm.Subscribe> */}
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            rollForm.handleSubmit();
          }}
          className="mb-auto flex flex-col items-start justify-start gap-8"
        >
          <ArrowHeader3 title="Roll Options" />
          <rollForm.Field
            name="action"
            listeners={{
              onChange: () => {
                rollForm.setFieldValue('attribute', '');
                rollForm.setFieldValue('skill', '');
              },
            }}
          >
            {(field) => (
              <SelectField
                label="Action"
                className="w-full"
                field={field}
                onChange={() => {
                  setSelectedAction(
                    actions.find((action) => field.state.value === action.name),
                  );
                }}
              >
                <option defaultValue=""></option>
                {actions.map((action) => (
                  <option key={action.id} value={action.name}>
                    {action.name}
                  </option>
                ))}
              </SelectField>
            )}
          </rollForm.Field>

          <ThemeContainer
            className="w-full"
            borderColor={accentPrimary}
            chamfer="small"
          >
            <p className="!text-accent bg-primary absolute -top-2 left-3.5 z-20 px-1.5 text-base">
              Attribute
            </p>
            <div className="bg-primary relative flex w-full flex-col gap-4 p-4 pt-6 clip-4">
              <rollForm.Field name="attribute">
                {(field) => (
                  <>
                    {rolls.length > 0 &&
                      rolls.map((roll, i) => (
                        <div key={i} className="flex items-center gap-4">
                          <InputFieldRadio
                            className="w-full"
                            field={field}
                            label={
                              roll.attribute[0].toUpperCase() +
                              roll.attribute.slice(1)
                            }
                            value={roll.attribute}
                            checked={roll.attribute === field.state.value}
                          ></InputFieldRadio>
                          <p className="!text-tertiary whitespace-nowrap text-base">
                            ({getPoints(roll.attribute) + ' dice'})
                          </p>
                        </div>
                      ))}
                    <div className="flex w-full flex-col gap-4">
                      <div className="flex items-center gap-4">
                        <InputFieldRadio
                          className="w-full"
                          field={field}
                          label="Custom"
                          value="custom"
                          checked={'custom' === field.state.value}
                        ></InputFieldRadio>
                      </div>
                      {field.state.value === 'custom' && (
                        <SelectField label="Attribute" field={field}>
                          <option value="cybernetica">Cybernetica</option>
                        </SelectField>
                      )}
                    </div>
                  </>
                )}
              </rollForm.Field>
            </div>
          </ThemeContainer>
          {
            <ThemeContainer
              className="w-full"
              borderColor={accentPrimary}
              chamfer="small"
            >
              <p className="!text-accent bg-primary absolute -top-2 left-3.5 z-20 px-1.5 text-base">
                Skill
              </p>
              <div className="bg-primary relative flex w-full flex-col gap-4 p-4 pt-6 clip-4">
                <rollForm.Field name="skill">
                  {(field) => (
                    <>
                      {rolls.length > 0 &&
                        rolls.map((roll, i) => (
                          <div key={i} className="flex items-center gap-4">
                            <InputFieldRadio
                              className="w-full"
                              field={field}
                              label={
                                roll.skill[0].toUpperCase() +
                                roll.skill.slice(1)
                              }
                              value={roll.skill}
                              checked={roll.skill === field.state.value}
                            ></InputFieldRadio>
                            <p className="!text-tertiary whitespace-nowrap text-base">
                              ({getPoints(roll.attribute, roll.skill) + ' dice'}
                              )
                            </p>
                          </div>
                        ))}
                      <div className="flex w-full flex-col gap-4">
                        <div className="flex items-center gap-4">
                          <InputFieldRadio
                            className="w-full"
                            field={field}
                            label="Custom"
                            value="custom"
                            checked={'custom' === field.state.value}
                          ></InputFieldRadio>
                        </div>
                        {field.state.value === 'custom' && (
                          <SelectField label="Skill" field={field}>
                            <option
                              className="flex w-full justify-between"
                              value="cybernetica"
                            >
                              Chromebits
                              <p className="!text-tertiary !text-base">
                                (
                                {getPoints('cybernetica', 'chromebits') +
                                  ' dice'}
                                )
                              </p>
                            </option>
                          </SelectField>
                        )}
                      </div>
                    </>
                  )}
                </rollForm.Field>
              </div>
            </ThemeContainer>
          }
          <ThemeContainer
            className="w-full"
            borderColor={accentPrimary}
            chamfer="small"
          >
            <p className="!text-accent bg-primary absolute -top-2 left-3.5 z-20 px-1.5 text-base">
              Modifiers
            </p>
            <div className="bg-primary relative flex w-full flex-col gap-4 p-4 pt-6 clip-4">
              <rollForm.Field name="modifiers">
                {(field) => (
                  <>
                    <InputFieldCheckbox
                      checked={(e) =>
                        field.state.value.includes(e.target.value)
                      }
                      field={field}
                      label="Push-it"
                      value="push"
                    />
                    <InputFieldCheckbox
                      checked={(e) =>
                        field.state.value.includes(e.target.value)
                      }
                      field={field}
                      label="Booming"
                      value="booming"
                    />
                    <InputFieldCheckbox
                      checked={(e) =>
                        field.state.value.includes(e.target.value)
                      }
                      field={field}
                      label="Dooming"
                      value="dooming"
                    />
                    <InputFieldCheckbox
                      checked={(e) =>
                        field.state.value.includes(e.target.value)
                      }
                      field={field}
                      label="Lucky"
                      value="lucky"
                    />
                    <InputFieldCheckbox
                      checked={(e) =>
                        field.state.value.includes(e.target.value)
                      }
                      field={field}
                      label="Unlucky"
                      value="unlucky"
                    />
                  </>
                )}
              </rollForm.Field>
            </div>
          </ThemeContainer>
          <rollForm.Field name="diceCount">
            {(field) => (
              <InputField
                className="w-full"
                field={field}
                type="number"
                label="Extra Dice"
              />
            )}
          </rollForm.Field>
          <div className="flex w-full items-center justify-between gap-12">
            <div className="flex items-center gap-4">
              <rollForm.Subscribe
                selector={(state) => [
                  state.values.attribute,
                  state.values.skill,
                  state.values.diceCount,
                ]}
              >
                {([attribute, skill, dice]) => (
                  <>
                    <DieIcon className="size-10" />
                    <Icon
                      className="text-primary"
                      path={mdiTriangleDown}
                      size={0.375}
                      rotate={-90}
                    />
                    <h2 className="pt-1">
                      {skill
                        ? getPoints(attribute) +
                          getPoints(attribute, skill) +
                          dice
                        : getPoints(attribute) + dice}
                    </h2>
                  </>
                )}
              </rollForm.Subscribe>
            </div>
            <BtnRect
              ariaLabel="Roll dice"
              type="submit"
              className="w-full min-w-28 self-end"
            >
              Roll
            </BtnRect>
          </div>
        </form>
      </div>
    </ThemeContainer>
  );
};

export default RollSimulator;
