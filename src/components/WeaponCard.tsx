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
import StatBar from './StatBar';
import { useParams } from 'react-router-dom';

const WeaponControls = ({
  stats,
  weaponId,
}: {
  stats: WeaponStats;
  weaponId: number;
}) => {
  const { apiUrl } = useContext(AuthContext);
  const { characterId } = useParams();

  const editCurrentAmmo = useEditAmmoMutation(
    apiUrl,
    weaponId,
    Number(characterId),
  );
  const reloadAmmo = useReloadMutation(apiUrl, weaponId, Number(characterId));
  const refreshAmmo = useRefreshMutation(apiUrl, weaponId, Number(characterId));

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
      <WeaponStatBars stats={weapon.stats} mode={mode} />
    </ItemCard>
  );
};

export const WeaponStatBars = ({
  stats,
  mode,
}: {
  stats: WeaponStats;
  mode?: string;
}) => {
  return (
    <>
      {stats.damage && (
        <StatBar title="DMG" current={stats.damage} color="rgb(252, 91, 50)">
          <DamageIcon className="size-8" />
        </StatBar>
      )}
      {stats.salvo && (
        <StatBar title="SLV" current={stats.salvo} color="rgb(219, 123, 33)">
          <SalvoIcon className="size-8" />
        </StatBar>
      )}
      {stats.flurry && (
        <StatBar title="FLR" current={stats.flurry} color="rgb(219, 123, 33)">
          <FlurryIcon className="size-8" />
        </StatBar>
      )}
      {stats.range && (
        <StatBar
          title="RNG"
          current={stats.range}
          divider={5}
          color="rgb(33, 194, 219)"
        >
          <RangeIcon className="size-8" />
        </StatBar>
      )}
      {stats.weight && (
        <StatBar title="WGT" current={stats.weight} color="rgb(251 191 36)">
          <EquipIcon className="size-8" />
        </StatBar>
      )}
      {mode === 'equipment'
        ? stats.currentAmmoCount !== undefined &&
          stats.magCapacity && (
            <StatBar
              title="MAG"
              total={stats.magCapacity}
              current={stats.currentAmmoCount}
              color="rgb(107, 255, 124)"
            >
              <MagCapacityIcon className="size-8" />
            </StatBar>
          )
        : stats.magCapacity && (
            <StatBar
              title="MAG"
              total={stats.magCapacity}
              current={stats.magCapacity}
              color="rgb(107, 255, 124)"
            >
              <MagCapacityIcon className="size-8" />
            </StatBar>
          )}
    </>
  );
};

export default WeaponCard;
