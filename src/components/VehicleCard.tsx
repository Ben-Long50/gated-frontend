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
import { VehicleStats, VehicleWithWeapons } from 'src/types/vehicle';
import StatBar from './StatBar';

const VehicleCard = ({
  vehicle,
  mode,
}: {
  vehicle: VehicleWithWeapons;
  mode: string;
}) => {
  return (
    <ItemCard item={vehicle} category="vehicles" mode={mode}>
      <VehicleStatBars stats={vehicle.stats} mode={mode} />
    </ItemCard>
  );
};

export const VehicleStatBars = ({
  stats,
  mode,
}: {
  stats: VehicleStats;
  mode?: string;
}) => {
  return (
    <>
      {stats.size && (
        <StatBar title="SZE" current={stats.size} color="rgb(251 191 36)">
          <SizeIcon className="size-8" />
        </StatBar>
      )}
      {stats.speed && (
        <StatBar
          title="SPD"
          current={stats.speed}
          divider={10}
          color="rgb(33, 194, 219)"
        >
          <VehicleSpeedIcon className="size-8" />
        </StatBar>
      )}
      {stats.agility && (
        <StatBar title="AGL" current={stats.agility} color="rgb(107, 255, 124)">
          <AgilityIcon className="size-8" />
        </StatBar>
      )}
      {stats.hull && (
        <StatBar
          title="HULL"
          current={stats.hull}
          divider={2}
          color="rgb(248 113 113)"
        >
          <HullIcon className="size-8" />
        </StatBar>
      )}
      {stats.armor && (
        <StatBar title="AV" current={stats.armor} color="rgb(219, 123, 33)">
          <ArmorIcon className="size-8" />
        </StatBar>
      )}
      {stats.cargo && (
        <StatBar title="CRG" current={stats.cargo} color="rgb(39, 217, 167)">
          <CargoIcon className="size-8" />
        </StatBar>
      )}
      {stats.hangar && (
        <StatBar title="HGR" current={stats.hangar} color="rgb(219, 123, 33)">
          <HangarIcon className="size-8" />
        </StatBar>
      )}
      {stats.pass && (
        <StatBar title="PASS" current={stats.pass} color="rgb(137, 39, 217)">
          <PassIcon className="size-8" />
        </StatBar>
      )}
      {stats.weapon && (
        <StatBar title="WPN" current={stats.weapon} color="rgb(252, 91, 50)">
          <VehicleWeaponIcon className="size-8" />
        </StatBar>
      )}
    </>
  );
};

export default VehicleCard;
