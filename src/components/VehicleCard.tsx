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
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

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
  const { statColorMap } = useContext(ThemeContext);

  return (
    <>
      {stats.size && (
        <StatBar title="SZE" current={stats.size} color={statColorMap['SZE']}>
          <SizeIcon className="size-8" />
        </StatBar>
      )}
      {stats.speed && (
        <StatBar
          title="SPD"
          current={stats.speed}
          divider={10}
          color={statColorMap['SPD']}
        >
          <VehicleSpeedIcon className="size-8" />
        </StatBar>
      )}
      {stats.agility && (
        <StatBar
          title="AGL"
          current={stats.agility}
          color={statColorMap['AGL']}
        >
          <AgilityIcon className="size-8" />
        </StatBar>
      )}
      {stats.hull && (
        <StatBar
          title="HULL"
          current={stats.hull}
          divider={2}
          color={statColorMap['HULL']}
        >
          <HullIcon className="size-8" />
        </StatBar>
      )}
      {stats.armor && (
        <StatBar title="AV" current={stats.armor} color={statColorMap['AV']}>
          <ArmorIcon className="size-8" />
        </StatBar>
      )}
      {stats.cargo && (
        <StatBar title="CRG" current={stats.cargo} color={statColorMap['CRG']}>
          <CargoIcon className="size-8" />
        </StatBar>
      )}
      {stats.hangar && (
        <StatBar title="HGR" current={stats.hangar} color={statColorMap['HGR']}>
          <HangarIcon className="size-8" />
        </StatBar>
      )}
      {stats.pass && (
        <StatBar title="PASS" current={stats.pass} color={statColorMap['PASS']}>
          <PassIcon className="size-8" />
        </StatBar>
      )}
      {stats.weapon && (
        <StatBar title="WPN" current={stats.weapon} color={statColorMap['WPN']}>
          <VehicleWeaponIcon className="size-8" />
        </StatBar>
      )}
    </>
  );
};

export default VehicleCard;
