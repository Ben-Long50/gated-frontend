import { useContext, useRef } from 'react';
import Tag from './Tag';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import DieIcon from './icons/DieIcon';
import { Action } from 'src/types/action';
import ItemCardSmall from './ItemCardSmall';
import Icon from '@mdi/react';
import { mdiTriangleDown } from '@mdi/js';
import ActionStatBars from './ActionStatBars';

const ActionCard = ({ action, mode }: { action: Action; mode?: string }) => {
  const { user } = useContext(AuthContext);

  const cardRef = useRef(null);

  const costLength = action?.costs ? Object.keys(action.costs).length : 0;

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
      <div className="flex flex-col gap-4 pt-2">
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
                <DieIcon className="text-secondary size-8" />
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
        {costLength > 0 && (
          <div className="flex w-full flex-col justify-start gap-2">
            <p className="text-accent text-base tracking-widest">Costs</p>
            <div
              className={`${cardRef.current?.offsetWidth < 500 ? 'gap-2 px-2' : 'gap-4 px-4'} grid h-full w-full grow grid-cols-[auto_auto_1fr_auto] place-items-center gap-y-2 border-x-2 border-gray-400 border-opacity-50`}
            >
              <ActionStatBars
                stats={action.costs}
                cardWidth={cardRef.current?.offsetWidth}
              />
            </div>
          </div>
        )}
        <p className="text-secondary">{action?.description}</p>
      </div>
    </ItemCardSmall>
  );
};

export default ActionCard;
