import {
  mdiChevronDown,
  mdiCircle,
  mdiSquare,
  mdiTriangleSmallUp,
} from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { Modifier } from 'src/types/modifier';
import DieIcon from './icons/DieIcon';
import { Perk } from 'src/types/perk';

const PerkCard = ({ perk, type }: { perk: Perk; type?: string }) => {
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
      className={`bg-secondary flex w-full cursor-pointer flex-col p-4 clip-4`}
      onClick={async (e) => {
        e.preventDefault();
        setDetailsOpen(!detailsOpen);
      }}
    >
      <div className={`text-primary flex w-full items-center justify-between`}>
        <div className="flex w-full items-center justify-between gap-4 pr-2">
          <h3> {perk.name}</h3>
          {type === 'codex' &&
            (user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
              <Link to={`/glam/codex/perks/${perk.id}/update`}>
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
          <div className="list-disc pt-4">
            {Object.entries(perk.requirements).length === 0 ? (
              <div className="flex items-center gap-2">
                <Icon
                  className="text-primary"
                  path={mdiTriangleSmallUp}
                  rotate={90}
                  size={1}
                />
                <p>No skill requirements</p>
              </div>
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
          </div>
          {perk.modifiers?.length > 0 && (
            <div className="flex flex-col gap-4">
              {perk.modifiers?.map((modifier: Modifier, index: number) => {
                let symbol = '';
                switch (modifier.operator) {
                  case 'add':
                    symbol = '+';
                    break;
                  case 'subtract':
                    symbol = '-';
                    break;
                  case 'divide':
                    symbol = '/';
                    break;
                  case 'multiply':
                    symbol = 'x';
                    break;
                  default:
                    break;
                }
                return modifier.type === 'Stat' ? (
                  <div className="flex items-center gap-2 pl-2" key={index}>
                    <Icon
                      className={`${symbol === '+' || symbol === 'x' ? 'dark:text-green-400' : 'text-error'}`}
                      path={mdiCircle}
                      size={0.35}
                    />
                    <p>{symbol + ' ' + modifier.value + ' ' + modifier.stat}</p>
                  </div>
                ) : (
                  <div className="flex items-center gap-2" key={index}>
                    <Icon
                      className={`${symbol === '+' || symbol === 'x' ? 'dark:text-green-400' : 'text-error'}`}
                      path={mdiCircle}
                      size={0.35}
                    />
                    <p>{symbol}</p>
                    <DieIcon className="size-7" />
                    <p>{modifier.action.name}</p>
                  </div>
                );
              })}
            </div>
          )}
          <p className="text-secondary">{perk.description}</p>
        </div>
      </div>
    </div>
  );
};

export default PerkCard;
