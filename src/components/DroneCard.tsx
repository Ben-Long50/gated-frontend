import ItemCard from './ItemCard';
import ItemCardMobile from './ItemCardMobile';
import { Drone, DroneStats } from 'src/types/drone';
import BtnControl from './buttons/BtnControl';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useParams } from 'react-router-dom';
import LightningIcon from './icons/LightningIcon';
import PowerIcon from './icons/PowerIcon';
import HealthIcon from './icons/HealthIcon';
import HullIcon from './icons/HullIcon';
import useRefreshDronePowerMutation from '../hooks/droneStatHooks/useRefreshDronePowerMutation/useRefreshDronePowerMutation';
import useEditDronePowerMutation from '../hooks/droneStatHooks/useEditDronePowerMutation/useEditDronePowerMutation';
import useDroneHealthMutation from '../hooks/droneStatHooks/useDroneHealthMutation/useDroneHealthMutation';

const DroneCard = ({
  drone,
  mode,
  ownerId,
}: {
  drone: Drone;
  mode: string;
  ownerId?: number;
}) => {
  const { user } = useContext(AuthContext);

  return (
    <ItemCard
      item={drone}
      category="drones"
      mode={mode}
      controls={
        ownerId === user?.id ? (
          <DroneControls droneId={drone.id} stats={drone.stats} />
        ) : null
      }
    />
  );
};

export const DroneCardMobile = ({
  drone,
  mode,
  ownerId,
}: {
  drone: Drone;
  mode: string;
  ownerId?: number;
}) => {
  const { user } = useContext(AuthContext);

  return (
    <ItemCardMobile
      item={drone}
      category="drones"
      mode={mode}
      controls={
        ownerId === user?.id ? (
          <DroneControls droneId={drone.id} stats={drone.stats} />
        ) : null
      }
    />
  );
};

const DroneControls = ({
  stats,
  droneId,
}: {
  stats: DroneStats;
  droneId: number;
}) => {
  const { apiUrl } = useContext(AuthContext);
  const { characterId } = useParams();

  const editDroneHealth = useDroneHealthMutation(
    apiUrl,
    droneId,
    Number(characterId),
  );
  const editCurrentPower = useEditDronePowerMutation(
    apiUrl,
    droneId,
    Number(characterId),
  );
  const refreshDronePower = useRefreshDronePowerMutation(
    apiUrl,
    droneId,
    Number(characterId),
  );

  return (
    <div className="col-span-2 flex flex-wrap items-center justify-start gap-4">
      {stats.currentHealth && stats.currentHealth > 0 ? (
        <BtnControl
          title="Take Damage"
          icon={
            <HealthIcon className="text-secondary group-hover:text-accent size-8" />
          }
          mutation={editDroneHealth}
          value={-1}
        />
      ) : null}
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
      {stats.currentHealth ? (
        <BtnControl
          title="Repair Drone"
          icon={
            <HullIcon className="text-secondary group-hover:text-accent size-8" />
          }
          mutation={editDroneHealth}
          value={stats.maxHealth}
        />
      ) : null}
      {stats.power && (
        <BtnControl
          title="Recharge"
          icon={
            <PowerIcon className="text-secondary group-hover:text-accent size-8" />
          }
          mutation={refreshDronePower}
        />
      )}
    </div>
  );
};

export default DroneCard;
