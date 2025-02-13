import { useContext } from 'react';
import Tag from './Tag';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import HealthIcon from './icons/HealthIcon';
import SanityIcon from './icons/SanityIcon';
import ActionIcon from './icons/ActionIcon';
import ReactionIcon from './icons/ReactionIcon';
import DieIcon from './icons/DieIcon';
import { Action } from 'src/types/action';
import ItemCardSmall from './ItemCardSmall';
import WyrmShellIcon from './icons/WyrmShellIcon';
import LightningIcon from './icons/LightningIcon';
import Icon from '@mdi/react';
import { mdiTriangleDown } from '@mdi/js';
import StatCard from './StatCard';

const ActionCard = ({ action, mode }: { action: Action; mode?: string }) => {
  const { user } = useContext(AuthContext);

  return (
    <ItemCardSmall
      heading={
        <div className="flex w-full items-center justify-between gap-4 pr-2">
          <h3> {action?.name}</h3>
          {((mode === 'codex' && user?.role === 'ADMIN') ||
            (mode === 'codex' && user?.role === 'SUPERADMIN')) && (
            <Link to={`/glam/codex/actions/${action.id}/update`}>
              <button className="text-accent hover:underline">Edit</button>
            </Link>
          )}
        </div>
      }
    >
      {action?.actionSubtypes?.length > 0 && (
        <div className="flex items-center gap-2">
          {action?.actionSubtypes?.map((subtype) => {
            return (
              <Tag
                key={subtype}
                label={subtype[0].toUpperCase() + subtype.slice(1)}
              />
            );
          })}
        </div>
      )}
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
      <p className="text-secondary">{action?.description}</p>
    </ItemCardSmall>
  );
};

export default ActionCard;
