import { Item, Stats } from 'src/types/item';
import Modal from './Modal';
import { mdiTriangleDown } from '@mdi/js';
import Icon from '@mdi/react';
import BtnRect from './buttons/BtnRect';
import KeywordList from './KeywordList';
import ArrowHeader2 from './ArrowHeader2';
import Divider from './Divider';
import useItemQuery from 'src/hooks/useItemQuery/useItemQuery';
import { useContext } from 'react';
import { AuthContext } from 'src/contexts/AuthContext';
import Loading from './Loading';
import ItemPicture from './ItemPicture';
import useItemUpdateMutation from 'src/hooks/useItemUpdateMutation/useItemUpdateMutation';
import { useForm } from '@tanstack/react-form';
import { useParams } from 'react-router-dom';
import { extractKeywordListIds } from '../utils/extractIds';
import ArrowHeader4 from './ArrowHeader4';

const ItemUpdateModal = ({
  item,
  updateMode,
  toggleUpdateMode,
}: {
  item: Item;
  updateMode: boolean;
  toggleUpdateMode: () => void;
}) => {
  const { apiUrl } = useContext(AuthContext);
  const { characterId } = useParams();
  const parts = location.pathname.split('/').filter(Boolean);
  const category = parts[parts.length - 2];

  const { data: baseItem, isLoading } = useItemQuery(
    apiUrl,
    Number(item.baseItemId),
    category,
  );

  const updateItem = useItemUpdateMutation(
    apiUrl,
    category,
    Number(item.id),
    Number(characterId),
    toggleUpdateMode,
  );

  const itemUpdateForm = useForm({
    defaultValues: {
      id: item?.id || null,
      name: baseItem?.name || null,
      description: baseItem?.description || null,
      picture: baseItem?.picture
        ? {
            imageUrl: baseItem?.picture.imageUrl,
            publicId: baseItem?.picture.publicId,
          }
        : null,
      position: baseItem?.picture?.position || null,
      price: baseItem?.price || null,
      stats: {
        damage: baseItem?.stats.damage || '',
        salvo: baseItem?.stats.salvo || '',
        flurry: baseItem?.stats.flurry || '',
        range: baseItem?.stats.range || '',
        magCapacity: baseItem?.stats.magCapacity || '',
        currentAmmoCount: baseItem?.stats.currentAmmoCount || '',
        magCount: baseItem?.stats.magCount || '',
        currentMagCount: baseItem?.stats.currentMagCount || '',
        weight: baseItem?.stats.weight || '',
        ward: baseItem?.stats.ward || '',
        block: baseItem?.stats.block || '',
        currentBlock: baseItem?.stats.currentBlock || '',
        power: baseItem?.stats.power || '',
        currentPower: item?.stats.currentPower || '',
        cyber: baseItem?.stats.cyber || '',
        size: baseItem?.stats?.size || '',
        speed: baseItem?.stats?.speed || '',
        agility: baseItem?.stats?.agility || '',
        hull: baseItem?.stats?.hull || '',
        currentHull: baseItem?.stats?.currentHull || '',
        armor: baseItem?.stats?.armor || '',
        cargo: baseItem?.stats?.cargo || '',
        currentCargo: baseItem?.stats?.currentCargo || '',
        hangar: baseItem?.stats?.hangar || '',
        currentHangar: baseItem?.stats?.currentHangar || '',
        pass: baseItem?.stats?.pass || '',
        currentPass: baseItem?.stats?.currentPass || '',
        weapon: baseItem?.stats?.weapon || '',
        currentWeapon: baseItem?.stats?.currentWeapon || '',
      } as Stats | null,
      keywords: baseItem?.keywords || null,
    },

    onSubmit: async ({ value }) => {
      const filteredStats = value.stats
        ? Object.fromEntries(
            Object.entries(value.stats).filter(([_, val]) => val),
          )
        : null;

      value.stats = filteredStats ? { ...filteredStats } : null;

      const { keywords, ...rest } = value;

      const data = Object.fromEntries(
        Object.entries({
          ...rest,
          keywordIds: value.keywords
            ? extractKeywordListIds(value.keywords)
            : null,
        }).filter(([_, val]) => val),
      );

      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (key === 'picture' && value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, JSON.stringify(value));
        }
      });
      await updateItem.mutate(formData);
    },
  });

  if (!baseItem) return;

  if (isLoading) return <Loading />;

  return (
    <Modal modalOpen={updateMode} toggleModal={toggleUpdateMode}>
      <h1 className="text-center">{`Update your ${item.name}`}</h1>
      <p>
        Since purchase and/or upgrade of your {item.name}, the base weapon (
        {baseItem?.name}) has been updated. Reasons for update include balancing
        changes like base stat adjustments, description/name changes and unique
        action changes. If you wish to update your weapon to the newest codex
        version, confirm the update by clicking the "Update" button below.
        <br />
        <br />
        Grade level upgrades and stat points/traits purchased with them will be
        preserved. Only changes to the base stats will be applied if applicable.
        We highly recommend updating the item stats as the codex items are
        constantly being adjusted to promote balanced and immersive gameplay. A
        preview displaying the base stat differences is shown below.
      </p>
      <Divider />
      <ArrowHeader2 title="Updated Item Information" className="self-start" />
      <div className="grid grid-cols-2 gap-8">
        <ItemPicture item={item} />
        <div className="flex flex-col items-start gap-4">
          <ArrowHeader4 title="Name" />
          <p className="w-full border-x-2 border-gray-400 border-opacity-50 px-4">
            {baseItem.name}
          </p>
          <ArrowHeader4 title="Description" />
          <p className="w-full border-x-2 border-gray-400 border-opacity-50 px-4">
            {baseItem.description}
          </p>
        </div>
      </div>
      <Divider />
      <ArrowHeader2 title="Base Stats" className="self-start" />
      <div className="flex w-full flex-col gap-4 border-x-2 border-gray-400 border-opacity-50 px-4">
        <div className="flex items-center justify-between gap-8">
          <h4>Price</h4>
          <div className="flex items-center justify-end gap-4">
            <p className="min-w-6 text-center">{baseItem.price}</p>
            <Icon
              className="text-secondary"
              path={mdiTriangleDown}
              size={0.375}
              rotate={-90}
            />
            <p
              className={`${item?.price > baseItem?.price && '!text-green-400'} ${item?.price < baseItem?.price && 'text-error'} min-w-6 text-center`}
            >
              {baseItem.price}
            </p>
          </div>
        </div>
        {Object.entries(item.stats).map(([stat, value]) => {
          const newValue = baseItem?.stats[stat] ? baseItem?.stats[stat] : 0;
          const difference = newValue - value;

          return (
            <div key={stat} className="flex items-center justify-between gap-8">
              <h4>{stat}</h4>
              <div className="flex items-center justify-end gap-4">
                <p className="min-w-6 text-center">{value}</p>
                <Icon
                  className="text-secondary"
                  path={mdiTriangleDown}
                  size={0.375}
                  rotate={-90}
                />
                <p
                  className={`${difference > 0 && '!text-green-400'} ${difference < 0 && 'text-error'} min-w-6 text-center`}
                >
                  {newValue}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <Divider />
      <div className="flex flex-col gap-8">
        <KeywordList
          className="flex flex-col gap-4"
          title="Current Base Traits"
          item={item}
        />
        <KeywordList
          className="flex flex-col gap-4"
          title="Updated Base Traits"
          item={baseItem}
        />
      </div>
      <Divider />
      <div className="flex w-full flex-col gap-4">
        <ArrowHeader2 title="Update Options" className="self-start" />
        <p>
          Select which options you want to update. If you've changed the name,
          description or picture of your item for flavor purposes, we recommend
          unchecking those options to preserve your changes. Stat and Trait
          updates are always recommended.
        </p>
        <div className="flex flex-col gap-4 border-x-2 border-gray-400 border-opacity-50 px-4">
          <itemUpdateForm.Field name="name">
            {(field) => (
              <div className="flex items-center justify-between">
                <h4>Name</h4>
                <input
                  className="size-6"
                  type="checkbox"
                  checked={!!field.state.value}
                  onChange={(e) => {
                    e.stopPropagation();
                    if (field.state.value) {
                      field.handleChange(null);
                    } else {
                      field.handleChange(baseItem.name);
                    }
                  }}
                />
              </div>
            )}
          </itemUpdateForm.Field>
          <itemUpdateForm.Field name="description">
            {(field) => (
              <div className="flex items-center justify-between">
                <h4>Description</h4>
                <input
                  className="size-6"
                  type="checkbox"
                  checked={!!field.state.value}
                  onChange={(e) => {
                    e.stopPropagation();
                    if (field.state.value) {
                      field.handleChange(null);
                    } else {
                      field.handleChange(baseItem.description);
                    }
                  }}
                />
              </div>
            )}
          </itemUpdateForm.Field>
          <itemUpdateForm.Field name="picture">
            {(field) => (
              <div className="flex items-center justify-between">
                <h4>Picture</h4>
                <input
                  className="size-6"
                  type="checkbox"
                  checked={!!field.state.value}
                  onChange={(e) => {
                    e.stopPropagation();
                    if (field.state.value) {
                      field.handleChange(null);
                    } else {
                      field.handleChange(baseItem.picture);
                    }
                  }}
                />
              </div>
            )}
          </itemUpdateForm.Field>
          <itemUpdateForm.Field name="price">
            {(field) => (
              <div className="flex items-center justify-between">
                <h4>Price</h4>
                <input
                  className="size-6"
                  type="checkbox"
                  checked={!!field.state.value}
                  onChange={(e) => {
                    e.stopPropagation();
                    if (field.state.value) {
                      field.handleChange(null);
                    } else {
                      field.handleChange(baseItem.price);
                    }
                  }}
                />
              </div>
            )}
          </itemUpdateForm.Field>
          <itemUpdateForm.Field name="stats">
            {(field) => (
              <div className="flex items-center justify-between">
                <h4>Stats</h4>
                <input
                  className="size-6"
                  type="checkbox"
                  checked={!!field.state.value}
                  onChange={(e) => {
                    e.stopPropagation();
                    if (field.state.value) {
                      field.handleChange(null);
                    } else {
                      field.handleChange(baseItem.stats);
                    }
                  }}
                />
              </div>
            )}
          </itemUpdateForm.Field>
          <itemUpdateForm.Field name="keywords">
            {(field) => (
              <div className="flex items-center justify-between">
                <h4>Traits</h4>
                <input
                  className="size-6"
                  type="checkbox"
                  checked={!!field.state.value}
                  onChange={(e) => {
                    e.stopPropagation();
                    if (field.state.value) {
                      field.handleChange(null);
                    } else {
                      field.handleChange(baseItem.keywords);
                    }
                  }}
                />
              </div>
            )}
          </itemUpdateForm.Field>
        </div>
      </div>
      <BtnRect
        className="w-full"
        type="button"
        ariaLabel="Update Item"
        onClick={() => {
          itemUpdateForm.handleSubmit();
        }}
      >{`Update ${item.name}`}</BtnRect>
    </Modal>
  );
};

export default ItemUpdateModal;
