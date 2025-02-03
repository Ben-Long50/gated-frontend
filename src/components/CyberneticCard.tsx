import { mdiCircle } from '@mdi/js';
import Icon from '@mdi/react';
import CyberIcon from './icons/CyberIcon';
import BodyIcon from './icons/BodyIcon';
import { Modifier } from 'src/types/modifier';
import DieIcon from './icons/DieIcon';
import ItemCard from './ItemCard';
import { CyberneticWithKeywords } from 'src/types/cybernetic';
import StatCard from './StatCard';
import LightningIcon from './icons/LightningIcon';

const CyberneticCard = ({
  cybernetic,
  mode,
}: {
  cybernetic: CyberneticWithKeywords;
  mode: string;
}) => {
  return (
    <ItemCard item={cybernetic} category="cybernetics" mode={mode}>
      {cybernetic.stats.cyber && (
        <StatCard label="CBR" stat={cybernetic.stats.cyber}>
          <CyberIcon className="size-8" />
        </StatCard>
      )}
      {cybernetic.stats.power && (
        <StatCard label="PWR" stat={cybernetic.stats.power}>
          <LightningIcon className="size-8" />
        </StatCard>
      )}
      {cybernetic.modifiers?.length > 0 && (
        <div className="col-span-2 my-auto place-self-start">
          <p className="text-tertiary mb-2 text-base">Modifiers</p>
          <div className="flex h-full gap-4">
            {cybernetic.modifiers?.map((modifier: Modifier, index: number) => {
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
                  className={`${modifier.operator === 'add' || modifier.operator === 'multiply' ? 'border-green-400' : 'border-red-600'} bg-tertiary flex items-center gap-2 rounded-md border p-2 shadow-md shadow-zinc-950`}
                  key={index}
                >
                  <p className="whitespace-nowrap">
                    {symbol + ' ' + modifier.value + ' ' + modifier.stat}
                  </p>
                </div>
              ) : (
                <div
                  className={`${modifier.operator === 'add' || modifier.operator === 'multiply' ? 'border-green-400' : 'border-red-600'} bg-tertiary flex items-center gap-2 rounded-md border p-2 shadow-md shadow-zinc-950`}
                  key={index}
                >
                  <p>{symbol}</p>
                  {Array.from({ length: modifier.dice }).map((_, index) => (
                    <DieIcon key={index} className="size-7" />
                  ))}
                  <p className="whitespace-nowrap">{modifier.action?.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </ItemCard>
  );
};

export default CyberneticCard;
