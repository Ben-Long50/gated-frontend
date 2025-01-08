import { mdiChevronDown, mdiSquare, mdiTriangleSmallUp } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const PerkCard = ({ perk }, props) => {
  const { accentPrimary } = useContext(ThemeContext);
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
      className={`${props.className} bg-secondary flex w-full flex-col p-4 clip-4`}
      onClick={async (e) => {
        e.preventDefault();
        setDetailsOpen(!detailsOpen);
      }}
    >
      <div className={`text-primary flex w-full items-center justify-between`}>
        <div className="flex w-full items-center justify-between gap-4 pr-2">
          <h3> {perk.name}</h3>
          {(user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
            <Link to={`${perk.id}/update`}>
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
      </div>
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
          <ul className="list-disc py-4">
            {Object.entries(perk.requirements).length === 0 ? (
              <p>N/A</p>
            ) : (
              Object.entries(perk.requirements).map(
                ([attribute, { points, skills }]) => (
                  <li key={attribute} className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <p className="text-primary mr-2 text-xl font-semibold">
                        {attribute.charAt(0).toUpperCase() + attribute.slice(1)}
                      </p>
                      <div className="flex gap-2">
                        {Array.from({ length: points }).map((_, index) => (
                          <Icon
                            key={index}
                            path={mdiSquare}
                            size={1}
                            color={accentPrimary}
                          />
                        ))}
                      </div>
                    </div>
                    {Object.entries(skills).map(([skill, { points }]) => {
                      return (
                        <div key={skill} className="flex items-center gap-2">
                          <Icon
                            className="text-primary"
                            path={mdiTriangleSmallUp}
                            rotate={90}
                            size={1}
                          />
                          <p className="text-secondary mr-2">
                            {skill.charAt(0).toUpperCase() + skill.slice(1)}
                          </p>
                          <div className="flex gap-2">
                            {Array.from({ length: points }).map((_, index) => (
                              <Icon
                                className="text-primary"
                                key={index}
                                path={mdiSquare}
                                size={1}
                              />
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </li>
                ),
              )
            )}
          </ul>
          <p className="text-secondary">{perk.description}</p>
        </div>
      </div>
    </div>
  );
};

export default PerkCard;
