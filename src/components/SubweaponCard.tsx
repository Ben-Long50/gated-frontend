import { Keyword } from 'src/types/keyword';
import Tag from './Tag';
import DamageIcon from './icons/DamageIcon';
import SalvoIcon from './icons/SalvoIcon';
import FlurryIcon from './icons/FlurryIcon';
import RangeIcon from './icons/RangeIcon';
import MagCapacityIcon from './icons/MagCapacityIcon';
import { WeaponWithKeywords } from 'src/types/weapon';
import StatCard from './StatCard';

const SubweaponCard = ({
  vehicleId,
  weapon,
  toolTip,
  setToolTip,
}: {
  vehicleId?: number;
  weapon: WeaponWithKeywords;
  quantity: number;
  toolTip: string;
  setToolTip: void;
}) => {
  return (
    <div className="flex h-full w-full grow flex-col items-start justify-between gap-4">
      <div className="flex items-center gap-4">
        <h3>{weapon?.name}</h3>
        <p className="text-error italic">
          {weapon?.vehicleId &&
            weapon.vehicleId !== vehicleId &&
            '(Currently equpped on another vehicle)'}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {weapon.keywords?.map((item: { keyword: Keyword; value?: number }) => {
          return (
            <Tag
              key={item.keyword.id}
              label={
                item.value
                  ? item.keyword?.name + ' ' + item.value
                  : item.keyword?.name
              }
              description={item.keyword.description}
              toolTip={toolTip}
              setToolTip={setToolTip}
            />
          );
        })}
      </div>
      <div className="timing col-span-2 grid h-full w-full grid-cols-[repeat(auto-fill,minmax(100px,max-content))] place-items-center gap-4">
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
      </div>
    </div>
  );
};

export default SubweaponCard;
