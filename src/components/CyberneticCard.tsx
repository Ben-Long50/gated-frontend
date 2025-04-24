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
import StatBar from './StatBar';
import { useParams } from 'react-router-dom';

const CyberneticControls = ({
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
  const refreshPower = useRefreshCyberneticPowerMutation(
    apiUrl,
    cyberneticId,
    Number(characterId),
  );

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
      <CyberneticStatBars stats={cybernetic.stats} mode={mode} />
      {cybernetic.weapons?.length > 0 && (
        <div className="col-span-4 flex w-full items-center justify-between">
          <h4 className="text-accent">Integrated Weapons</h4>
          <p>{cybernetic.weapons.length}</p>
        </div>
      )}
      {cybernetic.armor?.length > 0 && (
        <div className="col-span-4 flex w-full items-center justify-between">
          <h4 className="text-accent">Integrated Armor</h4>
          <p>{cybernetic.armor.length}</p>
        </div>
      )}
      {cybernetic.actions?.length > 0 && (
        <div className="col-span-4 flex w-full items-center justify-between">
          <h4 className="text-accent">Unique Actions</h4>
          <p>{cybernetic.actions.length}</p>
        </div>
      )}
    </ItemCard>
  );
};

export const CyberneticStatBars = ({
  stats,
  mode,
}: {
  stats: CyberneticStats;
  mode?: string;
}) => {
  return (
    <>
      {stats.cyber && (
        <StatBar title="CBR" current={stats.cyber} color="rgb(52 211 153)">
          <CyberIcon className="size-8" />
        </StatBar>
      )}
      {mode === 'equipment'
        ? stats.power &&
          stats.currentPower !== undefined && (
            <StatBar
              title="PWR"
              total={stats.power}
              current={stats.currentPower}
              color="rgb(107, 255, 124)"
            >
              <LightningIcon className="size-8" />
            </StatBar>
          )
        : stats.power && (
            <StatBar
              title="PWR"
              current={stats.power}
              color="rgb(107, 255, 124)"
            >
              <LightningIcon className="size-8" />
            </StatBar>
          )}
    </>
  );
};

export default CyberneticCard;
