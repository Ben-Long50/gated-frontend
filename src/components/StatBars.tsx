import { useContext } from 'react';
import DamageIcon from './icons/DamageIcon';
import EquipIcon from './icons/EquipIcon';
import FlurryIcon from './icons/FlurryIcon';
import MagCapacityIcon from './icons/MagCapacityIcon';
import RangeIcon from './icons/RangeIcon';
import SalvoIcon from './icons/SalvoIcon';
import StatBar from './StatBar';
import { ThemeContext } from '../contexts/ThemeContext';
import CyberIcon from './icons/CyberIcon';
import ArmorIcon from './icons/ArmorIcon';
import WardIcon from './icons/WardIcon';
import BlockIcon from './icons/BlockIcon';
import LightningIcon from './icons/LightningIcon';
import SizeIcon from './icons/SizeIcon';
import VehicleSpeedIcon from './icons/VehicleSpeedIcon';
import AgilityIcon from './icons/AgilityIcon';
import HullIcon from './icons/HullIcon';
import CargoIcon from './icons/CargoIcon';
import PassIcon from './icons/PassIcon';
import VehicleWeaponIcon from './icons/VehicleWeaponIcon';
import { Stats } from 'src/types/item';
import DroneIcon from './icons/DroneIcon';

const StatBars = ({
  stats,
  mode,
  cardWidth,
}: {
  stats: Stats;
  mode?: string;
  cardWidth: number;
}) => {
  const { statColorMap } = useContext(ThemeContext);

  return (
    <>
      {stats.damage !== undefined && (
        <StatBar
          title="DMG"
          current={stats.damage}
          color={statColorMap['DMG']}
          cardWidth={cardWidth}
        >
          <DamageIcon className="text-secondary size-8" />
        </StatBar>
      )}
      {stats.salvo !== undefined && (
        <StatBar
          title="SLV"
          current={stats.salvo}
          color={statColorMap['SLV']}
          cardWidth={cardWidth}
        >
          <SalvoIcon className="text-secondary size-8" />
        </StatBar>
      )}
      {stats.flurry !== undefined && (
        <StatBar
          title="FLR"
          current={stats.flurry}
          color={statColorMap['FLR']}
          cardWidth={cardWidth}
        >
          <FlurryIcon className="text-secondary size-8" />
        </StatBar>
      )}
      {stats.range !== undefined && (
        <StatBar
          title="RNG"
          current={stats.range}
          divider={5}
          color={statColorMap['RNG']}
          cardWidth={cardWidth}
        >
          <RangeIcon className="text-secondary size-8" />
        </StatBar>
      )}
      {mode === 'equipment' || mode === 'deployments'
        ? stats.currentAmmoCount !== undefined &&
          stats.magCapacity !== undefined && (
            <StatBar
              title="MAG"
              total={stats.magCapacity}
              current={stats.currentAmmoCount}
              reserve={stats.currentMagCount * stats.magCapacity}
              color={statColorMap['MAG']}
              cardWidth={cardWidth}
            >
              <MagCapacityIcon className="text-secondary size-8" />
            </StatBar>
          )
        : stats.magCapacity !== undefined && (
            <StatBar
              title="MAG"
              total={stats.magCapacity}
              current={stats.magCapacity}
              reserve={(stats.magCount - 1) * stats.magCapacity}
              color={statColorMap['MAG']}
              cardWidth={cardWidth}
            >
              <MagCapacityIcon className="text-secondary size-8" />
            </StatBar>
          )}

      {stats.cyber !== undefined && !stats.maxCyber && (
        <StatBar
          title="CBR"
          current={stats.cyber}
          total={stats.maxCyber}
          color={statColorMap['Cyber']}
          cardWidth={cardWidth}
        >
          <CyberIcon className="text-secondary size-8" />
        </StatBar>
      )}
      {stats.currentHull !== undefined ? (
        <StatBar
          title="HV"
          current={stats.currentHull}
          total={stats.hull}
          color={statColorMap['HULL']}
          cardWidth={cardWidth}
        >
          <HullIcon className="text-secondary size-8" />
        </StatBar>
      ) : (
        stats.hull !== undefined && (
          <StatBar
            title="HV"
            current={stats.hull}
            color={statColorMap['HULL']}
            cardWidth={cardWidth}
          >
            <HullIcon className="text-secondary size-8" />
          </StatBar>
        )
      )}
      {stats.armor !== undefined && (
        <StatBar
          title="AV"
          current={stats.armor}
          color={statColorMap['AV']}
          cardWidth={cardWidth}
        >
          <ArmorIcon className="text-secondary size-8" />
        </StatBar>
      )}
      {stats.size !== undefined && (
        <StatBar
          title="SZE"
          current={stats.size}
          color={statColorMap['SZE']}
          cardWidth={cardWidth}
        >
          <SizeIcon className="text-secondary size-8" />
        </StatBar>
      )}
      {stats.speed !== undefined && (
        <StatBar
          title="SPD"
          current={stats.speed}
          divider={10}
          color={statColorMap['SPD']}
          cardWidth={cardWidth}
        >
          <VehicleSpeedIcon className="text-secondary size-8" />
        </StatBar>
      )}
      {stats.agility !== undefined && (
        <StatBar
          title="AGL"
          current={stats.agility}
          color={statColorMap['AGL']}
          cardWidth={cardWidth}
        >
          <AgilityIcon className="text-secondary size-8" />
        </StatBar>
      )}
      {stats.currentCargo !== undefined ? (
        <StatBar
          title="CRG"
          current={stats.currentCargo}
          total={stats.cargo}
          color={statColorMap['CRG']}
          cardWidth={cardWidth}
        >
          <CargoIcon className="text-secondary size-8" />
        </StatBar>
      ) : (
        stats.cargo !== undefined && (
          <StatBar
            title="CRG"
            current={stats.cargo}
            color={statColorMap['CRG']}
            cardWidth={cardWidth}
          >
            <CargoIcon className="text-secondary size-8" />
          </StatBar>
        )
      )}
      {stats.currentPass !== undefined ? (
        <StatBar
          title="OCC"
          current={stats.currentPass}
          total={stats.pass}
          color={statColorMap['PASS']}
          cardWidth={cardWidth}
        >
          <PassIcon className="text-secondary size-8" />
        </StatBar>
      ) : (
        stats.pass !== undefined && (
          <StatBar
            title="OCC"
            current={stats.pass}
            color={statColorMap['PASS']}
            cardWidth={cardWidth}
          >
            <PassIcon className="text-secondary size-8" />
          </StatBar>
        )
      )}
      {stats.turret !== undefined && stats.currentTurret !== undefined && (
        <StatBar
          title="TUR"
          current={stats.currentTurret}
          total={stats.turret}
          color={statColorMap['TUR']}
          cardWidth={cardWidth}
        >
          <DroneIcon className="text-secondary size-8" />
        </StatBar>
      )}
      {stats.weapon !== undefined && stats.currentWeapon !== undefined && (
        <StatBar
          title="WPN"
          current={stats.currentWeapon}
          total={stats.weapon}
          color={statColorMap['WPN']}
          cardWidth={cardWidth}
        >
          <VehicleWeaponIcon className="text-secondary size-8" />
        </StatBar>
      )}
      {stats.ward !== undefined && (
        <StatBar
          title="WV"
          current={stats.ward}
          color={statColorMap['WV']}
          cardWidth={cardWidth}
        >
          <WardIcon className="text-secondary size-8" />
        </StatBar>
      )}
      {mode === 'equipment' || mode === 'deployments'
        ? stats.block !== undefined &&
          stats.currentBlock !== undefined && (
            <StatBar
              title="BP"
              total={stats.block}
              current={stats.currentBlock}
              color={statColorMap['BP']}
              cardWidth={cardWidth}
            >
              <BlockIcon className="text-secondary size-8" />
            </StatBar>
          )
        : stats.block !== undefined && (
            <StatBar
              title="BP"
              current={stats.block}
              color={statColorMap['BP']}
              cardWidth={cardWidth}
            >
              <BlockIcon className="text-secondary size-8" />
            </StatBar>
          )}
      {stats.currentPower !== undefined ? (
        <StatBar
          title="PWR"
          total={stats.power}
          current={stats.currentPower}
          color="rgb(107, 255, 124)"
          cardWidth={cardWidth}
        >
          <LightningIcon className="text-secondary size-8" />
        </StatBar>
      ) : (
        stats.power !== undefined && (
          <StatBar
            title="PWR"
            current={stats.power}
            color="rgb(107, 255, 124)"
            cardWidth={cardWidth}
          >
            <LightningIcon className="text-secondary size-8" />
          </StatBar>
        )
      )}
      {stats.weight !== undefined && !stats.maxWeight && (
        <StatBar
          title="WGT"
          current={stats.weight}
          color={statColorMap['WGT']}
          cardWidth={cardWidth}
        >
          <EquipIcon className="text-secondary size-8" />
        </StatBar>
      )}
    </>
  );
};

export default StatBars;
