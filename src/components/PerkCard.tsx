import { mdiSquare, mdiTriangleSmallUp } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { Modifier } from 'src/types/modifier';
import { Perk } from 'src/types/perk';
import ItemCardSmall from './ItemCardSmall';
import ModifierTag from './ModifierTag';

const PerkCard = ({ perk, mode }: { perk: Perk; mode?: string }) => {
  const { accentPrimary } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);

  return (
    <ItemCardSmall
      heading={
        <div className="flex w-full items-center justify-between gap-4 pr-2">
          <h3> {perk.name}</h3>
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
