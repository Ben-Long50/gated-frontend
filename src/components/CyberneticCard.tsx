import CyberIcon from './icons/CyberIcon';
import ItemCard from './ItemCard';
import { CyberneticStats, CyberneticWithKeywords } from 'src/types/cybernetic';
import LightningIcon from './icons/LightningIcon';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import useEditCyberneticPowerMutation from '../hooks/cyberneticStatHooks/useEditCyberneticPowerMutation/useEditCyberneticPowerMutation';
import useRefreshCyberneticPowerMutation from '../hooks/cyberneticStatHooks/useRefreshCyberneticPowerMutation/useRefreshCyberneticPowerMutation';
import BtnControl from './buttons/BtnControl';
import PowerIcon from './icons/PowerIcon';
import StatBar from './StatBar';
import { useParams } from 'react-router-dom';
import StatBars from './StatBars';
import ItemCardMobile from './ItemCardMobile';
import { ItemObject } from 'src/types/global';

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
            <LightningIcon className="text-secondary group-hover:text-accent size-8" />
          }
          mutation={editCurrentPower}
          value={-1}
        />
      ) : null}

      {stats.power && (
        <BtnControl
          title="Recharge"
          icon={
            <PowerIcon className="text-secondary group-hover:text-accent size-8" />
          }
          mutation={refreshPower}
        />
      )}
    </div>
  );
};

const CyberneticCard = ({
  cybernetic,
  mode,
  ownerId,
  toggleFormLink,
}: {
  cybernetic: CyberneticWithKeywords;
  mode: string;
  ownerId?: number;
  toggleFormLink?: (item: ItemObject) => void;
}) => {
  const { user } = useContext(AuthContext);

  return (
    <ItemCard
      item={cybernetic}
      category="cybernetics"
      mode={mode}
      controls={
        ownerId === user?.id ? (
          <CyberneticControls
            cyberneticId={cybernetic.id}
            stats={cybernetic.stats}
          />
        ) : null
      }
      toggleFormLink={toggleFormLink}
    />
  );
};

export const CyberneticCardMobile = ({
  cybernetic,
  mode,
  ownerId,
  toggleFormLink,
}: {
  cybernetic: CyberneticWithKeywords;
  mode: string;
  ownerId?: number;
  toggleFormLink?: (item: ItemObject) => void;
}) => {
  const { user } = useContext(AuthContext);

  return (
    <ItemCardMobile
      item={cybernetic}
      category="cybernetics"
      mode={mode}
      controls={
        ownerId === user?.id ? (
          <CyberneticControls
            cyberneticId={cybernetic.id}
            stats={cybernetic.stats}
          />
        ) : null
      }
      toggleFormLink={toggleFormLink}
    />
  );
};

export default CyberneticCard;
