import ItemCard from './ItemCard';
import ItemCardMobile from './ItemCardMobile';
import { Drone, DroneStats } from 'src/types/drone';
import BtnControl from './buttons/BtnControl';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useParams } from 'react-router-dom';
import LightningIcon from './icons/LightningIcon';
import PowerIcon from './icons/PowerIcon';
import HullIcon from './icons/HullIcon';
import useEditDronePowerMutation from '../hooks/droneStatHooks/useEditDronePowerMutation/useEditDronePowerMutation';
import useDroneHealthMutation from '../hooks/droneStatHooks/useDroneHullMutation/useDroneHullMutation';
import DamageIcon from './icons/DamageIcon';

export const DroneControls = ({
  stats,
  droneId,
}: {
  stats: DroneStats;
  droneId: number;
}) => {
  const { apiUrl } = useContext(AuthContext);
  const { characterId } = useParams();

  const editDroneHull = useDroneHealthMutation(
    apiUrl,
    droneId,
    Number(characterId),
  );
  const editDronePower = useEditDronePowerMutation(
    apiUrl,
    droneId,
    Number(characterId),
  );

  return (
    <div className="col-span-2 grid grid-cols-1 items-center justify-start gap-4 sm:grid-cols-2">
      {stats.currentHull !== undefined && (
        <BtnControl
          title="Take Damage"
          icon={<DamageIcon className="size-8 text-inherit" />}
          mutation={stats.currentHull > 0 ? editDroneHull : null}
          value={-1}
        />
      )}
      {stats.currentHull !== undefined && stats.hull !== undefined && (
        <BtnControl
          title="Repair Drone"
          icon={<HullIcon className="size-8 text-inherit" />}
          mutation={stats.currentHull < stats.hull ? editDroneHull : null}
          value={stats.hull - stats.currentHull}
        />
      )}
      {stats.currentPower !== undefined && (
        <BtnControl
          title="Activate"
          icon={<LightningIcon className="size-8 text-inherit" />}
          mutation={stats.currentPower > 0 ? editDronePower : null}
          value={-1}
        />
      )}
      {stats.currentPower !== undefined && stats.power !== undefined && (
        <BtnControl
          title="Use Power Cell"
          icon={<PowerIcon className="size-8 text-inherit" />}
          mutation={stats.currentPower < stats.power ? editDronePower : null}
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

export default DroneCard;
