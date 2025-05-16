import ItemCard from './ItemCard';
import { VehicleStats, VehicleWithWeapons } from 'src/types/vehicle';
import ItemCardMobile from './ItemCardMobile';
import BtnControl from './buttons/BtnControl';
import { useContext } from 'react';
import { AuthContext } from 'src/contexts/AuthContext';
import { useParams } from 'react-router-dom';
import DamageIcon from './icons/DamageIcon';
import HullIcon from './icons/HullIcon';
import useEditHullMutation from 'src/hooks/vehicleStatHooks/useEditHullMutation/useEditHullMutation';
import CargoIcon from './icons/CargoIcon';
import InventoryIcon from './icons/InventoryIcon';
import PassIcon from './icons/PassIcon';
import useEditPassMutation from 'src/hooks/vehicleStatHooks/useEditPassMutation/useEditPassMutation';
import useEditCargoMutation from 'src/hooks/vehicleStatHooks/useEditCargoMutation/useEditCargoMutation';

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

const VehicleCard = ({
  vehicle,
  mode,
  ownerId,
}: {
  vehicle: VehicleWithWeapons;
  mode: string;
  ownerId?: number;
}) => {
  const { user } = useContext(AuthContext);
  return (
    <ItemCard
      item={vehicle}
      category="vehicles"
      mode={mode}
      controls={
        ownerId === user?.id ? (
          <VehicleControls stats={vehicle.stats} vehicleId={vehicle.id} />
        ) : null
      }
    />
  );
};

export const VehicleCardMobile = ({
  vehicle,
  mode,
  ownerId,
}: {
  vehicle: VehicleWithWeapons;
  mode: string;
  ownerId?: number;
}) => {
  const { user } = useContext(AuthContext);
  return (
    <ItemCardMobile
      item={vehicle}
      category="vehicles"
      mode={mode}
      controls={
        ownerId === user?.id ? (
          <VehicleControls stats={vehicle.stats} vehicleId={vehicle.id} />
        ) : null
      }
    />
  );
};

export default VehicleCard;
