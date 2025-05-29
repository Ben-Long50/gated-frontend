import { useContext } from 'react';
import MagCapacityIcon from './icons/MagCapacityIcon';
import StatBar from './StatBar';
import { ThemeContext } from '../contexts/ThemeContext';
import HealthIcon from './icons/HealthIcon';
import SanityIcon from './icons/SanityIcon';
import LightningIcon from './icons/LightningIcon';
import ActionIcon from './icons/ActionIcon';
import ReactionIcon from './icons/ReactionIcon';
import WyrmShellIcon from './icons/WyrmShellIcon';

const ActionStatBars = ({
  stats,
  mode,
  cardWidth,
}: {
  stats: any;
  mode?: string;
  cardWidth: number;
}) => {
  const { statColorMap } = useContext(ThemeContext);

  return (
    <>
      {stats.actionPoints && (
        <StatBar
          title="Actions"
          current={stats.actionPoints}
          color={statColorMap['AP']}
          cardWidth={cardWidth}
        >
          <ActionIcon className="text-secondary size-8" />
        </StatBar>
      )}
      {stats.reactionPoints && (
        <StatBar
          title="Reactions"
          current={stats.reactionPoints}
          color={statColorMap['RP']}
          cardWidth={cardWidth}
        >
          <ReactionIcon className="text-secondary size-8" />
        </StatBar>
      )}
      {stats.health && (
        <StatBar
          title="Health"
          current={stats.health}
          color={statColorMap['Health']}
          cardWidth={cardWidth}
        >
          <HealthIcon className="text-secondary size-8" />
        </StatBar>
      )}
      {stats.sanity && (
        <StatBar
          title="Sanity"
          current={stats.sanity}
          color={statColorMap['Sanity']}
          cardWidth={cardWidth}
        >
          <SanityIcon className="text-secondary size-8" />
        </StatBar>
      )}
      {stats.power && (
        <StatBar
          title="PWR"
          current={stats.power}
          color={statColorMap['PWR']}
          cardWidth={cardWidth}
        >
          <LightningIcon className="text-secondary size-8" />
        </StatBar>
      )}
      {stats.currentAmmoCount && (
        <StatBar
          title="MAG"
          current={stats.currentAmmoCount}
          color={statColorMap['MAG']}
          cardWidth={cardWidth}
        >
          <MagCapacityIcon className="text-secondary size-8" />
        </StatBar>
      )}
      {stats.wyrmShells && (
        <StatBar
          title="Wyrm"
          current={stats.wyrmShells}
          color={statColorMap['wyrmShells']}
          cardWidth={cardWidth}
        >
          <WyrmShellIcon className="text-secondary size-8" />
        </StatBar>
      )}
    </>
  );
};

export default ActionStatBars;
