import { mdiCircle, mdiSquare } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { Modifier } from 'src/types/modifier';
import { Perk } from 'src/types/perk';
import ItemCardSmall from './ItemCardSmall';
import ModifierTag from './ModifierTag';
import ArrowHeader4 from './ArrowHeader4';

const PerkCard = ({ perk, mode }: { perk: Perk; mode?: string }) => {
  const { accentPrimary } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);

  const attributePoints = Object.entries(perk.requirements).map(
    ([attribute, { points, skills }]) => [attribute, Number(points)],
  ) as [string, number][];

  const skillPoints = Object.entries(perk.requirements).flatMap(
    ([attribute, { points, skills }]) =>
      Object.entries(skills).map(([skill, points]) => [
        skill,
        Number(points.points),
      ]),
  ) as [string, number][];

  return (
    <ItemCardSmall
      heading={
        <div className="flex w-full items-center justify-between gap-4 pr-3">
          <h3>{perk.name}</h3>
          <div className="ml-auto flex flex-col items-end justify-center gap-1">
            {attributePoints.map(([attribute, points]) => {
              return (
                <div className="flex items-center gap-2" key={attribute}>
                  {Array.from({ length: points }).map((_, index) => (
                    <Icon
                      key={index}
                      path={mdiCircle}
                      className="size-6 text-yellow-300"
                    />
                  ))}
                </div>
              );
            })}
            {skillPoints.map(([skill, points]) => {
              return (
                <div className="flex items-center gap-1" key={skill}>
                  {points === 4 ? (
                    <p className="font-zen font-semibold italic tracking-widest">
                      Master
                    </p>
                  ) : (
                    Array.from({ length: points }).map((_, index) => (
                      <Icon
                        key={index}
                        path={mdiCircle}
                        className="size-4 shrink-0 text-gray-200"
                      />
                    ))
                  )}
                </div>
              );
            })}
          </div>
          {mode === 'codex' &&
            ((mode === 'codex' && user?.role === 'ADMIN') ||
              (mode === 'codex' && user?.role === 'SUPERADMIN')) && (
              <Link to={`/glam/codex/perks/${perk.id}/update`}>
                <button className="text-accent hover:underline">Edit</button>
              </Link>
            )}
        </div>
      }
    >
      <div className="list-disc">
        {Object.entries(perk.requirements).length === 0 ? (
          <ArrowHeader4 title="No skill requirements" />
        ) : (
          attributePoints.map(([attribute, points]) => (
            <li key={attribute} className="flex flex-col gap-2">
              {points > 0 && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-between">
                    <ArrowHeader4
                      title={
                        attribute.charAt(0).toUpperCase() + attribute.slice(1)
                      }
                    />
                  </div>
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
              )}
              {skillPoints.map(([skill, points]) => {
                return (
                  <div key={skill} className="flex items-center gap-2">
                    <ArrowHeader4
                      title={skill[0].toUpperCase() + skill.slice(1)}
                    />
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
          ))
        )}
      </div>
      {perk.modifiers?.length > 0 && (
        <div className="flex w-full flex-wrap gap-4">
          {perk.modifiers?.map((modifier: Modifier, index: number) => {
            return <ModifierTag key={index} modifier={modifier} />;
          })}
        </div>
      )}
      <p className="text-secondary">{perk.description}</p>
    </ItemCardSmall>
  );
};

export default PerkCard;
