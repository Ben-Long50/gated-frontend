import ArmorIcon from './icons/ArmorIcon';
import WardIcon from './icons/WardIcon';
import BlockIcon from './icons/BlockIcon';
import EquipIcon from './icons/EquipIcon';
import ItemCard from './ItemCard';
import { ArmorWithKeywords } from 'src/types/armor';
import StatCard from './StatCard';
import LightningIcon from './icons/LightningIcon';

const ArmorCard = ({
  armor,
  mode,
}: {
  armor: ArmorWithKeywords;
  mode: string;
}) => {
  return (
    <ItemCard item={armor} category="armor" mode={mode}>
      {armor.stats.armor && (
        <StatCard label="AV" stat={armor.stats.armor}>
          <ArmorIcon className="size-8" />
        </StatCard>
      )}
      {armor.stats.ward && (
        <StatCard label="WV" stat={armor.stats.ward}>
          <WardIcon className="size-8" />
        </StatCard>
      )}
      {armor.stats.block && (
        <StatCard label="BP" stat={armor.stats.block}>
          <BlockIcon className="size-8" />
        </StatCard>
      )}
      {armor.stats.power && (
        <StatCard label="PWR" stat={armor.stats.power}>
          <LightningIcon className="size-8" />
        </StatCard>
      )}
      {armor.stats.weight && (
        <StatCard label="WGT" stat={armor.stats.weight}>
          <EquipIcon className="size-8" />
        </StatCard>
      )}
    </ItemCard>
  );
};

export default ArmorCard;
