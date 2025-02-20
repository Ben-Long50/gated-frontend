import DamageIcon from './icons/DamageIcon';
import SalvoIcon from './icons/SalvoIcon';
import FlurryIcon from './icons/FlurryIcon';
import RangeIcon from './icons/RangeIcon';
import EquipIcon from './icons/EquipIcon';
import MagCapacityIcon from './icons/MagCapacityIcon';
import ItemCard from './ItemCard';
import { WeaponStats, WeaponWithKeywords } from 'src/types/weapon';
import StatCard from './StatCard';
import BtnControl from './buttons/BtnControl';
import SpareAmmoIcon from './icons/SpareAmmoIcon';
import useEditAmmoMutation from '../hooks/weaponStatHooks/useEditAmmoMutation/useEditAmmoMutation';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import useReloadMutation from '../hooks/weaponStatHooks/useReloadAmmoMutation/useReloadAmmoMutation';
import useRefreshMutation from '../hooks/weaponStatHooks/useRefreshAmmoMutation/useRefreshAmmoMutation';

const WeaponControls = ({
  stats,
  weaponId,
}: {
  stats: WeaponStats;
  weaponId: number;
}) => {
  const { apiUrl } = useContext(AuthContext);

  const editCurrentAmmo = useEditAmmoMutation(apiUrl, weaponId);
  const reloadAmmo = useReloadMutation(apiUrl, weaponId);
  const refreshAmmo = useRefreshMutation(apiUrl, weaponId);

  return (
    <div className="col-span-2 flex w-full flex-col items-center justify-start gap-2 sm:gap-4">
      {stats.currentAmmoCount && stats.currentAmmoCount > 0 ? (
        <BtnControl
          title="Fire"
          icon={<DamageIcon className="size-8 group-hover:fill-yellow-300" />}
          mutation={
            stats.currentAmmoCount &&
            stats.currentAmmoCount > 0 &&
            editCurrentAmmo
          }
          value={-1}
        />
      ) : null}
      {stats.currentMagCount && stats.currentMagCount > 0 ? (
        <BtnControl
          title="Reload"
          icon={
            <MagCapacityIcon className="size-8 group-hover:fill-yellow-300" />
          }
          mutation={
            stats.currentMagCount && stats.currentMagCount > 0 && reloadAmmo
          }
        />
      ) : null}
      {stats.magCapacity && (
        <BtnControl
          title="Refresh"
          icon={
            <SpareAmmoIcon className="size-8 group-hover:fill-yellow-300" />
          }
          mutation={refreshAmmo}
        />
      )}
    </div>
  );
};

const WeaponCard = ({
  weapon,
  mode,
}: {
  weapon: WeaponWithKeywords;
  mode: string;
}) => {
  return (
    <ItemCard
      item={weapon}
      category="weapons"
      mode={mode}
      controls={<WeaponControls stats={weapon.stats} weaponId={weapon.id} />}
    >
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
      {mode === 'equipment'
        ? weapon.stats.currentAmmoCount !== null &&
          weapon.stats.magCapacity && (
            <StatCard
              label="MAG"
              stat={`${weapon.stats.currentAmmoCount}
             / 
            ${
              weapon.stats.currentMagCount
                ? weapon.stats.currentMagCount * weapon.stats.magCapacity
                : 'X'
            }`}
            >
              <MagCapacityIcon className="size-8" />
            </StatCard>
          )
        : weapon.stats.magCapacity && (
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
