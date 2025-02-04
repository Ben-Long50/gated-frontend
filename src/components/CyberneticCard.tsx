import CyberIcon from './icons/CyberIcon';
import BodyIcon from './icons/BodyIcon';
import { Modifier } from 'src/types/modifier';
import DieIcon from './icons/DieIcon';
import ItemCard from './ItemCard';
import { CyberneticWithKeywords } from 'src/types/cybernetic';
import StatCard from './StatCard';
import LightningIcon from './icons/LightningIcon';
import ModifierTag from './ModifierTag';

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
            {cybernetic.modifiers?.map((modifier: Modifier, index: number) => (
              <ModifierTag key={index} modifier={modifier} />
            ))}
          </div>
        </div>
      )}
    </ItemCard>
  );
};

export default CyberneticCard;
