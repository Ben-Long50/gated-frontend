import SizeIcon from './icons/SizeIcon';
import VehicleSpeedIcon from './icons/VehicleSpeedIcon';
import AgilityIcon from './icons/AgilityIcon';
import HullIcon from './icons/HullIcon';
import ArmorIcon from './icons/ArmorIcon';
import CargoIcon from './icons/CargoIcon';
import PassIcon from './icons/PassIcon';
import VehicleWeaponIcon from './icons/VehicleWeaponIcon';
import HangarIcon from './icons/HangarIcon';
import ItemCard from './ItemCard';
import { VehicleWithWeapons } from 'src/types/vehicle';
import StatCard from './StatCard';

const VehicleCard = ({
  vehicle,
  mode,
}: {
  vehicle: VehicleWithWeapons;
  mode: string;
}) => {
  return (
    <ItemCard item={vehicle} category="vehicles" mode={mode}>
      {vehicle.stats.size && (
        <StatCard label="SZE" stat={vehicle.stats.size}>
          <SizeIcon className="size-8" />
        </StatCard>
      )}
      {vehicle.stats.speed && (
        <StatCard label="SPD" stat={vehicle.stats.speed}>
          <VehicleSpeedIcon className="size-8" />
        </StatCard>
      )}
      {vehicle.stats.agility && (
        <StatCard label="AGL" stat={vehicle.stats.agility}>
          <AgilityIcon className="size-8" />
        </StatCard>
      )}
      {vehicle.stats.hull && (
        <StatCard label="HULL" stat={vehicle.stats.hull}>
          <HullIcon className="size-8" />
        </StatCard>
      )}
      {vehicle.stats.armor && (
        <StatCard label="AV" stat={vehicle.stats.armor}>
          <ArmorIcon className="size-8" />
        </StatCard>
      )}
      {vehicle.stats.cargo && (
        <StatCard label="CRG" stat={vehicle.stats.cargo}>
          <CargoIcon className="size-8" />
        </StatCard>
      )}
      {vehicle.stats.hangar && (
        <StatCard label="HGR" stat={vehicle.stats.hangar}>
          <HangarIcon className="size-8" />
        </StatCard>
      )}
      {vehicle.stats.pass && (
        <StatCard label="PASS" stat={vehicle.stats.pass}>
          <PassIcon className="size-8" />
        </StatCard>
      )}
      {vehicle.stats.weapon && (
        <StatCard label="WPN" stat={vehicle.stats.weapon}>
          <VehicleWeaponIcon className="size-8" />
        </StatCard>
      )}
    </ItemCard>
  );
};

export default VehicleCard;
