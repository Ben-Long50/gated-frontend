import ItemCard from './ItemCard';
import { CyberneticStats, CyberneticWithKeywords } from 'src/types/cybernetic';
import LightningIcon from './icons/LightningIcon';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import useEditCyberneticPowerMutation from '../hooks/cyberneticStatHooks/useEditCyberneticPowerMutation/useEditCyberneticPowerMutation';
import BtnControl from './buttons/BtnControl';
import PowerIcon from './icons/PowerIcon';
import { useParams } from 'react-router-dom';
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

  return (
    <div className="col-span-2 grid grid-cols-1 items-center justify-start gap-4 sm:grid-cols-2">
      {stats.currentPower !== undefined && (
        <BtnControl
          title="Activate"
          icon={<LightningIcon className="size-8 text-inherit" />}
          mutation={stats.currentPower > 0 ? editCurrentPower : null}
          value={-1}
        />
      )}

      {stats.currentPower !== undefined && stats.power !== undefined && (
        <BtnControl
          title="Use Power Cell"
          icon={<PowerIcon className="size-8 text-inherit" />}
          mutation={stats.currentPower < stats.power ? editCurrentPower : null}
          value={
            stats.power - stats.currentPower < 3
              ? stats.power - stats.currentPower
              : 3
          }
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
