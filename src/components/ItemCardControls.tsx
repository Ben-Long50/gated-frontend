import { WeaponStats } from 'src/types/weapon';
import BtnControl from './buttons/BtnControl';
import { useContext } from 'react';
import { AuthContext } from 'src/contexts/AuthContext';
import { useParams } from 'react-router-dom';
import useEditAmmoMutation from 'src/hooks/itemStatHooks/useEditAmmoMutation/useEditAmmoMutation';
import useReloadAmmoMutation from 'src/hooks/itemStatHooks/useReloadAmmoMutation/useReloadAmmoMutation';
import useRefreshAmmoMutation from 'src/hooks/itemStatHooks/useRefreshAmmoMutation/useRefreshAmmoMutation';
import useEditBlockMutation from 'src/hooks/itemStatHooks/useEditBlockMutation/useEditBlockMutation';
import useEditHullMutation from 'src/hooks/itemStatHooks/useEditHullMutation/useEditHullMutation';
import useEditCargoMutation from 'src/hooks/itemStatHooks/useEditCargoMutation/useEditCargoMutation';
import useEditPassMutation from 'src/hooks/itemStatHooks/useEditPassMutation/useEditPassMutation';
import useEditPowerMutation from 'src/hooks/itemStatHooks/useEditPowerMutation/useEditPowerMutation';
import DamageIcon from './icons/DamageIcon';
import MagCapacityIcon from './icons/MagCapacityIcon';
import SalvoIcon from './icons/SalvoIcon';
import SpareAmmoIcon from './icons/SpareAmmoIcon';
import { ArmorStats } from 'src/types/armor';
import BlockIcon from './icons/BlockIcon';
import HullIcon from './icons/HullIcon';
import LightningIcon from './icons/LightningIcon';
import PowerIcon from './icons/PowerIcon';
import { CyberneticStats } from 'src/types/cybernetic';
import { VehicleStats } from 'src/types/vehicle';
import CargoIcon from './icons/CargoIcon';
import InventoryIcon from './icons/InventoryIcon';
import PassIcon from './icons/PassIcon';
import { DroneStats } from 'src/types/drone';
import { Stats } from 'src/types/item';

export const WeaponControls = ({
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
  const reloadAmmo = useReloadAmmoMutation(
    apiUrl,
    weaponId,
    Number(characterId),
  );
  const refreshAmmo = useRefreshAmmoMutation(
    apiUrl,
    weaponId,
    Number(characterId),
  );

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

export const ArmorControls = ({
  armorId,
  stats,
}: {
  armorId: number;
  stats: ArmorStats;
}) => {
  const { apiUrl } = useContext(AuthContext);
  const { characterId } = useParams();

  const editPower = useEditPowerMutation(apiUrl, armorId, Number(characterId));
  const editBlock = useEditBlockMutation(apiUrl, armorId, Number(characterId));

  return (
    <div className="col-span-2 grid grid-cols-1 items-center justify-start gap-4 sm:grid-cols-2">
      {stats.currentBlock !== undefined && (
        <BtnControl
          title="Block"
          icon={<BlockIcon className="size-8 text-inherit" />}
          mutation={stats.currentBlock > 0 ? editBlock : null}
          value={-1}
        />
      )}
      {stats.currentBlock !== undefined && stats.block !== undefined && (
        <BtnControl
          title="Repair"
          icon={<HullIcon className="size-8 text-inherit" />}
          mutation={stats.currentBlock < stats.block ? editBlock : null}
          value={stats.block - stats.currentBlock}
        />
      )}
      {stats.currentPower !== undefined && (
        <BtnControl
          title="Activate"
          icon={<LightningIcon className="size-8 text-inherit" />}
          mutation={stats.currentPower > 0 ? editPower : null}
          value={-1}
        />
      )}
      {stats.currentPower !== undefined && stats.power !== undefined && (
        <BtnControl
          title="Use Power Cell"
          icon={<PowerIcon className="size-8 text-inherit" />}
          mutation={stats.currentPower < stats.power ? editPower : null}
          value={
            stats.power - stats.currentPower < 3
              ? stats.power - stats.currentPower
              : 3
          }
        />
      )}
    </div>
  );
};

export const CyberneticControls = ({
  cyberneticId,
  stats,
}: {
  cyberneticId: number;
  stats: CyberneticStats;
}) => {
  const { apiUrl } = useContext(AuthContext);
  const { characterId } = useParams();

  const editPower = useEditPowerMutation(
    apiUrl,
    cyberneticId,
    Number(characterId),
  );

  return (
    <div className="col-span-2 grid grid-cols-1 items-center justify-start gap-4 sm:grid-cols-2">
      {stats.currentPower !== undefined && (
        <BtnControl
          title="Activate"
          icon={<LightningIcon className="size-8 text-inherit" />}
          mutation={stats.currentPower > 0 ? editPower : null}
          value={-1}
        />
      )}

      {stats.currentPower !== undefined && stats.power !== undefined && (
        <BtnControl
          title="Use Power Cell"
          icon={<PowerIcon className="size-8 text-inherit" />}
          mutation={stats.currentPower < stats.power ? editPower : null}
          value={
            stats.power - stats.currentPower < 3
              ? stats.power - stats.currentPower
              : 3
          }
        />
      )}
    </div>
  );
};

export const VehicleControls = ({
  stats,
  vehicleId,
}: {
  stats: VehicleStats;
  vehicleId: number;
}) => {
  const { apiUrl } = useContext(AuthContext);
  const { characterId } = useParams();

  const editHull = useEditHullMutation(apiUrl, vehicleId, Number(characterId));

  const editCargo = useEditCargoMutation(
    apiUrl,
    vehicleId,
    Number(characterId),
  );

  const editPass = useEditPassMutation(apiUrl, vehicleId, Number(characterId));

  return (
    <div className="col-span-2 grid grid-cols-1 items-center justify-start gap-2 sm:grid-cols-2 sm:gap-4">
      {stats.currentHull !== undefined && (
        <BtnControl
          title="Take Damage"
          icon={<DamageIcon className="size-8 text-inherit" />}
          mutation={stats.currentHull > 0 ? editHull : null}
          value={-1}
        />
      )}
      {stats.currentHull !== undefined && stats.hull && (
        <BtnControl
          title="Repair Hull"
          icon={<HullIcon className="size-8 text-inherit" />}
          mutation={stats.currentHull < stats.hull ? editHull : null}
          value={stats.hull - stats.currentHull}
        />
      )}
      {stats.currentCargo !== undefined && (
        <BtnControl
          title="Unload Cargo"
          icon={<CargoIcon className="size-8 text-inherit" />}
          mutation={stats.currentCargo > 0 ? editCargo : null}
          value={-1}
        />
      )}
      {stats.currentCargo !== undefined && stats.cargo && (
        <BtnControl
          title="Load Cargo"
          icon={<InventoryIcon className="size-8 text-inherit" />}
          mutation={stats.currentCargo < stats.cargo ? editCargo : null}
          value={1}
        />
      )}
      {stats.currentPass !== undefined && (
        <BtnControl
          title="Unload Passengers"
          icon={<PassIcon className="size-8 text-inherit" />}
          mutation={stats.currentPass > 0 ? editPass : null}
          value={-1}
        />
      )}
      {stats.currentPass !== undefined && stats.pass && (
        <BtnControl
          title="Load Passengers"
          icon={<PassIcon className="size-8 text-inherit" />}
          mutation={stats.currentPass < stats.pass ? editPass : null}
          value={1}
        />
      )}
    </div>
  );
};

export const DroneControls = ({
  stats,
  droneId,
}: {
  stats: DroneStats;
  droneId: number;
}) => {
  const { apiUrl } = useContext(AuthContext);
  const { characterId } = useParams();

  const editHull = useEditHullMutation(apiUrl, droneId, Number(characterId));
  const editPower = useEditPowerMutation(apiUrl, droneId, Number(characterId));

  return (
    <div className="col-span-2 grid grid-cols-1 items-center justify-start gap-4 sm:grid-cols-2">
      {stats.currentHull !== undefined && (
        <BtnControl
          title="Take Damage"
          icon={<DamageIcon className="size-8 text-inherit" />}
          mutation={stats.currentHull > 0 ? editHull : null}
          value={-1}
        />
      )}
      {stats.currentHull !== undefined && stats.hull !== undefined && (
        <BtnControl
          title="Repair Drone"
          icon={<HullIcon className="size-8 text-inherit" />}
          mutation={stats.currentHull < stats.hull ? editHull : null}
          value={stats.hull - stats.currentHull}
        />
      )}
      {stats.currentPower !== undefined && (
        <BtnControl
          title="Activate"
          icon={<LightningIcon className="size-8 text-inherit" />}
          mutation={stats.currentPower > 0 ? editPower : null}
          value={-1}
        />
      )}
      {stats.currentPower !== undefined && stats.power !== undefined && (
        <BtnControl
          title="Use Power Cell"
          icon={<PowerIcon className="size-8 text-inherit" />}
          mutation={stats.currentPower < stats.power ? editPower : null}
          value={
            stats.power - stats.currentPower < 3
              ? stats.power - stats.currentPower
              : 3
          }
        />
      )}
    </div>
  );
};

export const ItemControls = ({
  itemId,
  stats,
}: {
  itemId: number;
  stats: Stats;
}) => {
  const { apiUrl } = useContext(AuthContext);
  const { characterId } = useParams();

  const editPower = useEditPowerMutation(apiUrl, itemId, Number(characterId));

  return (
    <div className="col-span-2 grid grid-cols-1 items-center justify-start gap-4 sm:grid-cols-2">
      {stats.currentPower !== undefined && (
        <BtnControl
          title="Activate"
          icon={<LightningIcon className="size-8 text-inherit" />}
          mutation={stats.currentPower > 0 ? editPower : null}
          value={-1}
        />
      )}
      {stats.currentPower !== undefined && stats.power !== undefined && (
        <BtnControl
          title="Recharge"
          icon={<PowerIcon className="size-8 text-inherit" />}
          mutation={stats.currentPower < stats.power ? editPower : null}
          value={
            stats.power - stats.currentPower < 3
              ? stats.power - stats.currentPower
              : 3
          }
        />
      )}
    </div>
  );
};
