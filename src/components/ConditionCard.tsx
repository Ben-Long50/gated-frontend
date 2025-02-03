import { mdiChevronDown } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { Condition } from 'src/types/condition';

const ConditionCard = ({
  condition,
  mode,
}: {
  condition: Condition;
  mode?: string;
}) => {
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
            <h3> {condition.name}</h3>
            {((mode === 'codex' && user?.role === 'ADMIN') ||
              (mode === 'codex' && user?.role === 'SUPERADMIN')) && (
              <Link to={`/glam/codex/conditions/${condition.id}/update`}>
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
            <p className="text-secondary pt-4">{condition.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConditionCard;
