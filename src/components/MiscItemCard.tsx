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
    <div className="col-span-2 flex flex-wrap items-center justify-start gap-4">
      {stats.currentStacks && stats.currentStacks > 0 ? (
        <BtnControl
          title="Use"
          icon={
            <StackIcon className="text-secondary group-hover:text-accent size-8" />
          }
          mutation={editCurrentStacks}
          value={-1}
        />
      ) : null}
      {stats.maxStacks && (
        <BtnControl
          title="Refill"
          icon={
            <StackIcon className="text-secondary group-hover:text-accent size-8" />
          }
          mutation={refreshStacks}
        />
      )}
      {stats.currentPower && stats.currentPower > 0 ? (
        <BtnControl
          title="Activate"
          icon={
            <LightningIcon className="text-secondary group-hover:text-accent size-8" />
          }
          mutation={editCurrentPower}
          value={-1}
        />
      ) : null}
      {stats.power && (
        <BtnControl
          title="Recharge"
          icon={
            <PowerIcon className="text-secondary group-hover:text-accent size-8" />
          }
          mutation={refreshPower}
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
