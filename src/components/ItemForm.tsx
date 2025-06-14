import { useForm } from '@tanstack/react-form';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import BtnRect from './buttons/BtnRect';
import InputField from './InputField';
import InputSelectField from './InputSelectField';
import TextAreaField from './TextAreaField';
import Loading from './Loading';
import FormLayout from '../layouts/FormLayout';
import { useLocation, useParams } from 'react-router-dom';
import { Keyword } from 'src/types/keyword';
import ArrowHeader2 from './ArrowHeader2';
import Divider from './Divider';
import { Action } from 'src/types/action';
import ActionLinkField from './formFields/ActionLinkField';
import ArmorLinkField from './formFields/ArmorLinkField';
import ItemLinkField from './formFields/ItemLinkField';
import KeywordLinkField from './formFields/KeywordLinkField';
import { extractItemListIds, extractKeywordListIds } from '../utils/extractIds';
import useItemQuery from 'src/hooks/useItemQuery/useItemQuery';
import { Item, Stats } from 'src/types/item';
import useItems from 'src/hooks/useItems';
import PictureField from './formFields/PictureField';
import RarityField from './formFields/RarityField';
import StatFields from './formFields/StatFields';
import useCreateItemMutation from 'src/hooks/useCreateItemMutation/useCreateItemMutation';
import useDeleteItemMutation from 'src/hooks/useDeleteItemMutation/useDeleteItemMutation';
import VehicleLinkField from './formFields/VehicleLinkField';
import useCreateItemCopyMutation from 'src/hooks/useCreateItemCopyMutation/useCreateItemCopyMutation';
import { capitalCase } from 'change-case';

const ItemForm = () => {
  const { apiUrl } = useContext(AuthContext);
  const [formMessage, setFormMessage] = useState('');
  const [deleteMode, setDeleteMode] = useState(false);
  const { itemId, category } = useParams();
  const location = useLocation();
  const parts = location.pathname.split('/').filter(Boolean);
  const mode = parts[parts.length - 1];

  const { data: item } = useItemQuery(Number(itemId));

  const { filteredItems: weapons } = useItems({
    category: 'weapons',
    excludedKeywords: ['Cyber Weapon', 'Vehicle Weapon', 'Drone Weapon'],
  });

  const { filteredItems: vehicleWeapons } = useItems({
    category: 'weapons',
    excludedKeywords: ['Cyber Weapon', 'Drone Weapon'],
  });

  const { filteredItems: droneWeapons } = useItems({
    category: 'weapons',
    includedKeywords: ['Drone Weapon'],
  });

  const { filteredItems: armors } = useItems({
    category: 'armors',
    excludedKeywords: ['Cyber Armor'],
  });

  const { filteredItems: vehicles } = useItems({
    category: 'vehicles',
  });

  const createItem = useCreateItemMutation(
    apiUrl,
    category,
    setFormMessage,
    Number(itemId),
  );

  const createItemCopy = useCreateItemCopyMutation(
    apiUrl,
    category,
    Number(itemId),
    setFormMessage,
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
    return category.slice(0, -1);
  })();

  const itemForm = useForm({
    defaultValues: {
      id: item?.id || null,
      name: item?.name || '',
      itemTypes: item?.itemTypes || [categoryName.toLowerCase()],
      itemSubtypes: item?.itemSubtypes || [''],
      rarity: item?.rarity || '',
      grade: item?.grade || 1,
      picture: item?.picture || '',
      position: item?.picture?.position || { x: 50, y: 50 },
      description: item?.description || '',
      price: item?.price || '',
      stats: {
        damage: item?.stats?.damage || '',
        salvo: item?.stats?.salvo || '',
        flurry: item?.stats?.flurry || '',
        range: item?.stats?.range || '',
        magCapacity: item?.stats?.magCapacity || '',
        currentAmmoCount: item?.stats?.currentAmmoCount || '',
        magCount: item?.stats?.magCount || '',
        currentMagCount: item?.stats?.currentMagCount || '',
        weight: item?.stats?.weight || '',
        ward: item?.stats?.ward || '',
        block: item?.stats?.block || '',
        currentBlock: item?.stats?.currentBlock || '',
        power: item?.stats?.power || '',
        currentPower: item?.stats?.currentPower || '',
        cyber: item?.stats?.cyber || '',
        size: item?.stats?.size || '',
        speed: item?.stats?.speed || '',
        agility: item?.stats?.agility || '',
        hull: item?.stats?.hull || '',
        currentHull: item?.stats?.currentHull || '',
        armor: item?.stats?.armor || '',
        cargo: item?.stats?.cargo || '',
        currentCargo: item?.stats?.currentCargo || '',
        pass: item?.stats?.pass || '',
        currentPass: item?.stats?.currentPass || '',
        turret: item?.stats?.turret || '',
        weapon: item?.stats?.weapon || '',
        wyrmMoldSlots: item?.stats?.wyrmMoldSlots || '',
        wyrmMoldPoints: item?.stats?.wyrmMoldPoints || '',
        esotericCharges: item?.stats?.esotericCharges || '',
      } as Stats,
      weapons:
        item?.itemLinkReference?.items.filter((item: Item) =>
          item.itemTypes.includes('weapon'),
        ) || ([] as Item[]),
      armor:
        item?.itemLinkReference?.items.filter((item: Item) =>
          item.itemTypes.includes('armor'),
        ) || ([] as Item[]),
      vehicles:
        item?.itemLinkReference?.items.filter((item: Item) =>
          item.itemTypes.includes('vehicle'),
        ) || ([] as Item[]),
      actions: item?.itemLinkReference?.actions || ([] as Action[]),
      keywords:
        item?.keywords || ([] as { keyword: Keyword; value: number | null }[]),
      augmentationType: '',
    },
    onSubmit: async ({ value }) => {
      value.stats.currentAmmoCount = value.stats.magCapacity;
      value.stats.currentMagCount = value.stats.magCount
        ? value.stats.magCount - 1
        : 0;

      value.stats.currentPower = value.stats.power
        ? value.stats.power
        : undefined;

      value.stats.currentHull = value.stats.hull ? value.stats.hull : undefined;

      const filteredStats = Object.fromEntries(
        Object.entries(value.stats).filter(([_, val]) => val),
      );

      if (filteredStats.cargo) {
        filteredStats.currentCargo = 0;
      }

      if (filteredStats.pass) {
        filteredStats.currentPass = 0;
      }

      value.stats = { ...filteredStats };

      const {
        weapons,
        armor,
        vehicles,
        actions,
        keywords,
        augmentationType,
        ...rest
      } = value;

      const data = {
        ...rest,
        itemIds: extractItemListIds([
          ...value.weapons,
          ...value.armor,
          ...value.vehicles,
        ]),
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
      modifyMutation={createItemCopy}
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
          <h1>{capitalCase(mode) + ' ' + capitalCase(categoryName)}</h1>
        </div>
        <Divider />
        <ArrowHeader2 title={capitalCase(categoryName) + ' Information'} />
        <div className="flex w-full gap-4 lg:gap-8">
          <itemForm.Field
            name="name"
            validators={{
              onChange: ({ value }) =>
                value.length < 2
                  ? `${capitalCase(categoryName)} name must be at least 2 characters long`
                  : undefined,
            }}
          >
            {(field) => (
              <InputField
                className="grow"
                label={capitalCase(categoryName) + ' Name'}
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
        {category === 'augmentations' && (
          <div className="flex w-full flex-col items-center gap-4 sm:flex-row lg:gap-8">
            <itemForm.Field name="augmentationType">
              {(field) => (
                <InputSelectField
                  label="Augmentation Type"
                  field={field}
                  options={['offensive', 'defensive', 'function']}
                  onChange={(value) => {
                    if (value === 'offensive') {
                      itemForm.setFieldValue('itemTypes', [
                        categoryName.toLowerCase(),
                        'weapon',
                      ]);
                    } else if (value === 'defensive') {
                      itemForm.setFieldValue('itemTypes', [
                        categoryName.toLowerCase(),
                        'armor',
                      ]);
                    } else {
                      itemForm.setFieldValue('itemTypes', [
                        categoryName.toLowerCase(),
                      ]);
                    }
                  }}
                />
              )}
            </itemForm.Field>
            <itemForm.Field name="itemSubtypes" mode="array">
              {(field) =>
                field.state.value.map((_, i) => (
                  <itemForm.Field key={i} name={`itemSubtypes[${i}]`}>
                    {(subfield) => (
                      <InputSelectField
                        label="Augmentation Type"
                        field={subfield}
                        options={['cybernetic', 'mutation']}
                      />
                    )}
                  </itemForm.Field>
                ))
              }
            </itemForm.Field>
          </div>
        )}
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
                  ? `${capitalCase(categoryName)} description must be at least 2 characters long`
                  : undefined,
            }}
          >
            {(field) => (
              <TextAreaField
                label={capitalCase(categoryName) + ' Description'}
                field={field}
              />
            )}
          </itemForm.Field>
        </div>
        <itemForm.Subscribe selector={(state) => state.values.itemTypes}>
          {(itemTypes) => (
            <StatFields
              form={itemForm}
              categories={itemTypes}
              categoryName={categoryName}
            />
          )}
        </itemForm.Subscribe>
        <itemForm.Subscribe selector={(state) => state.values.itemTypes}>
          {(itemTypes) => (
            <div className="flex flex-col gap-4">
              <Divider />
              <KeywordLinkField form={itemForm} />
              <Divider />
              {itemTypes.includes('weapon') && (
                <>
                  <ItemLinkField form={itemForm} category="weapons" />
                  <Divider />
                </>
              )}
              {itemTypes.includes('armor') && (
                <>
                  <ItemLinkField form={itemForm} category="armors" />
                  <Divider />
                </>
              )}
              {itemTypes.includes('vehicle') && (
                <>
                  <ItemLinkField form={itemForm} category="weapons" />
                  <Divider />
                  <ItemLinkField form={itemForm} category="vehicles" />
                  <Divider />
                </>
              )}
              {itemTypes.includes('drone') && (
                <>
                  <ItemLinkField form={itemForm} category="weapons" />
                  <Divider />
                </>
              )}
              <ActionLinkField form={itemForm} />
              <Divider />
            </div>
          )}
        </itemForm.Subscribe>
        <BtnRect
          ariaLabel={capitalCase(mode)}
          type="submit"
          className="group w-full"
        >
          {createItem.isPending ? (
            <Loading
              className="group-hover:text-accent dark:text-gray-900"
              size={1.15}
            />
          ) : (
            capitalCase(mode)
          )}
        </BtnRect>
        {itemId && item?.baseItemId === null && (
          <BtnRect
            type="button"
            className="group w-full"
            ariaLabel="Create item copy"
            onClick={(e) => {
              e.preventDefault();
              createItemCopy.mutate();
            }}
          >
            {createItemCopy.isPending ? (
              <Loading
                className="group-hover:text-accent dark:text-gray-900"
                size={1.15}
              />
            ) : (
              'Create Item Copy'
            )}
          </BtnRect>
        )}
      </form>
    </FormLayout>
  );
};

export default ItemForm;
