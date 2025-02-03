import { mdiChevronDown } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { Modification } from 'src/types/vehicle';
import CardPrice from './CardPrice';
import ItemRarity from './ItemRarity';

const ModCard = ({
  vehicleId,
  modification,
  mode,
}: {
  vehicleId?: number;
  modification: Modification;
  mode: string;
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
            <div className="flex items-center gap-4">
              <h3>{modification?.name}</h3>
              <p className="text-error italic">
                {modification?.vehicleId &&
                  modification.vehicleId !== vehicleId &&
                  '(Currently equipped on another vehicle)'}
              </p>
            </div>

            <div
              className="pointer-events-auto -my-2 flex items-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-4">
                {mode === 'codex' && (
                  <CardPrice
                    price={modification?.price}
                    category="modifications"
                    itemId={modification?.id}
                  />
                )}
              </div>
              {((mode === 'codex' && user?.role === 'ADMIN') ||
                (mode === 'codex' && user?.role === 'SUPERADMIN')) &&
                mode === 'codex' && (
                  <Link
                    to={`/glam/codex/vehicles/modifications/${modification.id}/update`}
                  >
                    <button className="text-accent hover:underline">
                      Edit
                    </button>
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
        <div className={`${detailsOpen && 'pr-1 pt-4'} timing overflow-hidden`}>
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
            <div className="flex flex-wrap items-center justify-between gap-8">
              <p className="text-tertiary mr-auto italic">
                ({modification.modificationType})
              </p>
              <ItemRarity
                rarity={modification.rarity}
                grade={modification.grade}
              />
            </div>

            <p className="text-secondary">{modification.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModCard;
