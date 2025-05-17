import { WeaponStats } from 'src/types/weapon';
import BtnControl from './buttons/BtnControl';
import { useContext } from 'react';
import { AuthContext } from 'src/contexts/AuthContext';
import { useParams } from 'react-router-dom';
import useEditAmmoMutation from 'src/hooks/weaponStatHooks/useEditAmmoMutation/useEditAmmoMutation';
import useReloadAmmoMutation from 'src/hooks/weaponStatHooks/useReloadAmmoMutation/useReloadAmmoMutation';
import useRefreshAmmoMutation from 'src/hooks/weaponStatHooks/useRefreshAmmoMutation/useRefreshAmmoMutation';
import DamageIcon from './icons/DamageIcon';
import MagCapacityIcon from './icons/MagCapacityIcon';
import SalvoIcon from './icons/SalvoIcon';
import SpareAmmoIcon from './icons/SpareAmmoIcon';
import { ArmorStats } from 'src/types/armor';
import useEditArmorPowerMutation from 'src/hooks/armorStatHooks/useEditArmorPowerMutation/useEditArmorPowerMutation';
import useEditArmorBlockMutation from 'src/hooks/armorStatHooks/useEditArmorBlockMutation/useEditArmorBlockMutation';
import BlockIcon from './icons/BlockIcon';
import HullIcon from './icons/HullIcon';
import LightningIcon from './icons/LightningIcon';
import PowerIcon from './icons/PowerIcon';
import useEditCyberneticPowerMutation from 'src/hooks/cyberneticStatHooks/useEditCyberneticPowerMutation/useEditCyberneticPowerMutation';
import { CyberneticStats } from 'src/types/cybernetic';
import useEditHullMutation from 'src/hooks/vehicleStatHooks/useEditHullMutation/useEditHullMutation';
import useEditCargoMutation from 'src/hooks/vehicleStatHooks/useEditCargoMutation/useEditCargoMutation';
import { VehicleStats } from 'src/types/vehicle';
import CargoIcon from './icons/CargoIcon';
import useEditPassMutation from 'src/hooks/vehicleStatHooks/useEditPassMutation/useEditPassMutation';
import InventoryIcon from './icons/InventoryIcon';
import PassIcon from './icons/PassIcon';
import { DroneStats } from 'src/types/drone';
import useEditDronePowerMutation from 'src/hooks/droneStatHooks/useEditDronePowerMutation/useEditDronePowerMutation';
import useDroneHullMutation from 'src/hooks/droneStatHooks/useDroneHullMutation/useDroneHullMutation';
import useEditItemPowerMutation from 'src/hooks/itemStatHooks/useEditItemPowerMutation/useEditItemPowerMutation';
import { Stats } from 'src/types/item';
import useRefreshItemPowerMutation from 'src/hooks/itemStatHooks/useRefreshItemPowerMutation/useRefreshItemPowerMutation';

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

  const editArmorPower = useEditArmorPowerMutation(
    apiUrl,
    armorId,
    Number(characterId),
  );
  const editArmorBlock = useEditArmorBlockMutation(
    apiUrl,
    armorId,
    Number(characterId),
  );

  return (
    <div className="col-span-2 grid grid-cols-1 items-center justify-start gap-4 sm:grid-cols-2">
      {stats.currentBlock !== undefined && (
        <BtnControl
          title="Block"
          icon={<BlockIcon className="size-8 text-inherit" />}
          mutation={stats.currentBlock > 0 ? editArmorBlock : null}
          value={-1}
        />
      )}
      {stats.currentBlock !== undefined && stats.block !== undefined && (
        <BtnControl
          title="Repair"
          icon={<HullIcon className="size-8 text-inherit" />}
          mutation={stats.currentBlock < stats.block ? editArmorBlock : null}
          value={stats.block - stats.currentBlock}
        />
      )}
      {stats.currentPower !== undefined && (
        <BtnControl
          title="Activate"
          icon={<LightningIcon className="size-8 text-inherit" />}
          mutation={stats.currentPower > 0 ? editArmorPower : null}
          value={-1}
        />
      )}
      {stats.currentPower !== undefined && stats.power !== undefined && (
        <BtnControl
          title="Use Power Cell"
          icon={<PowerIcon className="size-8 text-inherit" />}
          mutation={stats.currentPower < stats.power ? editArmorPower : null}
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

  const editCurrentPower = useEditCyberneticPowerMutation(
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
          mutation={stats.currentPower > 0 ? editCurrentPower : null}
          value={-1}
        />
      )}

      {stats.currentPower !== undefined && stats.power !== undefined && (
        <BtnControl
          title="Use Power Cell"
          icon={<PowerIcon className="size-8 text-inherit" />}
          mutation={stats.currentPower < stats.power ? editCurrentPower : null}
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

  const editVehicleHull = useEditHullMutation(
    apiUrl,
    vehicleId,
    Number(characterId),
  );

  const editVehicleCargo = useEditCargoMutation(
    apiUrl,
    vehicleId,
    Number(characterId),
  );

  const editVehiclePass = useEditPassMutation(
    apiUrl,
    vehicleId,
    Number(characterId),
  );

  return (
    <div className="col-span-2 grid grid-cols-1 items-center justify-start gap-2 sm:grid-cols-2 sm:gap-4">
      {stats.currentHull !== undefined && (
        <BtnControl
          title="Take Damage"
          icon={<DamageIcon className="size-8 text-inherit" />}
          mutation={stats.currentHull > 0 ? editVehicleHull : null}
          value={-1}
        />
      )}
      {stats.currentHull !== undefined && stats.hull && (
        <BtnControl
          title="Repair Hull"
          icon={<HullIcon className="size-8 text-inherit" />}
          mutation={stats.currentHull < stats.hull ? editVehicleHull : null}
          value={stats.hull - stats.currentHull}
        />
      )}
      {stats.currentCargo !== undefined && (
        <BtnControl
          title="Unload Cargo"
          icon={<CargoIcon className="size-8 text-inherit" />}
          mutation={stats.currentCargo > 0 ? editVehicleCargo : null}
          value={-1}
        />
      )}
      {stats.currentCargo !== undefined && stats.cargo && (
        <BtnControl
          title="Load Cargo"
          icon={<InventoryIcon className="size-8 text-inherit" />}
          mutation={stats.currentCargo < stats.cargo ? editVehicleCargo : null}
          value={1}
        />
      )}
      {stats.currentPass !== undefined && (
        <BtnControl
          title="Unload Passengers"
          icon={<PassIcon className="size-8 text-inherit" />}
          mutation={stats.currentPass > 0 ? editVehiclePass : null}
          value={-1}
        />
      )}
      {stats.currentPass !== undefined && stats.pass && (
        <BtnControl
          title="Load Passengers"
          icon={<PassIcon className="size-8 text-inherit" />}
          mutation={stats.currentPass < stats.pass ? editVehiclePass : null}
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

  const editDroneHull = useDroneHullMutation(
    apiUrl,
    droneId,
    Number(characterId),
  );
  const editDronePower = useEditDronePowerMutation(
    apiUrl,
    droneId,
    Number(characterId),
  );

  return (
    <div className="col-span-2 grid grid-cols-1 items-center justify-start gap-4 sm:grid-cols-2">
      {stats.currentHull !== undefined && (
        <BtnControl
          title="Take Damage"
          icon={<DamageIcon className="size-8 text-inherit" />}
          mutation={stats.currentHull > 0 ? editDroneHull : null}
          value={-1}
        />
      )}
      {stats.currentHull !== undefined && stats.hull !== undefined && (
        <BtnControl
          title="Repair Drone"
          icon={<HullIcon className="size-8 text-inherit" />}
          mutation={stats.currentHull < stats.hull ? editDroneHull : null}
          value={stats.hull - stats.currentHull}
        />
      )}
      {stats.currentPower !== undefined && (
        <BtnControl
          title="Activate"
          icon={<LightningIcon className="size-8 text-inherit" />}
          mutation={stats.currentPower > 0 ? editDronePower : null}
          value={-1}
        />
      )}
      {stats.currentPower !== undefined && stats.power !== undefined && (
        <BtnControl
          title="Use Power Cell"
          icon={<PowerIcon className="size-8 text-inherit" />}
          mutation={stats.currentPower < stats.power ? editDronePower : null}
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

  const editCurrentPower = useEditItemPowerMutation(
    apiUrl,
    itemId,
    Number(characterId),
  );
  const refreshPower = useRefreshItemPowerMutation(
    apiUrl,
    itemId,
    Number(characterId),
  );

  return (
    <div className="col-span-2 grid grid-cols-1 items-center justify-start gap-4 sm:grid-cols-2">
      {stats.currentPower !== undefined && (
        <BtnControl
          title="Activate"
          icon={<LightningIcon className="size-8 text-inherit" />}
          mutation={stats.currentPower > 0 ? editCurrentPower : null}
          value={-1}
        />
      )}
      {stats.currentPower !== undefined && stats.power !== undefined && (
        <BtnControl
          title="Recharge"
          icon={<PowerIcon className="size-8 text-inherit" />}
          mutation={stats.currentPower < stats.power ? refreshPower : null}
        />
      )}
    </div>
  );
};
