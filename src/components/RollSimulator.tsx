import { useForm, useStore } from '@tanstack/react-form';
import useActions from '../hooks/useActions';
import ArrowHeader3 from './ArrowHeader3';
import ThemeContainer from './ThemeContainer';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import InputFieldRadio from './InputFieldRadio';
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
import Die1Icon from './icons/Die1Icon';
import Die5Icon from './icons/Die5Icon';
import Die4Icon from './icons/Die4Icon';
import useRoll from '../hooks/useRoll';
import { AttributeName, SkillName } from 'src/types/attributeTree';
import InputSelectField from './InputSelectField';
import { useParams } from 'react-router-dom';
import useCampaignQuery from '../hooks/useCampaignQuery/useCampaignQuery';
import { LayoutContext } from '../contexts/LayoutContext';
import Modal from './Modal';
import CharacterPictureRound from './CharacterPictureRound';
import ArrowHeader2 from './ArrowHeader2';
import useCharacters from 'src/hooks/useCharacters';

const RollSimulator = () => {
  const { apiUrl, user } = useContext(AuthContext);
  const { mobile } = useContext(LayoutContext);
  const { accentPrimary } = useContext(ThemeContext);
  const { campaignId } = useParams();

  const { data: campaign, isLoading: campaignLoading } = useCampaignQuery(
    apiUrl,
    Number(campaignId),
  );

  const { activeCharacter, isLoading: characterLoading } = useCharacters();

  const { filteredActions: actions } = useActions();

  const { diceArray, setDiceArray, rolling, calculateSuccesses, successes } =
    useRoll();

  const resetDice = () => {
    setDiceArray([]);
  };

  const rollForm = useForm({
    defaultValues: {
      activeCharacter: user?.id === campaign?.ownerId ? '' : activeCharacter,
      action: '',
      rollType: 'recommended' as 'recommended' | 'custom',
      attribute: '' as AttributeName,
      skill: '' as SkillName,
      modifiers: [] as string[],
      diceCount: 0,
    },
    onSubmit: ({ value }) => {
      const diceCount =
        getPoints(value.attribute) +
        getPoints(value.attribute, value.skill) +
        value.diceCount +
        (value.modifiers.includes('push') ? 2 : 0);

      calculateSuccesses(diceCount, value.modifiers);
    },
  });

  const selectedCharacter = useStore(
    rollForm.store,
    (state) => state.values.activeCharacter,
  );

  const { emptyAttributeTree, getPoints } = useAttributeTree(
    selectedCharacter?.attributes,
  );

  if (campaignLoading || characterLoading) return <Loading />;

  return (
    <div className="flex w-full max-w-5xl flex-col items-center gap-8">
      <h1 className="text-center">Roll Simulator</h1>

      <ThemeContainer
        className="w-full max-w-4xl"
        borderColor={accentPrimary}
        chamfer="medium"
      >
        <div className={`flex w-full flex-col gap-8 p-4`}>
          <rollForm.Field
            name="activeCharacter"
            listeners={{
              onChange: () => {
                rollForm.setFieldValue('action', '');
                rollForm.setFieldValue('rollType', 'recommended');
                rollForm.setFieldValue('modifiers', []);
                setDiceArray([]);
              },
            }}
          >
            {(field) => (
              <div className="flex w-full flex-col gap-8">
                {user?.id === campaign?.ownerId && (
                  <InputSelectField
                    field={field}
                    options={campaign?.characters}
                    label="Character to Roll"
                  />
                )}
                {field.state.value && (
                  <div className="flex w-full items-center justify-start gap-4">
                    <CharacterPictureRound character={field.state.value} />
                    <ArrowHeader2
                      title={
                        field.state.value.firstName +
                        ' ' +
                        field.state.value.lastName
                      }
                    />
                  </div>
                )}
              </div>
            )}
          </rollForm.Field>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              rollForm.handleSubmit();
            }}
            className={`${mobile ? 'row-span-1' : 'col-start-2 row-start-1 row-end-3'} mb-auto flex flex-col items-start justify-start gap-8`}
          >
            <ArrowHeader3 title="Roll Options" />
            <rollForm.Field
              name="action"
              listeners={{
                onChange: ({ value }) => {
                  const rollType = rollForm.getFieldValue('rollType');

                  if (rollType === 'recommended') {
                    rollForm.setFieldValue(
                      'attribute',
                      value.roll?.length > 0 ? value.roll[0].attribute : '',
                    );
                    rollForm.setFieldValue(
                      'skill',
                      value.roll?.length > 0 ? value.roll[0].skill : '',
                    );
                  } else {
                    rollForm.setFieldValue('attribute', '');
                    rollForm.setFieldValue('skill', '');
                  }
                },
              }}
            >
              {(field) => (
                <InputSelectField
                  options={actions}
                  label="Action"
                  className="w-full"
                  field={field}
                />
              )}
            </rollForm.Field>
            <ThemeContainer
              className="w-full"
              borderColor={accentPrimary}
              chamfer="small"
            >
              <p className="!text-accent bg-primary absolute -top-2 left-3.5 z-20 px-1.5 text-base">
                Roll Type
              </p>
              <rollForm.Field
                name="rollType"
                listeners={{
                  onChange: ({ value }) => {
                    const selectedAction = rollForm.getFieldValue('action');

                    if (value === 'recommended') {
                      rollForm.setFieldValue(
                        'attribute',
                        selectedAction && selectedAction.roll?.length > 0
                          ? selectedAction.roll[0].attribute
                          : '',
                      );
                      rollForm.setFieldValue(
                        'skill',
                        selectedAction && selectedAction.roll?.length > 0
                          ? selectedAction.roll[0].skill
                          : '',
                      );
                    } else {
                      rollForm.setFieldValue('attribute', '');
                      rollForm.setFieldValue('skill', '');
                    }
                  },
                }}
              >
                {(field) => (
                  <div className="flex w-full flex-col gap-4 p-4 px-4 pt-6">
                    <InputFieldRadio
                      className="w-full"
                      field={field}
                      label="Recommended"
                      value="recommended"
                      onChange={() => field.handleChange('recommended')}
                      checked={field.state.value === 'recommended'}
                    />
                    <InputFieldRadio
                      className="w-full"
                      field={field}
                      label="Custom"
                      value="custom"
                      onChange={() => field.handleChange('custom')}
                      checked={field.state.value === 'custom'}
                    />
                  </div>
                )}
              </rollForm.Field>
            </ThemeContainer>
            <rollForm.Subscribe
              selector={(state) => [state.values.action, state.values.rollType]}
            >
              {([action, rollType]) => (
                <>
                  <rollForm.Field name="attribute">
                    {(field) => {
                      const attributeList =
                        rollType === 'custom'
                          ? Object.keys(emptyAttributeTree)
                          : action?.roll
                            ? action.roll?.map(
                                (r: { attribute: string; skill: string }) =>
                                  r.attribute,
                              )
                            : [];

                      return (
                        <InputSelectField
                          options={attributeList}
                          label="Attribute"
                          field={field}
                          initialValue={field.state.value}
                        />
                      );
                    }}
                  </rollForm.Field>
                  <rollForm.Subscribe
                    selector={(state) => state.values.attribute}
                  >
                    {(attribute) => (
                      <rollForm.Field name="skill">
                        {(field) => {
                          const skillList =
                            rollType === 'custom'
                              ? Object.keys(emptyAttributeTree).includes(
                                  attribute,
                                )
                                ? Object.keys(
                                    emptyAttributeTree[attribute]?.skills,
                                  )
                                : []
                              : action?.roll
                                ? action.roll?.map(
                                    (r: { attribute: string; skill: string }) =>
                                      r.skill,
                                  )
                                : [];

                          return (
                            <InputSelectField
                              options={skillList}
                              label="Skill"
                              field={field}
                              initialValue={field.state.value}
                            />
                          );
                        }}
                      </rollForm.Field>
                    )}
                  </rollForm.Subscribe>
                </>
              )}
            </rollForm.Subscribe>
            <ThemeContainer
              className="w-full"
              borderColor={accentPrimary}
              chamfer="small"
            >
              <p className="!text-accent bg-primary absolute -top-2 left-3.5 z-20 px-1.5 text-base">
                Modifiers
              </p>
              <div className="relative flex w-full flex-col gap-4 p-4 pt-6">
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
                      <DieIcon className="text-secondary size-10" />
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
      <Modal
        modalOpen={rolling || diceArray.length > 0}
        toggleModal={resetDice}
      >
        <ThemeContainer
          className="h-80dvh min-h-50dvh w-full max-w-3xl"
          chamfer="medium"
          borderColor={accentPrimary}
        >
          <div
            className={`flex h-full flex-col justify-between gap-4 p-4 sm:p-8`}
          >
            <div className="scrollbar-primary-2 grid grid-cols-3 place-items-start overflow-y-auto">
              {diceArray.map((number: number, index) => {
                const modifiers = rollForm.getFieldValue('modifiers');
                const lucky =
                  modifiers.includes('lucky') && !modifiers.includes('unlucky');
                const unlucky =
                  modifiers.includes('unlucky') && !modifiers.includes('lucky');
                switch (number) {
                  case 1:
                    return (
                      <div key={index} className="relative h-full w-full">
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
                  case 2:
                    return (
                      <Die2Icon key={index} className="text-primary w-full" />
                    );
                  case 3:
                    return (
                      <Die3Icon key={index} className="text-primary w-full" />
                    );
                  case 4:
                    return (
                      <div key={index} className="relative h-full w-full">
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
                  case 5:
                    return (
                      <div key={index} className="relative h-full w-full">
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
                  case 6:
                    return (
                      <div key={index} className="relative h-full w-full">
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
                  default:
                    return;
                }
              })}
            </div>
            <div className="flex flex-col gap-4">
              {!rolling && (
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
              )}
              <BtnRect
                type="button"
                ariaLabel="Reroll"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  rollForm.handleSubmit();
                }}
              >
                Reroll
              </BtnRect>
            </div>
          </div>
        </ThemeContainer>
      </Modal>
    </div>
  );
};

export default RollSimulator;
