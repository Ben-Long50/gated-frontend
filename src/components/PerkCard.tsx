import { mdiChevronDown, mdiSquare, mdiTriangleSmallUp } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useState } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

const PerkCard = (props) => {
  const { accentPrimary } = useContext(ThemeContext);
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <div
      className={`${props.className} bg-secondary timing group p-4 clip-4 [&_summary::-webkit-details-marker]:hidden`}
      onClick={async (e) => {
        e.preventDefault();
        setDetailsOpen(!detailsOpen);
      }}
    >
      <summary
        className={`text-primary timing flex items-center justify-between text-xl font-semibold tracking-widest`}
      >
        <span className="pl-2"> {props.perk.name}</span>
        <span className={`timing shrink-0 ${detailsOpen && '-rotate-180'}`}>
          <Icon
            path={mdiChevronDown}
            size={1.1}
            className={`text-secondary`}
          ></Icon>
        </span>
      </summary>
      <div
        className={`timing ease-in-out ${!detailsOpen ? 'max-h-0' : 'max-h-[300px]'} scrollbar-secondary flex flex-col gap-2 overflow-y-auto`}
      >
        <div></div>
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
    </div>
  );
};

export default PerkCard;
