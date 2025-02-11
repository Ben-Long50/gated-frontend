import EquipIcon from './icons/EquipIcon';
import ItemCard from './ItemCard';
import StatCard from './StatCard';
import LightningIcon from './icons/LightningIcon';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import BtnControl from './buttons/BtnControl';
import PowerIcon from './icons/PowerIcon';
import { Modifier } from 'src/types/modifier';
import ModifierTag from './ModifierTag';
import { Item, ItemStats } from 'src/types/item';
import StackIcon from './icons/StackIcon';
import useEditItemPowerMutation from '../hooks/itemStatHooks/useEditItemPowerMutation/useEditItemPowerMutation';
import useEditItemStacksMutation from '../hooks/itemStatHooks/useEditItemStacksMutation/useEditItemStacksMutation';
import useRefreshItemPowerMutation from '../hooks/itemStatHooks/useRefreshItemPowerMutation/useRefreshItemPowerMutation';
import useRefreshItemStacksMutation from '../hooks/itemStatHooks/useRefreshItemStacksMutation/useRefreshItemStacksMutation';

const ItemControls = ({
  itemId,
  stats,
}: {
  itemId: number;
  stats: ItemStats;
}) => {
  const { apiUrl } = useContext(AuthContext);

  const editCurrentPower = useEditItemPowerMutation(apiUrl, itemId);
  const editCurrentStacks = useEditItemStacksMutation(apiUrl, itemId);
  const refreshPower = useRefreshItemPowerMutation(apiUrl, itemId);
  const refreshStacks = useRefreshItemStacksMutation(apiUrl, itemId);

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
      {mode === 'equipment'
        ? item.stats.power &&
          item.stats.currentPower !== null && (
            <StatCard
              label="PWR"
              stat={`${item.stats.currentPower} / ${item.stats.power}`}
            >
              <LightningIcon className="size-8" />
            </StatCard>
          )
        : item.stats.power && (
            <StatCard label="PWR" stat={item.stats.power}>
              <LightningIcon className="size-8" />
            </StatCard>
          )}
      {item.stats.weight && (
        <StatCard
          label="WGT"
          stat={
            item.stats.currentStacks
              ? item.stats.currentStacks * item.stats.weight
              : item.stats.weight
          }
        >
          <EquipIcon className="size-8" />
        </StatCard>
      )}
      {item.stats.currentStacks && (
        <StatCard
          label="STACKS"
          stat={
            item.stats.maxStacks
              ? `${item.stats.currentStacks} / ${item.stats.maxStacks}`
              : item.stats.currentStacks
          }
        >
          <StackIcon className="size-8" />
        </StatCard>
      )}
      {item.modifiers?.length > 0 && (
        <>
          {item.modifiers?.map((modifier: Modifier, index: number) => (
            <ModifierTag key={index} modifier={modifier} />
          ))}
        </>
      )}
    </ItemCard>
  );
};

export default MiscItemCard;
