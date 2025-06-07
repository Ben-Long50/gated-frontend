import { Modifier } from 'src/types/modifier';
import DieIcon from './icons/DieIcon';
import Icon from '@mdi/react';
import { mdiTriangleDown } from '@mdi/js';
import { capitalCase } from 'change-case';

const ModifierTag = ({ modifier }: { modifier: Modifier }) => {
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

  const stats = {
    health: 'Health',
    maxHealth: 'Max health',
    sanity: 'Sanity',
    maxSanity: 'Max sanity',
    cyber: 'Cyber',
    maxCyber: 'Max cyber',
    weight: 'Equip',
    maxWeight: 'Max Equip',
    speed: 'Speed',
    evasion: 'Evasion',
    armor: 'Armor',
    ward: 'Ward',
    permanentInjuries: 'Permanent injury',
    permanentInsanities: 'Permanent insanity',
  };

  return modifier.type === 'stat' ? (
    <div
      className={`${modifier.operator === 'add' || modifier.operator === 'multiply' ? 'border-green-400' : 'border-red-600'} bg-tertiary flex flex-wrap items-center justify-center gap-x-2 gap-y-0 rounded-md border px-2 py-1 shadow-md shadow-zinc-950`}
    >
      <p>{symbol}</p>
      {modifier.value && <p className="text-center">{modifier.value}</p>}
      {modifier.valueType === 'attribute' && modifier.attribute && (
        <>
          <p className="text-center font-semibold">
            {capitalCase(modifier.attribute)}
          </p>
          <Icon
            className="text-secondary shrink-0"
            path={mdiTriangleDown}
            rotate={-90}
            size={0.35}
          />
        </>
      )}
      {modifier.valueType === 'skill' && modifier.skill && (
        <>
          <p className="text-center font-semibold">
            {capitalCase(modifier.skill)}
          </p>
          <Icon
            className="text-secondary shrink-0"
            path={mdiTriangleDown}
            rotate={-90}
            size={0.35}
          />
        </>
      )}
      <p className="text-center">{stats[modifier.stat]}</p>
    </div>
  ) : (
    <div
      className={`${modifier.operator === 'add' || modifier.operator === 'multiply' ? 'border-green-400' : 'border-red-600'} bg-tertiary flex flex-wrap items-center justify-center gap-x-2 gap-y-0 rounded-md border px-2 py-1 shadow-md shadow-zinc-950`}
    >
      {modifier.value && (
        <div className="flex items-center gap-0.5">
          {Array.from({ length: modifier.value }).map((_, index) => (
            <DieIcon key={index} className="text-secondary size-8 shrink-0" />
          ))}
        </div>
      )}
      {modifier.valueType === 'attribute' && modifier.attribute && (
        <>
          <DieIcon className="text-secondary size-8 shrink-0" />
          <p className="font-semibold">{capitalCase(modifier.attribute)}</p>
          <Icon
            className="text-secondary shrink-0"
            path={mdiTriangleDown}
            rotate={-90}
            size={0.35}
          />
        </>
      )}
      {modifier.valueType === 'skill' && modifier.skill && (
        <>
          <DieIcon className="text-secondary size-8 shrink-0" />
          <p className="font-semibold">{capitalCase(modifier.skill)}</p>
          <Icon
            className="text-secondary shrink-0"
            path={mdiTriangleDown}
            rotate={-90}
            size={0.35}
          />
        </>
      )}
      <p className="text-center">{modifier.action?.name}</p>
    </div>
  );
};
export default ModifierTag;
