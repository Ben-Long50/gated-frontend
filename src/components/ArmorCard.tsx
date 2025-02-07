import ArmorIcon from './icons/ArmorIcon';
import WardIcon from './icons/WardIcon';
import BlockIcon from './icons/BlockIcon';
import EquipIcon from './icons/EquipIcon';
import ItemCard from './ItemCard';
import { ArmorStats, ArmorWithKeywords } from 'src/types/armor';
import StatCard from './StatCard';
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

const ArmorControls = ({
  armorId,
  stats,
}: {
  armorId: number;
  stats: ArmorStats;
}) => {
  const { apiUrl } = useContext(AuthContext);

  const editCurrentPower = useEditArmorPowerMutation(apiUrl, armorId);
  const editCurrentBlock = useEditArmorBlockMutation(apiUrl, armorId);
  const refreshPower = useRefreshArmorPowerMutation(apiUrl, armorId);
  const refreshBlock = useRefreshArmorBlockMutation(apiUrl, armorId);

  return (
    <div className="col-span-2 flex flex-wrap items-center justify-start gap-4">
      <BtnControl
        title="Block"
        icon={<BlockIcon className="size-8 group-hover:fill-yellow-300" />}
        mutation={editCurrentBlock}
        value={-1}
      />
      {stats.power && (
        <BtnControl
          title="Activate"
          icon={
            <LightningIcon className="size-8 group-hover:fill-yellow-300" />
          }
          mutation={editCurrentPower}
          value={-1}
        />
      )}
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
      {armor.stats.armor && (
        <StatCard label="AV" stat={armor.stats.armor}>
          <ArmorIcon className="size-8" />
        </StatCard>
      )}
      {armor.stats.ward && (
        <StatCard label="WV" stat={armor.stats.ward}>
          <WardIcon className="size-8" />
        </StatCard>
      )}
      {mode === 'equipment'
        ? armor.stats.block &&
          armor.stats.currentBlock !== null && (
            <StatCard
              label="BP"
              stat={`${armor.stats.currentBlock} / ${armor.stats.block}`}
            >
              <BlockIcon className="size-8" />
            </StatCard>
          )
        : armor.stats.block && (
            <StatCard label="BP" stat={armor.stats.block}>
              <BlockIcon className="size-8" />
            </StatCard>
          )}
      {mode === 'equipment'
        ? armor.stats.power &&
          armor.stats.currentPower !== null && (
            <StatCard
              label="PWR"
              stat={`${armor.stats.currentPower} / ${armor.stats.power}`}
            >
              <LightningIcon className="size-8" />
            </StatCard>
          )
        : armor.stats.power && (
            <StatCard label="PWR" stat={armor.stats.power}>
              <LightningIcon className="size-8" />
            </StatCard>
          )}
      {armor.stats.weight && (
        <StatCard label="WGT" stat={armor.stats.weight}>
          <EquipIcon className="size-8" />
        </StatCard>
      )}
    </ItemCard>
  );
};

export default ArmorCard;
