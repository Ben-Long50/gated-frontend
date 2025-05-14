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
import SalvoIcon from './icons/SalvoIcon';
import { ItemObject } from 'src/types/global';

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
    <div className="col-span-2 grid grid-cols-1 items-center justify-start gap-2 sm:grid-cols-2 sm:gap-4">
      {stats.currentAmmoCount !== undefined && (
        <BtnControl
          title="Single Shot"
          icon={<DamageIcon className="size-8 text-inherit" />}
          mutation={stats.currentAmmoCount > 0 ? editCurrentAmmo : null}
          value={-1}
        />
      )}
      {stats.currentAmmoCount !== undefined &&
        stats.currentMagCount !== undefined &&
        stats.magCapacity !== undefined && (
          <BtnControl
            title="Reload"
            icon={<MagCapacityIcon className="size-8 text-inherit" />}
            mutation={
              stats.currentMagCount > 0 &&
              stats.currentAmmoCount < stats.magCapacity
                ? reloadAmmo
                : null
            }
          />
        )}
      {stats.currentAmmoCount !== undefined && stats.salvo !== undefined && (
        <BtnControl
          title="Salvo"
          icon={<SalvoIcon className="size-8 text-inherit" />}
          mutation={
            stats.currentAmmoCount >= stats.salvo ? editCurrentAmmo : null
          }
          value={-stats.salvo}
        />
      )}
      {stats.currentAmmoCount !== undefined &&
        stats.currentMagCount !== undefined &&
        stats.magCapacity !== undefined &&
        stats.magCount !== undefined && (
          <BtnControl
            title="Refresh"
            icon={<SpareAmmoIcon className="size-8 text-inherit" />}
            mutation={
              stats.currentAmmoCount < stats.magCapacity ||
              stats.currentMagCount < stats.magCount - 1
                ? refreshAmmo
                : null
            }
          />
        )}
    </div>
  );
};

const WeaponCard = ({
  weapon,
  mode,
  ownerId,
  toggleFormLink,
}: {
  weapon: WeaponWithKeywords;
  mode?: string;
  ownerId?: number;
  toggleFormLink?: (weaponId: ItemObject) => void;
}) => {
  const { user } = useContext(AuthContext);

  return (
    <ItemCard
      item={weapon}
      category="weapons"
      mode={mode}
      controls={
        ownerId === user?.id ? (
          <WeaponControls stats={weapon.stats} weaponId={weapon.id} />
        ) : null
      }
      toggleFormLink={toggleFormLink}
    />
  );
};

export const WeaponCardMobile = ({
  weapon,
  mode,
  ownerId,
  toggleFormLink,
}: {
  weapon: WeaponWithKeywords;
  mode: string;
  ownerId?: number;
  toggleFormLink?: (weaponId: ItemObject) => void;
}) => {
  const { user } = useContext(AuthContext);

  return (
    <ItemCardMobile
      item={weapon}
      category="weapons"
      mode={mode}
      controls={
        ownerId === user?.id ? (
          <WeaponControls stats={weapon.stats} weaponId={weapon.id} />
        ) : null
      }
      toggleFormLink={toggleFormLink}
    />
  );
};

export default WeaponCard;
