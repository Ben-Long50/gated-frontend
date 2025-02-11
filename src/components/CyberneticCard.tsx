import CyberIcon from './icons/CyberIcon';
import { Modifier } from 'src/types/modifier';
import ItemCard from './ItemCard';
import { CyberneticStats, CyberneticWithKeywords } from 'src/types/cybernetic';
import StatCard from './StatCard';
import LightningIcon from './icons/LightningIcon';
import ModifierTag from './ModifierTag';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import useEditCyberneticPowerMutation from '../hooks/cyberneticStatHooks/useEditCyberneticPowerMutation/useEditCyberneticPowerMutation';
import useRefreshCyberneticPowerMutation from '../hooks/cyberneticStatHooks/useRefreshCyberneticPowerMutation/useRefreshCyberneticPowerMutation';
import BtnControl from './buttons/BtnControl';
import PowerIcon from './icons/PowerIcon';
import BodyIcon from './icons/BodyIcon';

const CyberneticControls = ({
  cyberneticId,
  stats,
}: {
  cyberneticId: number;
  stats: CyberneticStats;
}) => {
  const { apiUrl } = useContext(AuthContext);

  const editCurrentPower = useEditCyberneticPowerMutation(apiUrl, cyberneticId);
  const refreshPower = useRefreshCyberneticPowerMutation(apiUrl, cyberneticId);

  return (
    <div className="col-span-2 flex flex-wrap items-center justify-start gap-4">
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

const CyberneticCard = ({
  cybernetic,
  mode,
}: {
  cybernetic: CyberneticWithKeywords;
  mode: string;
}) => {
  return (
    <ItemCard
      item={cybernetic}
      category="cybernetics"
      mode={mode}
      controls={
        <CyberneticControls
          cyberneticId={cybernetic.id}
          stats={cybernetic.stats}
        />
      }
    >
      {cybernetic.stats.cyber && (
        <StatCard label="CBR" stat={cybernetic.stats.cyber}>
          <CyberIcon className="size-8" />
        </StatCard>
      )}
      {mode === 'equipment'
        ? cybernetic.stats.power &&
          cybernetic.stats.currentPower !== null && (
            <StatCard
              label="PWR"
              stat={`${cybernetic.stats.currentPower} / ${cybernetic.stats.power}`}
            >
              <LightningIcon className="size-8" />
            </StatCard>
          )
        : cybernetic.stats.power && (
            <StatCard label="PWR" stat={cybernetic.stats.power}>
              <LightningIcon className="size-8" />
            </StatCard>
          )}
      {cybernetic.modifiers?.length > 0 &&
        cybernetic.modifiers?.map((modifier: Modifier, index: number) => (
          <ModifierTag key={index} modifier={modifier} />
        ))}
    </ItemCard>
  );
};

export default CyberneticCard;
