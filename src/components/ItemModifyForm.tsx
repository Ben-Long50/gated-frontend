import { useForm } from '@tanstack/react-form';
import { useContext, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { AuthContext } from 'src/contexts/AuthContext';
import useItemQuery from 'src/hooks/useItemQuery/useItemQuery';
import FormLayout from 'src/layouts/FormLayout';
import { Stats } from 'src/types/item';
import { Keyword } from 'src/types/keyword';
import TextAreaField from './TextAreaField';
import PictureField from './form_fields/PictureField';
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
import useGradePoints from 'src/hooks/useGradePoints';
import KeywordLinkField from './form_fields/KeywordLinkField';
import KeywordList from './KeywordList';
import Modal from './Modal';
import useCharacterQuery from 'src/hooks/useCharacterQuery/useCharacterQuery';
import useItemStats from 'src/hooks/useItemStats';
import BtnIcon from './buttons/BtnIcon';
import { capitalCase } from 'change-case';

const ItemModifyForm = () => {
  const { apiUrl } = useContext(AuthContext);
  const [formMessage, setFormMessage] = useState('');
  const [deleteMode, setDeleteMode] = useState(false);
  const [tutorialModal, setTutorialModal] = useState(true);
  const { characterId } = useParams();
  const location = useLocation();
  const parts = location.pathname.split('/').filter(Boolean);
  const mode = parts[parts.length - 1];
  const itemId = parts[parts.length - 2];
  const category = parts[parts.length - 3];

  const categoryName = capitalCase(category);

  const toggleTutorialModal = () => setTutorialModal(!tutorialModal);

  const { data: character } = useCharacterQuery(Number(characterId));

  const { data: item, isLoading } = useItemQuery(
    apiUrl,
    Number(itemId),
    category,
  );

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

  const itemModifyForm = useForm({
    defaultValues: {
      id: item?.id ?? null,
      name: item?.name ?? '',
      grade: item?.grade ?? 0,
      description: item?.description ?? '',
      picture: item?.picture ?? '',
      position: item?.picture?.position ?? { x: 50, y: 50 },
      modifiedStats:
        item?.modifiedStats ||
        Object.fromEntries(Object.keys(item?.stats).map((stat) => [stat, 0])),
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
        if (availableGp < 0) {
          return 'You do not have enough available GP to complete the chosen upgrades';
        }
      },
    },
  });

  const { itemStats } = useItemStats(item);

  const {
    gradePointMap,
    availableGp,
    upgradePrice,
    powerLevel,
    upgradedPowerLevel,
  } = useGradePoints(itemModifyForm, item);

  itemModifyForm.setFieldValue('upgradePrice', upgradePrice);

  if (isLoading) return <Loading />;

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
          <h1 className="text-center">Modify {item?.name}</h1>
          <Divider />
          <ArrowHeader2 title={categoryName + ' Information'} />
          <div className="grid w-full gap-8 max-sm:col-span-2 max-sm:grid-flow-row sm:grid-cols-2">
            <PictureField
              form={itemModifyForm}
              sizeInfo={{ aspectRatio: '1/1', maxHeight: '', minHeight: '' }}
            />
            <div className="flex flex-col gap-8">
              <div className="flex items-center justify-between gap-4">
                <ArrowHeader3 title="Grade" />
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
                              className="size-6 shrink-0 text-yellow-300"
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
                                  className="size-6 text-yellow-300"
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
            <ArrowHeader2 title="Grade Point Distribution" />
            <p>
              Available GP -{' '}
              <span className={`${availableGp < 0 && 'text-error'}`}>
                ( {availableGp} )
              </span>
            </p>
          </div>
          <div className="grid w-full grid-cols-[1fr_auto_auto_auto_auto_auto] items-center gap-x-2 gap-y-6 border-x-2 border-gray-400 border-opacity-50 px-6">
            {itemStats &&
              Object.entries(itemStats).map(([stat, value]) => {
                const exists =
                  itemModifyForm.getFieldValue(`modifiedStats[${stat}]`) !==
                  undefined;
                return (
                  exists && (
                    <itemModifyForm.Field
                      name={`modifiedStats[${stat}]`}
                      key={stat}
                    >
                      {(field) => {
                        const currentLevel =
                          field.state.value + item?.stats[stat];
                        return (
                          <>
                            <h4 className="w-full">
                              {capitalCase(stat)}{' '}
                              <span className="text-tertiary ml-2 text-base font-normal">
                                ({gradePointMap[stat](currentLevel + 1)} GP)
                              </span>
                            </h4>
                            <p className="mr-3 font-semibold !text-green-400">
                              {field.state.value > 0
                                ? `+${field.state.value}`
                                : ''}
                            </p>
                            <BtnIcon
                              path={mdiMinus}
                              active={field.state.value > 0}
                              onClick={() =>
                                field.handleChange(field.state.value - 1)
                              }
                            />
                            <p className="min-w-8 text-center">
                              {value + field.state.value}
                            </p>
                            <BtnIcon
                              path={mdiPlus}
                              active={
                                availableGp >= gradePointMap[stat](currentLevel)
                              }
                              onClick={() =>
                                field.handleChange(field.state.value + 1)
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
                  )
                );
              })}
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
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
            keywordType={category}
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
                className="group-hover:text-yellow-300 dark:text-gray-900"
                size={1.15}
              />
            ) : (
              capitalCase(mode)
            )}
          </BtnRect>
        </form>
      </FormLayout>
      <Modal modalOpen={tutorialModal} toggleModal={toggleTutorialModal}>
        <h1 className="text-center">Item Modification System</h1>
        <Divider />
        <div>
          <p>
            Welcome to Electric Death Online's item modification system. Using
            this system, you can upgrade your weapons, armor and other items by
            increasing the item's stats and adjusting the item's traits by
            either upgrading the values on current traits or adding new ones.
            <br />
            <br />
            Each grade level (denoted by the number of star icons on the item)
            awards you 5 Grade Points (GP) to spend on upgrades. Each stat and
            trait option costs a different number of grade points to upgrade
            depending on how impactful that upgrade is to the overall power of
            the item. For example, adding a point of damage to a weapon costs
            10GP while adding a point of Mag Capacity only costs 2GP.
            <br />
            <br />
            Increasing the grade of your item is not free. Naturally, the higher
            the price of the base item, the higher the price of each grade level
            applied. Not only that, but grade levels become increasingly more
            expensive to purchase for each level applied. Things can get
            expensive real fast. Such is the cost of having a powerful item
            perfectly suited to your build.
            <br />
            <br />
            Once the purchase of an item modification is confirmed, you cannot
            undo your chosen GP distribution, so be sure the chosen upgrades are
            the ones you want to carry on the item forever.
            <br />
            <br />
            To apply and purchase upgrades, follow this list:
            <br />
            <br />
          </p>
          <ol>
            <li>
              Use the plus and minus buttons next to "Grade" to set the number
              of grade levels you want to purchase for the item. GP
              corresponding to the set grade level will be shown below.
            </li>
            <li>
              Use the plus and minus buttons next to each stat to spend your
              available GP on permanent stat bonuses.
            </li>
            <li>
              When all your GP is allocated, you can view the final price of the
              chosen upgrades at the bottom of the form.
            </li>
            <li>
              Click the "Modify" button to confirm your item's upgrades. Profits
              will automatically be deducted from your character for the
              purchase.
            </li>
          </ol>
        </div>

        <BtnRect
          className="mt-4 w-full"
          type="button"
          ariaLabel="Close tutorial"
          onClick={(e) => {
            e.preventDefault();
            setTutorialModal(false);
          }}
        >
          Close
        </BtnRect>
      </Modal>
    </>
  );
};

export default ItemModifyForm;
