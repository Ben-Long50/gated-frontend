import { mdiChevronDown, mdiSquare, mdiTriangleSmallUp } from '@mdi/js';
import Icon from '@mdi/react';

const PerkCard = (props) => {
  return (
    <details className="bg-secondary group rounded-md p-3 [&_summary::-webkit-details-marker]:hidden">
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
          {props.perk.reqirements.map((requirement, index) => (
            <li key={index} className="flex items-center gap-2">
              <Icon
                className="text-primary"
                path={mdiTriangleSmallUp}
                rotate={90}
                size={1}
              />
              <p className="mr-2">{requirement.attribute}</p>
              <div className="flex gap-2">
                {Array.from({ length: requirement.points }).map((_, index) => (
                  <Icon
                    className="text-primary"
                    key={index}
                    path={mdiSquare}
                    size={1}
                  />
                ))}
              </div>
            </li>
          ))}
        </ul>
        <strong className="text-primary text-lg tracking-wide">
          Description:
        </strong>
        <p className="text-secondary">{props.perk.description}</p>
      </div>
    </details>
  );
};

export default PerkCard;
