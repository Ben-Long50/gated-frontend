import ActionIcon from './icons/ActionIcon';
import DieIcon from './icons/DieIcon';
import HealthIcon from './icons/HealthIcon';
import PowerIcon from './icons/PowerIcon';
import ReactionIcon from './icons/ReactionIcon';
import SanityIcon from './icons/SanityIcon';
import WyrmShellIcon from './icons/WyrmShellIcon';

const SubactionCard = ({ action }) => {
  return (
    <div
      key={action.name}
      className="flex h-full grow flex-col items-start justify-start gap-4"
    >
      <div className="flex items-center justify-start gap-4">
        <h3> {action.name}</h3>
        <p className="text-tertiary italic">
          ({action.actionType[0].toUpperCase() + action.actionType.slice(1)})
        </p>
      </div>
      {action.attribute && (
        <div className="flex items-center gap-4">
          <DieIcon className="size-8" />
          <p>
            {action.attribute[0].toUpperCase() +
              action.attribute.slice(1) +
              ': ' +
              action.skill[0].toUpperCase() +
              action.skill.slice(1)}
          </p>
        </div>
      )}
      {action.costs.length > 0 && (
        <div className="flex flex-wrap items-center justify-start gap-8">
          <p className="font-semibold tracking-widest">Costs</p>
          {action.costs.map((cost) => {
            return (
              <div key={cost.stat} className="flex flex-col items-center">
                <div className="flex items-center gap-2">
                  {cost.stat === 'health' && <HealthIcon className="size-8" />}
                  {cost.stat === 'sanity' && <SanityIcon className="size-8" />}
                  {cost.stat === 'actionPoints' && (
                    <ActionIcon className="size-8" />
                  )}
                  {cost.stat === 'reactionPoints' && (
                    <ReactionIcon className="size-8" />
                  )}
                  {cost.stat === 'power' && <PowerIcon className="size-8" />}
                  {cost.stat === 'wyrmShells' && (
                    <WyrmShellIcon className="size-8" />
                  )}
                  <p className="sm:pt-1">{cost.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <p>{action.description}</p>
    </div>
  );
};

export default SubactionCard;
