import { useContext } from 'react';
import DamageIcon from './icons/DamageIcon';
import EquipIcon from './icons/EquipIcon';
import FlurryIcon from './icons/FlurryIcon';
import MagCapacityIcon from './icons/MagCapacityIcon';
import RangeIcon from './icons/RangeIcon';
import SalvoIcon from './icons/SalvoIcon';
import StatBar from './StatBar';
import { ThemeContext } from '../contexts/ThemeContext';
import HealthIcon from './icons/HealthIcon';
import SanityIcon from './icons/SanityIcon';
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
import HangarIcon from './icons/HangarIcon';
import PassIcon from './icons/PassIcon';
import VehicleWeaponIcon from './icons/VehicleWeaponIcon';
import StackIcon from './icons/StackIcon';
import { useParams } from 'react-router-dom';
import useCurrentHealthMutation from '../hooks/useCurrentHealthMutation/useCurrentHealthMutation';
import { AuthContext } from '../contexts/AuthContext';
import useCurrentSanityMutation from '../hooks/useCurrentSanityMutation/useCurrentSanityMutation';
import useCharacterQuery from '../hooks/useCharacterQuery/useCharacterQuery';

const StatBars = ({
  stats,
  mode,
  cardWidth,
}: {
  stats: any;
  mode?: string;
  cardWidth: number;
}) => {
  const { apiUrl } = useContext(AuthContext);
  const { statColorMap } = useContext(ThemeContext);
  const { characterId } = useParams();

  const { data: character } = useCharacterQuery(apiUrl, Number(characterId));

  const editCurrentHealth = useCurrentHealthMutation(
    apiUrl,
    Number(characterId),
  );

  const editCurrentSanity = useCurrentSanityMutation(
    apiUrl,
    Number(characterId),
  );

  const handleCurrentHealth = (value: number) => {
    if (character?.stats.currentHealth <= 0) return;
    editCurrentHealth.mutate(value);
  };

  const handleCurrentSanity = (value: number) => {
    if (character?.stats.currentSanity <= 0) return;
    editCurrentSanity.mutate(value);
  };

  return (
    <>
      {stats.currentHealth && (
        <StatBar
          title="Health"
          current={stats.currentHealth}
          total={stats.maxHealth}
          color={statColorMap['Health']}
          cardWidth={cardWidth}
          mutation={handleCurrentHealth}
          mode="adjustable"
        >
          <HealthIcon className="text-secondary size-8" />
        </StatBar>
      )}
      {stats.currentSanity && (
        <StatBar
          title="Sanity"
          current={stats.currentSanity}
          total={stats.maxSanity}
          color={statColorMap['Sanity']}
          cardWidth={cardWidth}
          mutation={handleCurrentSanity}
          mode="adjustable"
        >
          <SanityIcon className="text-secondary size-8" />
        </StatBar>
      )}
      {stats.maxCyber && (
        <StatBar
          title="Cyber"
          current={stats.cyber}
          total={stats.maxCyber}
          color={statColorMap['Cyber']}
          cardWidth={cardWidth}
        >
          <CyberIcon className="text-secondary size-8" />
        </StatBar>
      )}
      {stats.maxWeight && (
        <StatBar
          title="Equip"
          current={stats.weight}
          total={stats.maxWeight}
          color={statColorMap['Equip']}
          cardWidth={cardWidth}
        >
          <EquipIcon className="text-secondary size-8" />
        </StatBar>
      )}
      {stats.damage && (
        <StatBar
          title="DMG"
          current={stats.damage}
          color={statColorMap['DMG']}
          cardWidth={cardWidth}
        >
          <DamageIcon className="text-secondary size-8" />
        </StatBar>
      )}
      {stats.salvo && (
        <StatBar
          title="SLV"
          current={stats.salvo}
          color={statColorMap['SLV']}
          cardWidth={cardWidth}
        >
          <SalvoIcon className="text-secondary size-8" />
        </StatBar>
      )}
      {stats.flurry && (
        <StatBar
          title="FLR"
          current={stats.flurry}
          color={statColorMap['FLR']}
          cardWidth={cardWidth}
        >
          <FlurryIcon className="text-secondary size-8" />
        </StatBar>
      )}
      {stats.range && (
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
          stats.magCapacity && (
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
        : stats.magCapacity && (
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

      {stats.cyber && !stats.maxCyber && (
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

      {stats.size && (
        <StatBar
          title="SZE"
          current={stats.size}
          color={statColorMap['SZE']}
          cardWidth={cardWidth}
        >
          <SizeIcon className="text-secondary size-8" />
        </StatBar>
      )}
      {stats.speed && (
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
      {stats.agility && (
        <StatBar
          title="AGL"
          current={stats.agility}
          color={statColorMap['AGL']}
          cardWidth={cardWidth}
        >
          <AgilityIcon className="text-secondary size-8" />
        </StatBar>
      )}
      {stats.hull && (
        <StatBar
          title="HULL"
          current={stats.hull}
          divider={2}
          color={statColorMap['HULL']}
          cardWidth={cardWidth}
        >
          <HullIcon className="text-secondary size-8" />
        </StatBar>
      )}
      {stats.armor && (
        <StatBar
          title="AV"
          current={stats.armor}
          color={statColorMap['AV']}
          cardWidth={cardWidth}
        >
          <ArmorIcon className="text-secondary size-8" />
        </StatBar>
      )}
      {stats.cargo && (
        <StatBar
          title="CRG"
          current={stats.cargo}
          color={statColorMap['CRG']}
          cardWidth={cardWidth}
        >
          <CargoIcon className="text-secondary size-8" />
        </StatBar>
      )}
      {stats.hangar && (
        <StatBar
          title="HGR"
          current={stats.hangar}
          color={statColorMap['HGR']}
          cardWidth={cardWidth}
        >
          <HangarIcon className="text-secondary size-8" />
        </StatBar>
      )}
      {stats.pass && (
        <StatBar
          title="PASS"
          current={stats.pass}
          color={statColorMap['PASS']}
          cardWidth={cardWidth}
        >
          <PassIcon className="text-secondary size-8" />
        </StatBar>
      )}
      {stats.weapon && (
        <StatBar
          title="WPN"
          current={stats.weapon}
          color={statColorMap['WPN']}
          cardWidth={cardWidth}
        >
          <VehicleWeaponIcon className="text-secondary size-8" />
        </StatBar>
      )}
      {stats.ward && (
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
        ? stats.block &&
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
        : stats.block && (
            <StatBar
              title="BP"
              current={stats.block}
              color={statColorMap['BP']}
              cardWidth={cardWidth}
            >
              <BlockIcon className="text-secondary size-8" />
            </StatBar>
          )}
      {mode === 'equipment' || mode === 'deployments'
        ? stats.power &&
          stats.currentPower !== undefined && (
            <StatBar
              title="PWR"
              total={stats.power}
              current={stats.currentPower}
              color="rgb(107, 255, 124)"
              cardWidth={cardWidth}
            >
              <LightningIcon className="text-secondary size-8" />
            </StatBar>
          )
        : stats.power && (
            <StatBar
              title="PWR"
              current={stats.power}
              color="rgb(107, 255, 124)"
              cardWidth={cardWidth}
            >
              <LightningIcon className="text-secondary size-8" />
            </StatBar>
          )}
      {stats.currentStacks ? (
        <StatBar
          title="STACKS"
          total={stats.maxStacks ? stats.maxStacks : undefined}
          current={stats.currentStacks}
          color={statColorMap['STACKS']}
          cardWidth={cardWidth}
        >
          <StackIcon className="text-secondary size-8" />
        </StatBar>
      ) : null}
      {stats.weight && !stats.maxWeight && (
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
