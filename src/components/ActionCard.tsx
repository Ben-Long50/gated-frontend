import { mdiChevronDown } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useEffect, useRef, useState } from 'react';
import Tag from './Tag';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import HealthIcon from './icons/HealthIcon';
import SanityIcon from './icons/SanityIcon';
import ActionIcon from './icons/ActionIcon';
import PowerIcon from './icons/PowerIcon';
import ReactionIcon from './icons/ReactionIcon';
import DieIcon from './icons/DieIcon';
import { Action } from 'src/types/action';

const ActionCard = ({ action, mode }: { action: Action; mode?: string }) => {
  const { user } = useContext(AuthContext);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailHeight, setDetailHeight] = useState(1000);

  const detailRef = useRef(null);

  useEffect(() => {
    if (detailRef.current) {
      setDetailHeight(detailRef.current.offsetHeight);
    }
  }, [detailRef.current]);

  return (
    <div className="w-full rounded-br-4xl rounded-tl-4xl shadow-md shadow-zinc-950">
      <div
        className={`bg-secondary mb-auto w-full cursor-pointer p-4 clip-4`}
        onClick={async (e) => {
          e.preventDefault();
          setDetailsOpen(!detailsOpen);
        }}
      >
        <summary
          className={`text-primary flex w-full items-center justify-between`}
        >
          <div className="flex w-full items-center justify-between gap-4 pr-2">
            <h3> {action.name}</h3>
            {((mode === 'codex' && user?.role === 'ADMIN') ||
              (mode === 'codex' && user?.role === 'SUPERADMIN')) && (
              <Link to={`/glam/codex/actions/${action.id}/update`}>
                <button className="text-accent hover:underline">Edit</button>
              </Link>
            )}
          </div>
          <span className={`timing shrink-0 ${detailsOpen && '-rotate-180'}`}>
            <Icon
              path={mdiChevronDown}
              size={1.1}
              className={`text-secondary`}
            ></Icon>
          </span>
        </summary>
        <div className="overflow-hidden">
          <div
            ref={detailRef}
            className="timing flex flex-col gap-4"
            style={
              detailsOpen
                ? {
                    marginTop: 0,
                  }
                : {
                    marginTop: -detailHeight - 4,
                  }
            }
          >
            <div className="flex items-center gap-2 pt-4">
              {action.actionSubtypes?.map((subtype) => {
                return (
                  <Tag
                    key={subtype}
                    label={subtype[0].toUpperCase() + subtype.slice(1)}
                  />
                );
              })}
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
            {action.costs?.length > 0 && (
              <div className="flex flex-wrap items-center justify-start gap-4">
                <p className="font-semibold tracking-widest">Costs</p>
                {action.costs.map((cost) => {
                  return (
                    <div key={cost.stat} className="flex flex-col items-center">
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
                          <PowerIcon className="size-8" />
                        )}
                        <p className="sm:pt-1">{cost.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            <p className="text-secondary">{action.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionCard;
