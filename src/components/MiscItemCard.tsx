import EquipIcon from './icons/EquipIcon';
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
import StatBar from './StatBar';
import { useParams } from 'react-router-dom';

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
          icon={<StackIcon className="size-8 group-hover:fill-yellow-300" />}
          mutation={editCurrentStacks}
          value={-1}
        />
      ) : null}
      {stats.maxStacks && (
        <BtnControl
          title="Refill"
          icon={<StackIcon className="size-8 group-hover:fill-yellow-300" />}
          mutation={refreshStacks}
        />
      )}
      {stats.currentPower && stats.currentPower > 0 ? (
        <BtnControl
          title="Activate"
          icon={
            <LightningIcon className="size-8 group-hover:fill-yellow-300" />
          }
          mutation={editCurrentPower}
          value={-1}
        />
      ) : null}
      {stats.power && (
        <BtnControl
          title="Recharge"
          icon={<PowerIcon className="size-8 group-hover:fill-yellow-300" />}
          mutation={refreshPower}
        />
      )}
    </div>
  );
};

const MiscItemCard = ({ item, mode }: { item: Item; mode: string }) => {
  return (
    <ItemCard
      item={item}
      category="items"
      mode={mode}
      controls={<ItemControls itemId={item.id} stats={item.stats} />}
    >
      <MiscItemStatBars stats={item.stats} mode={mode} />
    </ItemCard>
  );
};

export const MiscItemStatBars = ({
  stats,
  mode,
}: {
  stats: ItemStats;
  mode?: string;
}) => {
  return (
    <>
      {mode === 'equipment'
        ? stats.power &&
          stats.currentPower !== undefined && (
            <StatBar
              title="PWR"
              total={stats.power}
              current={stats.currentPower}
              color="rgb(107, 255, 124)"
            >
              <LightningIcon className="size-8" />
            </StatBar>
          )
        : stats.power && (
            <StatBar
              title="PWR"
              current={stats.power}
              color="rgb(107, 255, 124)"
            >
              <LightningIcon className="size-8" />
            </StatBar>
          )}
      {stats.weight && (
        <StatBar title="WGT" current={stats.weight} color="rgb(251 191 36)">
          <EquipIcon className="size-8" />
        </StatBar>
      )}
      {stats.currentStacks ? (
        <StatBar
          title="STACKS"
          total={stats.maxStacks ? stats.maxStacks : undefined}
          current={stats.currentStacks}
          color="rgb(33, 194, 219)"
        >
          <StackIcon className="size-8" />
        </StatBar>
      ) : null}
    </>
  );
};

export default MiscItemCard;
