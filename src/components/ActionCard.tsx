import { useContext, useRef } from 'react';
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
import { ThemeContext } from '../contexts/ThemeContext';
import StatBar from './StatBar';

const ActionCard = ({ action, mode }: { action: Action; mode?: string }) => {
  const { user } = useContext(AuthContext);
  const { statColorMap } = useContext(ThemeContext);

  const cardRef = useRef(null);

  return (
    <ItemCardSmall
      cardRef={cardRef}
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
                toolTip={0}
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
              {roll.skill && (
                <>
                  <Icon
                    className="text-secondary"
                    path={mdiTriangleDown}
                    size={0.35}
                    rotate={-90}
                  />
                  <p>{roll.skill[0].toUpperCase() + roll.skill.slice(1)}</p>{' '}
                </>
              )}
            </div>
          ))}
        </div>
      )}
      <div
        className={`${cardRef.current?.offsetWidth < 500 ? 'gap-2 px-2' : 'gap-4 px-4'} grid h-full w-full grow grid-cols-[auto_auto_1fr_auto] place-items-center gap-y-2 border-x-2 border-gray-400 border-opacity-50`}
      >
        {action?.costs.map((cost) => {
          let title;
          let color;

          switch (cost.stat) {
            case 'health':
              title = 'Health';
              color = statColorMap['Health'];
              break;
            case 'sanity':
              title = 'Sanity';
              color = statColorMap['Sanity'];
              break;
            case 'actionPoints':
              title = 'AP';
              color = statColorMap['AP'];
              break;
            case 'reactionPoints':
              title = 'RP';
              color = statColorMap['RP'];
              break;
            case 'power':
              title = 'PWR';
              color = statColorMap['PWR'];
              break;
            case 'wyrmShells':
              title = 'Wyrm Shells';
              color = statColorMap['wyrmShells'];
              break;
            default:
              title = '';
              color = '';
              break;
          }
          return (
            <StatBar
              key={cost.stat}
              current={cost.value}
              title={title}
              color={color}
              cardWidth={cardRef.current?.offsetWidth}
            >
              {cost.stat === 'health' && <HealthIcon className="size-8" />}
              {cost.stat === 'sanity' && <SanityIcon className="size-8" />}
              {cost.stat === 'actionPoints' && (
                <ActionIcon className="size-8" />
              )}
              {cost.stat === 'reactionPoints' && (
                <ReactionIcon className="size-8" />
              )}
              {cost.stat === 'power' && <LightningIcon className="size-8" />}
              {cost.stat === 'wyrmShells' && (
                <WyrmShellIcon className="size-8" />
              )}
            </StatBar>
          );
        })}
      </div>
      <p className="text-secondary">{action?.description}</p>
    </ItemCardSmall>
  );
};

export default ActionCard;
