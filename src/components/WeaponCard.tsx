import DamageIcon from './icons/DamageIcon';
import MagCapacityIcon from './icons/MagCapacityIcon';
import ItemCard from './ItemCard';
import { WeaponStats, WeaponWithKeywords } from 'src/types/weapon';
import BtnControl from './buttons/BtnControl';
import SpareAmmoIcon from './icons/SpareAmmoIcon';
import useEditAmmoMutation from '../hooks/weaponStatHooks/useEditAmmoMutation/useEditAmmoMutation';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import useReloadMutation from '../hooks/weaponStatHooks/useReloadAmmoMutation/useReloadAmmoMutation';
import useRefreshMutation from '../hooks/weaponStatHooks/useRefreshAmmoMutation/useRefreshAmmoMutation';
import { useParams } from 'react-router-dom';
import ItemCardMobile from './ItemCardMobile';
import StatBars from './StatBars';
import SalvoIcon from './icons/SalvoIcon';

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
          title="Single Shot"
          icon={<DamageIcon className="size-8 text-inherit" />}
          mutation={
            stats.currentAmmoCount &&
            stats.currentAmmoCount > 0 &&
            editCurrentAmmo
          }
          value={-1}
        />
      ) : null}
      {stats.currentAmmoCount && stats.currentAmmoCount > stats.salvo ? (
        <BtnControl
          title="Salvo"
          icon={<SalvoIcon className="size-8 text-inherit" />}
          mutation={
            stats.currentAmmoCount &&
            stats.currentAmmoCount > 0 &&
            editCurrentAmmo
          }
          value={-stats.salvo}
        />
      ) : null}
      {stats.currentMagCount && stats.currentMagCount > 0 ? (
        <BtnControl
          title="Reload"
          icon={<MagCapacityIcon className="size-8 text-inherit" />}
          mutation={
            stats.currentMagCount && stats.currentMagCount > 0 && reloadAmmo
          }
        />
      ) : null}
      {stats.magCapacity && (
        <BtnControl
          title="Refresh"
          icon={<SpareAmmoIcon className="size-8 text-inherit" />}
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
      <StatBars stats={weapon.stats} mode={mode} />
    </ItemCard>
  );
};

export const WeaponCardMobile = ({
  weapon,
  mode,
}: {
  weapon: WeaponWithKeywords;
  mode: string;
}) => {
  return (
    <ItemCardMobile
      item={weapon}
      category="weapons"
      mode={mode}
      controls={<WeaponControls stats={weapon.stats} weaponId={weapon.id} />}
    >
      <StatBars stats={weapon.stats} mode={mode} />
    </ItemCardMobile>
  );
};

export default WeaponCard;
