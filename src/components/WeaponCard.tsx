import DamageIcon from './icons/DamageIcon';
import SalvoIcon from './icons/SalvoIcon';
import FlurryIcon from './icons/FlurryIcon';
import RangeIcon from './icons/RangeIcon';
import EquipIcon from './icons/EquipIcon';
import MagCapacityIcon from './icons/MagCapacityIcon';
import ItemCard from './ItemCard';
import { WeaponWithKeywords } from 'src/types/weapon';
import StatCard from './StatCard';

const WeaponCard = ({
  weapon,
  type,
}: {
  weapon: WeaponWithKeywords;
  type: string;
}) => {
  return (
    <ItemCard item={weapon} category="weapons" type={type}>
      {weapon.stats.damage && (
        <StatCard label="DMG" stat={weapon.stats.damage}>
          <DamageIcon className="size-8" />
        </StatCard>
      )}
      {weapon.stats.salvo && (
        <StatCard label="SLV" stat={weapon.stats.salvo}>
          <SalvoIcon className="size-8" />
        </StatCard>
      )}
      {weapon.stats.flurry && (
        <StatCard label="FLR" stat={weapon.stats.flurry}>
          <FlurryIcon className="size-8" />
        </StatCard>
      )}
      {weapon.stats.range && (
        <StatCard label="RNG" stat={weapon.stats.range}>
          <RangeIcon className="size-8" />
        </StatCard>
      )}
      {weapon.stats.weight && (
        <StatCard label="WGT" stat={weapon.stats.weight}>
          <EquipIcon className="size-8" />
        </StatCard>
      )}
      {weapon.stats.magCapacity && (
        <StatCard
          label="MAG"
          stat={
            weapon.stats.magCapacity +
            ' / ' +
            (weapon.stats.magCount
              ? weapon.stats.magCapacity * (weapon.stats.magCount - 1)
              : 'X')
          }
        >
          <MagCapacityIcon className="size-8" />
        </StatCard>
      )}
    </ItemCard>
  );
};

export default WeaponCard;
