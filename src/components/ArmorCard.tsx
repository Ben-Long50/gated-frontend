import { mdiChevronDown } from '@mdi/js';
import Icon from '@mdi/react';

const ArmorCard = (props) => {
  return (
    <details className="bg-secondary group rounded-md p-3 [&_summary::-webkit-details-marker]:hidden">
      <summary className="text-primary flex items-center justify-between text-xl font-semibold tracking-widest">
        <span> {props.armor.name}</span>
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
          <span>{props.armor.type}</span>
        </strong>
        <ul className="flex">
          {Object.entries(props.armor.stats).map(([stat, value]) => (
            <li key={stat} className="flex flex-col items-center">
              <p className="w-full border px-3 py-1 text-center">{stat}</p>
              <p className="w-full border p-1 text-center">{value}</p>
            </li>
          ))}
        </ul>
        <ul>
          <strong className="text-primary text-lg tracking-wide">
            Keywords:
          </strong>
          {props.armor.keywords.map((keyword, index) => {
            return <p key={index}>{keyword}</p>;
          })}
        </ul>
        <strong className="text-primary text-lg tracking-wide">
          Description:
        </strong>
        <p className="text-secondary">{props.armor.description}</p>
      </div>
    </details>
  );
};

export default ArmorCard;