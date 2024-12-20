import { mdiChevronDown, mdiSquare, mdiTriangleSmallUp } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

const PerkCard = (props) => {
  const { accentPrimary } = useContext(ThemeContext);

  return (
    <details
      className={`${props.className} bg-secondary group rounded-md p-3 [&_summary::-webkit-details-marker]:hidden`}
    >
      <summary className="text-primary flex items-center justify-between text-xl font-semibold tracking-widest">
        <span> {props.perk.name}</span>
        <span className="shrink-0 transition duration-300 group-open:-rotate-180">
          <Icon
            path={mdiChevronDown}
            size={1.1}
            className={`text-secondary`}
          ></Icon>
        </span>
      </summary>
      <div className="mt-4 flex flex-col gap-2">
        <strong className="text-primary text-lg tracking-wide">
          Requirements:
        </strong>
        <ul className="list-disc">
          {Object.entries(props.perk.requirements).length === 0 ? (
            <p>N/A</p>
          ) : (
            Object.entries(props.perk.requirements).map(
              ([attribute, { points, skills }]) => (
                <li key={attribute} className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <p className="text-primary mr-2 text-lg">
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
        <strong className="text-primary mt-2 text-lg tracking-wide">
          Description:
        </strong>
        <p className="text-secondary">{props.perk.description}</p>
      </div>
    </details>
  );
};

export default PerkCard;
