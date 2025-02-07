import { Modifier } from 'src/types/modifier';
import DieIcon from './icons/DieIcon';

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
  return modifier.type === 'Stat' ? (
    <div
      className={`${modifier.operator === 'add' || modifier.operator === 'multiply' ? 'border-green-400' : 'border-red-600'} bg-tertiary mr-auto flex max-w-[150px] flex-wrap items-center gap-2 rounded-md border px-2 py-1 shadow-md shadow-zinc-950 sm:flex-nowrap`}
    >
      <p className="whitespace-nowrap">
        {symbol + ' ' + modifier.value + ' ' + modifier.stat}
      </p>
    </div>
  ) : (
    <div
      className={`${modifier.operator === 'add' || modifier.operator === 'multiply' ? 'border-green-400' : 'border-red-600'} bg-tertiary flex flex-wrap items-center justify-center gap-x-2 gap-y-0 rounded-md border p-2 shadow-md shadow-zinc-950 sm:flex-nowrap`}
    >
      {Array.from({ length: modifier.dice }).map((_, index) => (
        <DieIcon key={index} className="size-7 shrink-0" />
      ))}
      <p className="text-center">{modifier.action?.name}</p>
    </div>
  );
};
export default ModifierTag;
