import ArmorIcon from './icons/ArmorIcon';
import WardIcon from './icons/WardIcon';
import BlockIcon from './icons/BlockIcon';
import EquipIcon from './icons/EquipIcon';
import ItemCard from './ItemCard';
import { ArmorStats, ArmorWithKeywords } from 'src/types/armor';
import LightningIcon from './icons/LightningIcon';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import useEditArmorPowerMutation from '../hooks/armorStatHooks/useEditArmorPowerMutation/useEditArmorPowerMutation';
import useEditArmorBlockMutation from '../hooks/armorStatHooks/useEditArmorBlockMutation/useEditArmorBlockMutation';
import useRefreshArmorPowerMutation from '../hooks/armorStatHooks/useRefreshArmorBlockMutation/useRefreshArmorPowerMutation';
import useRefreshArmorBlockMutation from '../hooks/armorStatHooks/useRefreshArmorPowerMutation/useRefreshArmorBlockMutation';
import BtnControl from './buttons/BtnControl';
import HullIcon from './icons/HullIcon';
import PowerIcon from './icons/PowerIcon';
import StatBar from './StatBar';
import { useParams } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';

const ArmorControls = ({
  armorId,
  stats,
}: {
  armorId: number;
  stats: ArmorStats;
}) => {
  const { apiUrl } = useContext(AuthContext);
  const { characterId } = useParams();

  const editCurrentPower = useEditArmorPowerMutation(
    apiUrl,
    armorId,
    Number(characterId),
  );
  const editCurrentBlock = useEditArmorBlockMutation(
    apiUrl,
    armorId,
    Number(characterId),
  );
  const refreshPower = useRefreshArmorPowerMutation(
    apiUrl,
    armorId,
    Number(characterId),
  );
  const refreshBlock = useRefreshArmorBlockMutation(
    apiUrl,
    armorId,
    Number(characterId),
  );

  return (
    <div className="col-span-2 flex flex-wrap items-center justify-start gap-4">
      {stats.block && stats.currentBlock > 0 ? (
        <BtnControl
          title="Block"
          icon={<BlockIcon className="size-8 group-hover:fill-yellow-300" />}
          mutation={editCurrentBlock}
          value={-1}
        />
      ) : null}
      {stats.currentPower && stats.currentPower > 0 ? (
        <BtnControl
          title="Activate"
          icon={
            <LightningIcon className="size-8 group-hover:fill-yellow-300" />
          }
          mutation={editCurrentPower}
          value={-1}
        />
      ) : null}
      <BtnControl
        title="Repair"
        icon={<HullIcon className="size-8 group-hover:fill-yellow-300" />}
        mutation={refreshBlock}
      />
      {stats.power && (
        <BtnControl
          title="Recharge"
          icon={<PowerIcon className="size-8 group-hover:fill-yellow-300" />}
          mutation={refreshPower}
        />
      )}
    </div>
  );
};

const ArmorCard = ({
  armor,
  mode,
}: {
  armor: ArmorWithKeywords;
  mode: string;
}) => {
  return (
    <ItemCard
      item={armor}
      category="armor"
      mode={mode}
      controls={<ArmorControls armorId={armor.id} stats={armor.stats} />}
    >
      <ArmorStatBars stats={armor.stats} mode={mode} />
    </ItemCard>
  );
};

export const ArmorStatBars = ({
  stats,
  mode,
}: {
  stats: ArmorStats;
  mode?: string;
}) => {
  const { statColorMap } = useContext(ThemeContext);
  return (
    <>
      {stats.armor && (
        <StatBar title="AV" current={stats.armor} color={statColorMap['AV']}>
          <ArmorIcon className="size-8" />
        </StatBar>
      )}
      {stats.ward && (
        <StatBar title="WV" current={stats.ward} color={statColorMap['WV']}>
          <WardIcon className="size-8" />
        </StatBar>
      )}
      {mode === 'equipment'
        ? stats.block &&
          stats.currentBlock !== undefined && (
            <StatBar
              title="BP"
              total={stats.block}
              current={stats.currentBlock}
              color={statColorMap['BP']}
            >
              <BlockIcon className="size-8" />
            </StatBar>
          )
        : stats.block && (
            <StatBar
              title="BP"
              current={stats.block}
              color={statColorMap['BP']}
            >
              <BlockIcon className="size-8" />
            </StatBar>
          )}
      {mode === 'equipment'
        ? stats.power &&
          stats.currentPower !== undefined && (
            <StatBar
              title="PWR"
              total={stats.power}
              current={stats.currentPower}
              color={statColorMap['PWR']}
            >
              <LightningIcon className="size-8" />
            </StatBar>
          )
        : stats.power && (
            <StatBar
              title="PWR"
              current={stats.power}
              color={statColorMap['PWR']}
            >
              <LightningIcon className="size-8" />
            </StatBar>
          )}
      {stats.weight && (
        <StatBar title="WGT" current={stats.weight} color={statColorMap['WGT']}>
          <EquipIcon className="size-8" />
        </StatBar>
      )}
    </>
  );
};

export default ArmorCard;
