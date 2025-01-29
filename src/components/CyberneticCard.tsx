import { mdiCircle } from '@mdi/js';
import Icon from '@mdi/react';
import CyberIcon from './icons/CyberIcon';
import PowerIcon from './icons/PowerIcon';
import BodyIcon from './icons/BodyIcon';
import { Modifier } from 'src/types/modifier';
import DieIcon from './icons/DieIcon';
import ItemCard from './ItemCard';
import { CyberneticWithKeywords } from 'src/types/cybernetic';
import StatCard from './StatCard';

const CyberneticCard = ({
  cybernetic,
  type,
}: {
  cybernetic: CyberneticWithKeywords;
  type: string;
}) => {
  return (
    <ItemCard item={cybernetic} category="cybernetics" type={type}>
      {cybernetic.stats.cyber && (
        <StatCard label="CBR" stat={cybernetic.stats.cyber}>
          <CyberIcon className="size-8" />
        </StatCard>
      )}
      {cybernetic.stats.power && (
        <StatCard label="PWR" stat={cybernetic.stats.power}>
          <PowerIcon className="size-8" />
        </StatCard>
      )}
      {cybernetic.modifiers?.length > 0 && (
        <div className="my-auto">
          <div className="flex h-full flex-col justify-evenly gap-4">
            <p className="text-tertiary text-base">Modifiers</p>
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
                <div className="flex items-center gap-2" key={index}>
                  <Icon
                    className={`${symbol === '+' || symbol === 'x' ? 'dark:text-green-400' : 'text-error'}`}
                    path={mdiCircle}
                    size={0.35}
                  />
                  <p>{symbol + ' ' + modifier.value + ' ' + modifier.stat}</p>
                </div>
              ) : (
                <div className="flex items-center gap-2" key={index}>
                  <Icon
                    className={`${symbol === '+' || symbol === 'x' ? 'dark:text-green-400' : 'text-error'}`}
                    path={mdiCircle}
                    size={0.35}
                  />
                  <p>{symbol}</p>
                  <DieIcon className="size-7" />
                  <p>{modifier.action?.name}</p>
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
