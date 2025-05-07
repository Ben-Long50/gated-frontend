import ItemCard from './ItemCard';
import LightningIcon from './icons/LightningIcon';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import BtnControl from './buttons/BtnControl';
import PowerIcon from './icons/PowerIcon';
import { Item, ItemStats } from 'src/types/item';
import StackIcon from './icons/StackIcon';
import useEditItemPowerMutation from '../hooks/itemStatHooks/useEditItemPowerMutation/useEditItemPowerMutation';
import useEditItemStacksMutation from '../hooks/itemStatHooks/useEditItemStacksMutation/useEditItemStacksMutation';
import useRefreshItemPowerMutation from '../hooks/itemStatHooks/useRefreshItemPowerMutation/useRefreshItemPowerMutation';
import useRefreshItemStacksMutation from '../hooks/itemStatHooks/useRefreshItemStacksMutation/useRefreshItemStacksMutation';
import { useParams } from 'react-router-dom';
import ItemCardMobile from './ItemCardMobile';

const ItemControls = ({
  itemId,
  stats,
}: {
  itemId: number;
  stats: ItemStats;
}) => {
  const { apiUrl } = useContext(AuthContext);
  const { characterId } = useParams();

  const editCurrentPower = useEditItemPowerMutation(
    apiUrl,
    itemId,
    Number(characterId),
  );
  const editCurrentStacks = useEditItemStacksMutation(
    apiUrl,
    itemId,
    Number(characterId),
  );
  const refreshPower = useRefreshItemPowerMutation(
    apiUrl,
    itemId,
    Number(characterId),
  );
  const refreshStacks = useRefreshItemStacksMutation(
    apiUrl,
    itemId,
    Number(characterId),
  );

  return (
    <div className="col-span-2 grid grid-cols-1 items-center justify-start gap-4 sm:grid-cols-2">
      {stats.currentPower !== undefined && (
        <BtnControl
          title="Activate"
          icon={<LightningIcon className="size-8 text-inherit" />}
          mutation={stats.currentPower > 0 ? editCurrentPower : null}
          value={-1}
        />
      )}
      {stats.currentPower !== undefined && stats.power !== undefined && (
        <BtnControl
          title="Recharge"
          icon={<PowerIcon className="size-8 text-inherit" />}
          mutation={stats.currentPower < stats.power ? refreshPower : null}
        />
      )}
    </div>
  );
};

const MiscItemCard = ({
  item,
  mode,
  ownerId,
}: {
  item: Item;
  mode: string;
  ownerId?: number;
}) => {
  const { user } = useContext(AuthContext);

  return (
    <ItemCard
      item={item}
      category="items"
      mode={mode}
      controls={
        ownerId === user?.id ? (
          <ItemControls itemId={item.id} stats={item.stats} />
        ) : null
      }
    />
  );
};

export const MiscItemCardMobile = ({
  item,
  mode,
  ownerId,
}: {
  item: Item;
  mode: string;
  ownerId?: number;
}) => {
  const { user } = useContext(AuthContext);

  return (
    <ItemCardMobile
      item={item}
      category="items"
      mode={mode}
      controls={
        ownerId === user?.id ? (
          <ItemControls itemId={item.id} stats={item.stats} />
        ) : null
      }
    />
  );
};

export default MiscItemCard;
