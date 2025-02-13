import { Modifier } from 'src/types/modifier';
import DieIcon from './icons/DieIcon';
import Icon from '@mdi/react';
import { mdiTriangleDown } from '@mdi/js';

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
      className={`${modifier.operator === 'add' || modifier.operator === 'multiply' ? 'border-green-400' : 'border-red-600'} bg-tertiary mr-auto flex max-w-[150px] flex-wrap items-center gap-2 rounded-md border px-2 py-1 shadow-md shadow-zinc-950`}
    >
      <p className="text-center">
        {symbol + ' ' + modifier.value + ' ' + stats[modifier.stat]}
      </p>
    </div>
  ) : (
    <div
      className={`${modifier.operator === 'add' || modifier.operator === 'multiply' ? 'border-green-400' : 'border-red-600'} bg-tertiary mr-auto flex flex-wrap items-center justify-center gap-x-2 gap-y-0 rounded-md border p-2 shadow-md shadow-zinc-950`}
    >
      {modifier.value && (
        <div className="flex items-center gap-0.5">
          {Array.from({ length: modifier.value }).map((_, index) => (
            <DieIcon key={index} className="size-7 shrink-0" />
          ))}
        </div>
      )}
      {modifier.valueType === 'attribute' && modifier.attribute && (
        <>
          <DieIcon className="size-8 shrink-0" />
          <p className="font-semibold">
            {modifier.attribute[0].toUpperCase() + modifier.attribute?.slice(1)}
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
          <DieIcon className="size-8 shrink-0" />
          <p className="font-semibold">
            {modifier.skill[0].toUpperCase() + modifier.skill?.slice(1)}
          </p>
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
