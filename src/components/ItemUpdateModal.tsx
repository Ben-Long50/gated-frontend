import { Item } from 'src/types/item';
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

  const { data: baseItem, isLoading } = useItemQuery(
    apiUrl,
    Number(item.baseItemId),
    'weapon',
  );

  if (!baseItem) return;

  if (isLoading) return <Loading />;

  return (
    <Modal modalOpen={updateMode} toggleModal={toggleUpdateMode}>
      <h1 className="text-center">{`Update your "${item.name}"`}</h1>
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
      <ArrowHeader2 title="Base Stats" className="self-start" />
      <div className="flex w-full flex-col gap-4 border-x-2 border-gray-400 border-opacity-50 px-4">
        <div className="flex items-center justify-between gap-8">
          <h4>Price</h4>
          <div className="flex items-center justify-end gap-4">
            <p className="min-w-6 text-center">{item.price}</p>
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
      <BtnRect
        className="w-full"
        type="button"
        ariaLabel="Update Item"
      >{`Update ${item.name}`}</BtnRect>
    </Modal>
  );
};

export default ItemUpdateModal;
