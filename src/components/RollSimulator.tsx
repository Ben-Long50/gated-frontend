import { useForm } from '@tanstack/react-form';
import { Action } from 'src/types/action';
import useActions from '../hooks/useActions';
import ArrowHeader3 from './ArrowHeader3';
import SelectField from './SelectField';
import ThemeContainer from './ThemeContainer';
import { useContext, useEffect, useMemo, useState } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import InputFieldRadio from './InputFieldRadio';
import Divider from './Divider';
import useActiveCharacterQuery from '../hooks/useActiveCharacterQuery/useActiveCharacterQuery';
import { AuthContext } from '../contexts/AuthContext';
import useAttributeTree from '../hooks/useAttributeTree';
import Loading from './Loading';
import BtnRect from './buttons/BtnRect';
import DieIcon from './icons/DieIcon';
import Icon from '@mdi/react';
import {
  mdiCheckCircleOutline,
  mdiCloseOutline,
  mdiTriangleDown,
} from '@mdi/js';
import InputFieldCheckbox from './InputFieldCheckbox';
import Die3Icon from './icons/Die3Icon';
import Die2Icon from './icons/Die2Icon';
import Die6Icon from './icons/Die6Icon';
import InputField from './InputField';
import ArrowHeader1 from './ArrowHeader1';
import Die1Icon from './icons/Die1Icon';
import Die5Icon from './icons/Die5Icon';
import Die4Icon from './icons/Die4Icon';
import useRoll from '../hooks/useRoll';
import { AttributeName, SkillName } from 'src/types/attributeTree';

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

  const { filteredActions: actions } = useActions();
  const { emptyAttributeTree, getPoints } = useAttributeTree(
    character?.attributes,
  );
  const { diceArray, rolling, calculateSuccesses, successes } = useRoll();

  const [selectedAction, setSelectedAction] = useState<Action | null>(null);

  const rollForm = useForm({
    defaultValues: {
      action: '',
      attribute: '' as AttributeName,
      skill: '' as SkillName,
      modifiers: [] as string[],
      diceCount: null as number | null,
    },
    onSubmit: ({ value }) => {
      console.log(value);

      const diceCount =
        getPoints(value.attribute) +
        getPoints(value.attribute, value.skill) +
        value.diceCount +
        (value.modifiers.includes('push') ? 2 : 0);

      calculateSuccesses(diceCount, value.modifiers);
    },
  });

  const rolls = useMemo(() => {
    return selectedAction?.roll ? selectedAction?.roll : [];
  }, [selectedAction]);
  const rollAttributes = useMemo(() => {
    return rolls.map((roll) => roll.attribute);
  }, [rolls]) as AttributeName[];
  const rollSkills = useMemo(() => {
    return rolls.map((roll) => roll.skill);
  }, [rolls]) as SkillName[];

  useEffect(() => {
    rollForm.setFieldValue('attribute', rollAttributes[0]);
    rollForm.setFieldValue('skill', rollSkills[0]);
  }, [rollAttributes, rollSkills]);

  if (isLoading || isPending) return <Loading />;

  return (
    <div className="flex w-full max-w-5xl flex-col items-center gap-8">
      <h1 className="text-center">Roll Simulator</h1>

      <ThemeContainer
        className="w-full max-w-5xl"
        borderColor={accentPrimary}
        chamfer="medium"
      >
        <div className="bg-primary grid w-full grid-cols-2 gap-8 p-4 clip-6">
          <div className="flex flex-col">
            <div className="col-span-3 flex w-full justify-start gap-8 justify-self-start">
              <img
                className="z-10 size-16 shrink-0 rounded-full shadow shadow-zinc-950"
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
              {diceArray.map((number: number) => {
                const modifiers = rollForm.getFieldValue('modifiers');
                const lucky =
                  modifiers.includes('lucky') && !modifiers.includes('unlucky');
                const unlucky =
                  modifiers.includes('unlucky') && !modifiers.includes('lucky');

                switch (number) {
                  case 1:
                    return (
                      <div className="relative h-full w-full">
                        <Die1Icon className="text-primary" />
                        {!rolling &&
                          rollForm
                            .getFieldValue('modifiers')
                            .includes('dooming') && (
                            <div className="absolute inset-3 flex items-center justify-center">
                              <Icon
                                path={mdiCloseOutline}
                                className="w-3/5 text-red-500"
                              />
                            </div>
                          )}
                      </div>
                    );
                    break;
                  case 2:
                    return <Die2Icon className="text-primary" />;
                    break;
                  case 3:
                    return <Die3Icon className="text-primary" />;
                    break;
                  case 4:
                    return (
                      <div className="relative h-full w-full">
                        <Die4Icon className="text-primary" />
                        {!rolling && lucky && (
                          <div className="absolute inset-3 flex items-center justify-center">
                            <Icon
                              path={mdiCheckCircleOutline}
                              className="w-3/5 text-green-500"
                            />
                          </div>
                        )}
                      </div>
                    );
                    break;
                  case 5:
                    return (
                      <div className="relative h-full w-full">
                        <Die5Icon className="text-primary" />
                        {!rolling && !unlucky && (
                          <div className="absolute inset-3 flex items-center justify-center">
                            <Icon
                              path={mdiCheckCircleOutline}
                              className="w-3/5 text-green-500"
                            />
                          </div>
                        )}
                      </div>
                    );
                    break;
                  case 6:
                    return (
                      <div className="relative h-full w-full">
                        <Die6Icon className="text-primary" />
                        {!rolling &&
                          (!modifiers.includes('booming') ? (
                            <div className="absolute inset-3 flex items-center justify-center">
                              <Icon
                                path={mdiCheckCircleOutline}
                                className="w-3/5 text-green-500"
                              />
                            </div>
                          ) : (
                            <div className="absolute inset-3">
                              <Icon
                                path={mdiCheckCircleOutline}
                                className="absolute left-0 top-0 w-3/5 text-green-500"
                              />
                              <Icon
                                path={mdiCheckCircleOutline}
                                className="absolute bottom-0 right-0 w-3/5 text-green-500"
                              />
                            </div>
                          ))}
                      </div>
                    );
                    break;
                  default:
                    return;
                    break;
                }
              })}
            </div>
            {!rolling && successes !== null && (
              <div className="mt-auto flex flex-col gap-4">
                <div className="grid grid-cols-[auto_auto_1fr] gap-x-8 gap-y-4">
                  <h2>Successes</h2>
                  <Icon
                    className="text-primary place-self-center"
                    path={mdiTriangleDown}
                    size={0.5}
                    rotate={-90}
                  />
                  <h2>{successes}</h2>
                  <h2>Success Rate</h2>
                  <Icon
                    className="text-primary place-self-center"
                    path={mdiTriangleDown}
                    size={0.5}
                    rotate={-90}
                  />
                  <h2>
                    {Math.floor((successes / diceArray.length) * 100 || 0) +
                      '%'}
                  </h2>
                </div>
              </div>
            )}
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
            <rollForm.Field name="action">
              {(field) => (
                <SelectField
                  label="Action"
                  className="w-full"
                  field={field}
                  onChange={() => {
                    setSelectedAction(
                      actions.find(
                        (action) => field.state.value === action.name,
                      ) || null,
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
                  {(field) => {
                    const customAttributes = Object.keys(
                      emptyAttributeTree,
                    ).filter(
                      (attribute) => !rollAttributes.includes(attribute),
                    );

                    return (
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
                              >
                                <p className="!text-tertiary whitespace-nowrap text-base">
                                  ({getPoints(roll.attribute) + ' dice'})
                                </p>
                              </InputFieldRadio>
                            </div>
                          ))}
                        <div className="flex w-full flex-col gap-4">
                          <div className="flex items-center gap-4">
                            <InputFieldRadio
                              className="w-full"
                              field={field}
                              label="Custom"
                              onChange={() =>
                                rollForm.setFieldValue(
                                  'attribute',
                                  customAttributes[0],
                                )
                              }
                              checked={
                                !!field.state.value &&
                                !rollAttributes.includes(field.state.value)
                              }
                            >
                              {customAttributes.includes(field.state.value) && (
                                <p className="!text-tertiary whitespace-nowrap text-base">
                                  ({getPoints(field.state.value) + ' dice'})
                                </p>
                              )}
                            </InputFieldRadio>
                          </div>
                          {customAttributes.includes(field.state.value) && (
                            <SelectField label="Attribute" field={field}>
                              {customAttributes.map((attribute) => (
                                <option key={attribute} value={attribute}>
                                  {attribute[0].toUpperCase() +
                                    attribute.slice(1)}
                                </option>
                              ))}
                            </SelectField>
                          )}
                        </div>
                      </>
                    );
                  }}
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
                  <rollForm.Subscribe
                    selector={(state) => state.values.attribute}
                  >
                    {(attribute) => (
                      <rollForm.Field name="skill">
                        {(field) => {
                          const customSkills = attribute
                            ? Object.keys(emptyAttributeTree[attribute].skills)
                            : [];

                          return (
                            <>
                              {rolls.length > 0 &&
                                rolls.map((roll, i) => (
                                  <div
                                    key={i}
                                    className="flex items-center gap-4"
                                  >
                                    <InputFieldRadio
                                      className="w-full"
                                      field={field}
                                      label={
                                        roll.skill[0].toUpperCase() +
                                        roll.skill.slice(1)
                                      }
                                      value={roll.skill}
                                      checked={roll.skill === field.state.value}
                                    >
                                      <p className="!text-tertiary whitespace-nowrap text-base">
                                        (
                                        {getPoints(roll.attribute, roll.skill) +
                                          ' dice'}
                                        )
                                      </p>
                                    </InputFieldRadio>
                                  </div>
                                ))}
                              <div className="flex w-full flex-col gap-4">
                                <div className="flex items-center gap-4">
                                  <InputFieldRadio
                                    className="w-full"
                                    field={field}
                                    label="Custom"
                                    onChange={() =>
                                      rollForm.setFieldValue(
                                        'skill',
                                        customSkills[0],
                                      )
                                    }
                                    checked={
                                      !!field.state.value &&
                                      !rollSkills.includes(field.state.value)
                                    }
                                  >
                                    {customSkills.includes(field.state.value) &&
                                      !rollAttributes.includes(attribute) && (
                                        <p className="!text-tertiary whitespace-nowrap text-base">
                                          (
                                          {getPoints(
                                            attribute,
                                            field.state.value,
                                          ) + ' dice'}
                                          )
                                        </p>
                                      )}
                                  </InputFieldRadio>
                                </div>
                                {customSkills.includes(field.state.value) &&
                                  !rollAttributes.includes(attribute) && (
                                    <SelectField label="Skill" field={field}>
                                      {customSkills.map((skill) => (
                                        <option
                                          key={skill}
                                          className="flex w-full justify-between"
                                          value={skill}
                                        >
                                          {skill[0].toUpperCase() +
                                            skill.slice(1)}
                                        </option>
                                      ))}
                                    </SelectField>
                                  )}
                              </div>
                            </>
                          );
                        }}
                      </rollForm.Field>
                    )}
                  </rollForm.Subscribe>
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
                  {(field) => {
                    const modifiers = [
                      'push',
                      'booming',
                      'dooming',
                      'lucky',
                      'unlucky',
                    ];
                    return (
                      <>
                        {modifiers.map((modifier) => (
                          <InputFieldCheckbox
                            key={modifier}
                            field={field}
                            label={
                              modifier[0].toUpperCase() + modifier.slice(1)
                            }
                            value={modifier}
                            checked={field.state.value.includes(modifier)}
                            onChange={(value: string) => {
                              if (field.state.value.includes(value)) {
                                rollForm.setFieldValue('modifiers', (prev) =>
                                  prev.filter((modifier) => modifier !== value),
                                );
                              } else {
                                rollForm.setFieldValue('modifiers', (prev) => [
                                  ...prev,
                                  value,
                                ]);
                              }
                            }}
                          />
                        ))}
                      </>
                    );
                  }}
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
                    state.values.modifiers,
                  ]}
                >
                  {([attribute, skill, dice, modifiers]) => (
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
                            dice +
                            (modifiers?.includes('push') ? 2 : 0)
                          : getPoints(attribute) +
                            dice +
                            (modifiers?.includes('push') ? 2 : 0)}
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
    </div>
  );
};

export default RollSimulator;
