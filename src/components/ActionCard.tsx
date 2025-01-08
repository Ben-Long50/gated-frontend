import { mdiChevronDown } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useEffect, useRef, useState } from 'react';
import Tag from './Tag';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const ActionCard = ({ action }) => {
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
    <div
      className={`bg-secondary mb-auto w-full p-4 clip-4`}
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
          {(user.role === 'ADMIN' || user.role === 'SUPERADMIN') && (
            <Link to={`${action.id}/update`}>
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
          className="timing"
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
          <div className="flex items-center gap-2 py-4">
            {action.actionSubtypes.map((subtype) => {
              return (
                <Tag
                  key={subtype}
                  label={subtype[0].toUpperCase() + subtype.slice(1)}
                />
              );
            })}
          </div>
          <p className="text-secondary">{action.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ActionCard;
