import { useForm } from '@tanstack/react-form';
import { useContext, useState } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { AuthContext } from 'src/contexts/AuthContext';
import useItemQuery from 'src/hooks/useItemQuery/useItemQuery';
import FormLayout from 'src/layouts/FormLayout';
import { Keyword } from 'src/types/keyword';
import TextAreaField from './TextAreaField';
import PictureField from './formFields/PictureField';
import Loading from './Loading';
import InputField from './InputField';
import ArrowHeader2 from './ArrowHeader2';
import Divider from './Divider';
import Icon from '@mdi/react';
import { mdiMinus, mdiPlus, mdiStar, mdiTriangleDown } from '@mdi/js';
import ArrowHeader3 from './ArrowHeader3';
import BtnRect from './buttons/BtnRect';
import useModifyItemMutation from 'src/hooks/useModifyItemMutation/useModifyItemMutation';
import useDeleteItemMutation from 'src/hooks/useDeleteItemMutation/useDeleteItemMutation';
import {
  extractItemListIds,
  extractKeywordListIds,
} from 'src/utils/extractIds';
import KeywordLinkField from './formFields/KeywordLinkField';
import KeywordList from './KeywordList';
import useCharacterQuery from 'src/hooks/useCharacterQuery/useCharacterQuery';
import BtnIcon from './buttons/BtnIcon';
import { capitalCase } from 'change-case';
import upgradePointMap from '../hooks/upgradePointMap';
import useUpgradePoints from 'src/hooks/useUpgradePoints';

const ItemUpgradeForm = () => {
  const { apiUrl } = useContext(AuthContext);
  const [formMessage, setFormMessage] = useState('');
  const [deleteMode, setDeleteMode] = useState(false);
  const { characterId, itemId, category } = useParams();
  const location = useLocation();
  const parts = location.pathname.split('/').filter(Boolean);
  const mode = parts[parts.length - 1];

  const categoryName = capitalCase(category).slice(0, -1);

  const { data: character, isLoading: characterLoading } = useCharacterQuery(
    Number(characterId),
  );

  const { data: item, isLoading: itemLoading } = useItemQuery(Number(itemId));

  const deleteItem = useDeleteItemMutation(
    apiUrl,
    category,
    setFormMessage,
    Number(itemId),
  );

  const modifyItem = useModifyItemMutation(
    apiUrl,
    Number(characterId),
    Number(itemId),
    category,
  );

  const handleDelete = () => {
    if (deleteMode) {
      deleteItem.mutate();
    } else {
      setDeleteMode(true);
    }
  };

  const handleReset = async () => {
    itemModifyForm.reset();
  };

  const upgradableStats = item?.stats
    ? Object.fromEntries(
        Object.keys(item?.stats)
          .filter((stat) => upgradePointMap[stat])
          .map((stat) => [stat, 0]),
      )
    : {};

  const itemModifyForm = useForm({
    defaultValues: {
      id: item?.id ?? null,
      name: item?.name ?? '',
      grade: item?.grade ?? 0,
      description: item?.description ?? '',
      picture: item?.picture ?? '',
      position: item?.picture?.position ?? { x: 50, y: 50 },
      modifiedStats: { ...upgradableStats, ...item?.modifiedStats },
      keywords:
        item?.modifiedKeywords ||
        ([] as { keyword: Keyword; value: number | null }[]),
      upgradePrice: 0,
    },
    onSubmit: async ({ value }) => {
      const filteredStats = Object.fromEntries(
        Object.entries(value.modifiedStats).filter(([_, val]) => val),
      );

      const { keywords, ...rest } = value;

      const data = {
        ...rest,
        modifiedStats: filteredStats,
        itemIds: extractItemListIds(item?.itemLinkReference?.items),
        actionIds: extractItemListIds(item?.itemLinkReference?.actions),
        keywordIds: extractKeywordListIds(item?.keywords),
        modifiedKeywordIds: extractKeywordListIds(value.keywords),
      };

      const formData = new FormData();
      Object.entries(data).forEach(([key, val]) => {
        if (key === 'picture') {
          if (val instanceof File) {
            formData.append(key, val);
          } else {
            formData.append(key, JSON.stringify(val));
          }
        } else {
          formData.append(key, JSON.stringify(val));
        }
      });
      modifyItem.mutate(formData);
    },
    validators: {
      onSubmit: () => {
        if (availableUp < 0) {
          return 'You do not have enough available GP to complete the chosen upgrades';
        }
      },
    },
  });

  const { availableUp, upgradePrice, powerLevel, upgradedPowerLevel } =
    useUpgradePoints(itemModifyForm, item);

  itemModifyForm.setFieldValue('upgradePrice', upgradePrice);

  if (itemLoading || characterLoading) return <Loading />;

  return (
    <>
      <FormLayout
        itemId={itemId}
        modifyMutation={modifyItem}
        deleteMutation={deleteItem}
        handleDelete={handleDelete}
        handleReset={handleReset}
        formMessage={formMessage}
        deleteMode={deleteMode}
        setDeleteMode={setDeleteMode}
      >
        <form
          className="flex flex-col gap-8"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            itemModifyForm.handleSubmit();
          }}
        >
          <h1 className="text-center">Upgrade {item?.name}</h1>
          <Divider />
          <ArrowHeader2 title={categoryName + ' Information'} />
          <div className="grid w-full gap-8 max-sm:col-span-2 max-sm:grid-flow-row sm:grid-cols-2">
            <PictureField
              form={itemModifyForm}
              sizeInfo={{ aspectRatio: '1/1', maxHeight: '', minHeight: '' }}
            />
            <div className="flex flex-col gap-8">
              <div className="flex items-center justify-between gap-4">
                <ArrowHeader3 title="Upgrade" />
                <itemModifyForm.Field name="grade">
                  {(field) => (
                    <div className="flex w-1/2 items-center gap-2">
                      <BtnIcon
                        path={mdiMinus}
                        active={item?.grade && field.state.value > item?.grade}
                        onClick={() =>
                          field.handleChange(field.state.value - 1)
                        }
                      />
                      <div className="flex grow flex-wrap items-center justify-end gap-1">
                        {field.state.value > 5 ? (
                          <div className="flex items-center gap-2">
                            <Icon
                              path={mdiStar}
                              className="text-accent size-6 shrink-0"
                            />
                            <p className="whitespace-nowrap pt-1 font-semibold">
                              x {field.state.value}
                            </p>
                          </div>
                        ) : (
                          <div className="flex">
                            {Array.from({ length: field.state.value }).map(
                              (_, index) => (
                                <Icon
                                  key={index}
                                  path={mdiStar}
                                  className="text-accent size-6"
                                />
                              ),
                            )}
                          </div>
                        )}
                      </div>
                      <BtnIcon
                        path={mdiPlus}
                        active={field.state.value < 10}
                        onClick={() =>
                          field.handleChange(field.state.value + 1)
                        }
                      />
                    </div>
                  )}
                </itemModifyForm.Field>
              </div>
              <itemModifyForm.Field
                name="name"
                validators={{
                  onChange: ({ value }) =>
                    value.length < 2
                      ? 'Weapon name must be at least 2 characters long'
                      : undefined,
                }}
              >
                {(field) => (
                  <InputField
                    className="grow"
                    label={`${categoryName} Name`}
                    field={field}
                  />
                )}
              </itemModifyForm.Field>
              <itemModifyForm.Field
                name="description"
                validators={{
                  onChange: ({ value }) =>
                    value.length < 2
                      ? 'Weapon description must be at least 2 characters long'
                      : undefined,
                }}
              >
                {(field) => (
                  <TextAreaField
                    label={`${categoryName} Description`}
                    field={field}
                  />
                )}
              </itemModifyForm.Field>
            </div>
          </div>
          <Divider />
          <div className="flex items-center justify-between gap-8">
            <ArrowHeader2 title="Upgrade Point Distribution" />
            <p>
              Available UP -{' '}
              <span className={`${availableUp < 0 && 'text-error'}`}>
                ( {availableUp} )
              </span>
            </p>
          </div>
          <div className="grid w-full grid-cols-[1fr_auto_auto_auto_auto_auto] items-center gap-x-2 gap-y-6 border-x-2 border-gray-400 border-opacity-50 px-6">
            <itemModifyForm.Field name="modifiedStats">
              {(field) =>
                Object.keys(field.state.value).map((stat) => (
                  <itemModifyForm.Field
                    name={`modifiedStats[${stat}]`}
                    key={stat}
                  >
                    {(subField) => {
                      const currentLevel =
                        subField.state.value + item?.stats[stat];

                      const nextLevelUpgradePoints = upgradePointMap[stat](
                        currentLevel + 1,
                      );

                      const currentLevelUpgradePoints =
                        upgradePointMap[stat](currentLevel);

                      return (
                        <>
                          <h4 className="w-full">
                            {capitalCase(stat)}{' '}
                            <span className="text-tertiary ml-2 text-base font-normal">
                              ({nextLevelUpgradePoints} GP)
                            </span>
                          </h4>
                          <p className="mr-3 font-semibold !text-green-400">
                            {subField.state.value > 0
                              ? `+${subField.state.value}`
                              : ''}
                          </p>
                          <BtnIcon
                            path={mdiMinus}
                            active={subField.state.value > 0}
                            onClick={() =>
                              subField.handleChange(subField.state.value - 1)
                            }
                          />
                          <p className="min-w-8 text-center">
                            {item?.stats[stat] + subField.state.value}
                          </p>
                          <BtnIcon
                            path={mdiPlus}
                            active={availableUp >= currentLevelUpgradePoints}
                            onClick={() =>
                              subField.handleChange(subField.state.value + 1)
                            }
                          />
                          <p className="text-tertiary text-sm">
                            {item?.modifiedStats &&
                              item?.modifiedStats[stat] &&
                              `( ${item?.modifiedStats[stat]} )`}
                          </p>
                        </>
                      );
                    }}
                  </itemModifyForm.Field>
                ))
              }
            </itemModifyForm.Field>
          </div>
          <Divider />
          <KeywordList
            item={item}
            title={'Base Traits'}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          />
          <KeywordLinkField
            title="Upgraded Traits"
            mode={mode}
            form={itemModifyForm}
          />
          <Divider />
          <div className="flex w-full items-center justify-between">
            <ArrowHeader3 title="Power Level" />
            <div className="flex items-center gap-4">
              <h3>{powerLevel}</h3>
              <Icon
                path={mdiTriangleDown}
                className="text-secondary"
                rotate={-90}
                size={0.375}
              />
              <h3
                className={`${upgradedPowerLevel > powerLevel && '!text-green-400'}`}
              >
                {upgradedPowerLevel}
              </h3>
            </div>
          </div>
          <itemModifyForm.Field name="upgradePrice">
            {(field) => (
              <div className="flex flex-col gap-2">
                <div className="flex w-full items-center justify-between">
                  <ArrowHeader3 title="Upgrade Price" />
                  <h3>{field.state.value}p</h3>
                </div>
                <div className="flex w-full items-center justify-between">
                  <p className="text-tertiary pl-7">Remaining Profits</p>
                  <p className="text-tertiary">
                    {character?.profits - field.state.value}p
                  </p>
                </div>
              </div>
            )}
          </itemModifyForm.Field>
          <itemModifyForm.Subscribe selector={(state) => state.errorMap}>
            {(errorMap) =>
              errorMap.onSubmit ? (
                <em className="text-error text-lg">{errorMap.onSubmit}</em>
              ) : null
            }
          </itemModifyForm.Subscribe>
          <BtnRect
            ariaLabel={capitalCase(mode)}
            type="submit"
            className="group w-full"
          >
            {modifyItem.isPending ? (
              <Loading
                className="group-hover:text-accent dark:text-gray-900"
                size={1.15}
              />
            ) : (
              capitalCase(mode)
            )}
          </BtnRect>
        </form>
      </FormLayout>
      {parts[parts.length - 1] === 'tutorial' && <Outlet />}
    </>
  );
};

export default ItemUpgradeForm;
