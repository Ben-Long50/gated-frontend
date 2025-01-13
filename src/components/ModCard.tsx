import { mdiChevronDown } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useEffect, useRef, useState } from 'react';
import Tag from './Tag';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const ModCard = ({ modification }, props) => {
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
      className={`${props.className} bg-secondary mb-auto w-full cursor-pointer p-4 clip-4`}
      onClick={async (e) => {
        e.preventDefault();
        setDetailsOpen(!detailsOpen);
      }}
    >
      <summary
        className={`text-primary flex w-full items-center justify-between`}
      >
        <div className="flex w-full items-center justify-between gap-4 pr-2">
          <h3> {modification.name}</h3>
          <div
            className="pointer-events-auto -my-2 flex items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            {(user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
              <Link
                to={`/glam/codex/vehicles/modifications/${modification.id}/update`}
              >
                <button className="text-accent hover:underline">Edit</button>
              </Link>
            )}
          </div>
        </div>
        <span className={`timing shrink-0 ${detailsOpen && '-rotate-180'}`}>
          <Icon
            path={mdiChevronDown}
            size={1.1}
            className={`text-secondary`}
          ></Icon>
        </span>
      </summary>
      <div className={`${detailsOpen && 'pt-4'} timing overflow-hidden`}>
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
          <p className="text-tertiary mr-auto">
            ({modification.modificationType})
          </p>
          <p className="text-secondary">{modification.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ModCard;
