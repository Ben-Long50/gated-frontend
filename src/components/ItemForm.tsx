import { useForm } from '@tanstack/react-form';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import BtnRect from './buttons/BtnRect';
import InputField from './InputField';
import TextAreaField from './TextAreaField';
import Loading from './Loading';
import FormLayout from '../layouts/FormLayout';
import { useLocation, useParams } from 'react-router-dom';
import { Keyword } from 'src/types/keyword';
import ArrowHeader2 from './ArrowHeader2';
import Divider from './Divider';
import { Action } from 'src/types/action';
import ActionLinkField from './form_fields/ActionLinkField';
import ArmorLinkField from './form_fields/ArmorLinkField';
import WeaponLinkField from './form_fields/WeaponLinkField';
import KeywordLinkField from './form_fields/KeywordLinkField';
import { extractItemListIds, extractKeywordListIds } from '../utils/extractIds';
import useItemQuery from 'src/hooks/useItemQuery/useItemQuery';
import { Item, Stats } from 'src/types/item';
import useItems from 'src/hooks/useItems';
import PictureField from './form_fields/PictureField';
import RarityField from './form_fields/RarityField';
import StatFields from './form_fields/StatFields';
import useCreateItemMutation from 'src/hooks/useCreateItemMutation/useCreateItemMutation';
import useDeleteItemMutation from 'src/hooks/useDeleteItemMutation/useDeleteItemMutation';

const ItemForm = () => {
  const { apiUrl } = useContext(AuthContext);
  const [formMessage, setFormMessage] = useState('');
  const [deleteMode, setDeleteMode] = useState(false);
  const { itemId } = useParams();
  const location = useLocation();
  const parts = location.pathname.split('/').filter(Boolean);
  const mode = parts[parts.length - 1];
  const category = itemId ? parts[parts.length - 3] : parts[parts.length - 2];

  const { data: item } = useItemQuery(apiUrl, Number(itemId), category);

  const { filteredItems: weapons } = useItems({
    category: 'weapons',
    excludedKeywords: ['Cyber Weapon', 'Vehicle Weapon', 'Drone Weapon'],
  });

  const { filteredItems: armors } = useItems({
    category: 'armors',
    excludedKeywords: ['Cyber Armor'],
  });

  const createItem = useCreateItemMutation(
    apiUrl,
    category,
    setFormMessage,
    Number(itemId),
  );

  const deleteItem = useDeleteItemMutation(
    apiUrl,
    category,
    setFormMessage,
    Number(itemId),
  );

  const handleDelete = () => {
    if (deleteMode) {
      deleteItem.mutate();
    } else {
      setDeleteMode(true);
    }
  };

  const handleReset = async () => {
    itemForm.reset();
  };

  const categoryName = (() => {
    const name = category.charAt(0).toUpperCase() + category.slice(1);
    return name.slice(0, -1);
  })();

  const itemForm = useForm({
    defaultValues: {
      id: item?.id || null,
      name: item?.name || '',
      itemType: item?.itemType || '',
      rarity: item?.rarity || '',
      grade: item?.grade || 1,
      picture: item?.picture || '',
      position: item?.picture?.position || { x: 50, y: 50 },
      description: item?.description || '',
      price: item?.price || '',
      stats: {
        damage: item?.stats.damage || '',
        salvo: item?.stats.salvo || '',
        flurry: item?.stats.flurry || '',
        range: item?.stats.range || '',
        magCapacity: item?.stats.magCapacity || '',
        currentAmmoCount: item?.stats.currentAmmoCount || '',
        magCount: item?.stats.magCount || '',
        currentMagCount: item?.stats.currentMagCount || '',
        weight: item?.stats.weight || '',
        ward: item?.stats.ward || '',
        block: item?.stats.block || '',
        currentBlock: item?.stats.currentBlock || '',
        power: item?.stats.power || '',
        currentPower: item?.stats.currentPower || '',
        cyber: item?.stats.cyber || '',
        size: item?.stats?.size || '',
        speed: item?.stats?.speed || '',
        agility: item?.stats?.agility || '',
        hull: item?.stats?.hull || '',
        currentHull: item?.stats?.currentHull || '',
        armor: item?.stats?.armor || '',
        cargo: item?.stats?.cargo || '',
        currentCargo: item?.stats?.currentCargo || '',
        hangar: item?.stats?.hangar || '',
        currentHangar: item?.stats?.currentHangar || '',
        pass: item?.stats?.pass || '',
        currentPass: item?.stats?.currentPass || '',
        weapon: item?.stats?.weapon || '',
        currentWeapon: item?.stats?.currentWeapon || '',
      } as Stats,
      weapons:
        item?.itemLinkReference?.items.filter(
          (item: Item) => item.itemType === 'weapon',
        ) || ([] as Item[]),
      armor:
        item?.itemLinkReference?.items.filter(
          (item: Item) => item.itemType === 'armor',
        ) || ([] as Item[]),
      actions: item?.itemLinkReference?.actions || ([] as Action[]),
      keywords:
        item?.keywords || ([] as { keyword: Keyword; value: number | null }[]),
    },
    onSubmit: async ({ value }) => {
      value.stats.currentAmmoCount = value.stats.magCapacity;
      value.stats.currentMagCount = value.stats.magCount
        ? value.stats.magCount - 1
        : 0;

      value.stats.currentPower = value.stats.power
        ? value.stats.power
        : undefined;

      const filteredStats = Object.fromEntries(
        Object.entries(value.stats).filter(([_, val]) => val),
      );

      value.stats = { ...filteredStats };

      const { weapons, armor, actions, keywords, ...rest } = value;

      const data = {
        ...rest,
        itemIds: extractItemListIds([...value.weapons, ...value.armor]),
        actionIds: extractItemListIds(value.actions),
        keywordIds: extractKeywordListIds(value.keywords),
      };

      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (key === 'picture' && value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, JSON.stringify(value));
        }
      });
      await createItem.mutate(formData);
    },
  });

  return (
    <FormLayout
      itemId={itemId}
      createMutation={createItem}
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
          itemForm.handleSubmit();
        }}
      >
        <div className="flex items-center justify-center gap-4">
          <h1>
            {mode.charAt(0).toUpperCase() + mode.slice(1) + ' ' + categoryName}
          </h1>
        </div>
        <Divider />
        <ArrowHeader2 title={categoryName + ' Information'} />
        <div className="flex w-full gap-4 lg:gap-8">
          <itemForm.Field
            name="name"
            validators={{
              onChange: ({ value }) =>
                value.length < 2
                  ? `${categoryName} name must be at least 2 characters long`
                  : undefined,
            }}
          >
            {(field) => (
              <InputField
                className="grow"
                label={categoryName + ' Name'}
                field={field}
              />
            )}
          </itemForm.Field>
          <itemForm.Field
            name="price"
            validators={{
              onChange: ({ value }) => {
                if (value < 0) {
                  return 'Price cannot be negative';
                }
                return undefined;
              },
            }}
          >
            {(field) => (
              <InputField
                className="max-w-28"
                type="number"
                label="Price"
                field={field}
              />
            )}
          </itemForm.Field>
        </div>
        <div className="flex w-full items-center gap-4 lg:gap-8">
          <RarityField form={itemForm} category={categoryName} />
          <itemForm.Field
            name="grade"
            validators={{
              onChange: ({ value }) =>
                value <= 0 ? 'Minimum grade is 1' : undefined,
            }}
          >
            {(field) => (
              <InputField
                className="w-full max-w-28"
                type="number"
                label="Grade"
                field={field}
              />
            )}
          </itemForm.Field>
        </div>
        <div className="grid w-full gap-8 max-sm:col-span-2 max-sm:grid-flow-row sm:grid-cols-2">
          <PictureField
            form={itemForm}
            sizeInfo={{ aspectRatio: '1/1', maxHeight: '', minHeight: '' }}
          />
          <itemForm.Field
            name="description"
            validators={{
              onChange: ({ value }) =>
                value.length < 2
                  ? `${categoryName} description must be at least 2 characters long`
                  : undefined,
            }}
          >
            {(field) => (
              <TextAreaField
                label={categoryName + ' Description'}
                field={field}
              />
            )}
          </itemForm.Field>
        </div>
        <StatFields
          form={itemForm}
          category={category}
          categoryName={categoryName}
        />
        <div className="flex flex-col gap-4">
          <KeywordLinkField form={itemForm} keywordType="weapon" />
          <Divider />
          <WeaponLinkField form={itemForm} weaponList={weapons} />
          <Divider />
          <ArmorLinkField form={itemForm} armorList={armors} />
          <Divider />
          <ActionLinkField form={itemForm} />
          <Divider />
        </div>
        <BtnRect
          ariaLabel={mode.charAt(0).toUpperCase() + mode.slice(1)}
          type="submit"
          className="group w-full"
        >
          {createItem.isPending ? (
            <Loading
              className="group-hover:text-yellow-300 dark:text-gray-900"
              size={1.15}
            />
          ) : (
            mode.charAt(0).toUpperCase() + mode.slice(1)
          )}
        </BtnRect>
      </form>
    </FormLayout>
  );
};

export default ItemForm;
