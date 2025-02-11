import Icon from '@mdi/react';
import ActionIcon from './icons/ActionIcon';
import DieIcon from './icons/DieIcon';
import HealthIcon from './icons/HealthIcon';
import ReactionIcon from './icons/ReactionIcon';
import SanityIcon from './icons/SanityIcon';
import WyrmShellIcon from './icons/WyrmShellIcon';
import { mdiTriangleDown } from '@mdi/js';
import { Action } from 'src/types/action';
import LightningIcon from './icons/LightningIcon';
import StatCard from './StatCard';
import StopwatchIcon from './icons/StopwatchIcon';

const SubactionCard = ({ action }: { action: Action }) => {
  return (
    <div
      key={action.name}
      className="flex h-full grow flex-col items-start justify-start gap-4"
    >
      <div className="flex w-full items-center justify-start gap-4">
        <h3> {action.name}</h3>
        <p className="text-tertiary italic">
          ({action.actionType[0].toUpperCase() + action.actionType.slice(1)})
        </p>
        {action.duration && (
          <div className="ml-auto flex items-center gap-4">
            <StopwatchIcon className="size-7" />
            <p>{action.duration?.value}</p>
            <p>
              {action.duration?.unit[0].toUpperCase() +
                action.duration?.unit.slice(1)}
            </p>
          </div>
        )}
      </div>
      {action?.roll && action?.roll.length > 0 && (
        <div className="flex flex-col gap-2">
          {action.roll.map((roll, index) => (
            <div key={index} className="flex items-center gap-4">
              <DieIcon className="size-8" />
              <p className="font-semibold">
                {roll.attribute[0].toUpperCase() + roll.attribute.slice(1)}
              </p>
              <Icon
                className="text-secondary"
                path={mdiTriangleDown}
                size={0.35}
                rotate={-90}
              />
              <p>{roll.skill[0].toUpperCase() + roll.skill.slice(1)}</p>
            </div>
          ))}
        </div>
      )}
      {action?.costs?.length > 0 && (
        <div className="flex w-full flex-col justify-start gap-2">
          <p className="text-accent text-base tracking-widest">Costs</p>
          <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(100px,max-content))] items-center justify-start gap-4">
            {action?.costs.map((cost) => {
              return (
                <StatCard key={cost.stat} stat={cost.value}>
                  <div className="flex items-center gap-2">
                    {cost.stat === 'health' && (
                      <HealthIcon className="size-8" />
                    )}
                    {cost.stat === 'sanity' && (
                      <SanityIcon className="size-8" />
                    )}
                    {cost.stat === 'actionPoints' && (
                      <ActionIcon className="size-8" />
                    )}
                    {cost.stat === 'reactionPoints' && (
                      <ReactionIcon className="size-8" />
                    )}
                    {cost.stat === 'power' && (
                      <LightningIcon className="size-8" />
                    )}
                    {cost.stat === 'wyrmShells' && (
                      <WyrmShellIcon className="size-8" />
                    )}
                  </div>
                </StatCard>
              );
            })}
          </div>
        </div>
      )}
      <p>{action.description}</p>
    </div>
  );
};

export default SubactionCard;
