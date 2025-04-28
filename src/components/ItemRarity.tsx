import { mdiStar } from '@mdi/js';
import Icon from '@mdi/react';

const ItemRarity = ({
  rarity,
  grade,
  className,
  cardWidth,
}: {
  rarity: string;
  grade: number;
  className?: string;
  cardWidth: number;
}) => {
  return (
    <div
      className={`${className} ${cardWidth < 500 ? 'gap-x-2' : 'gap-x-4'} flex items-center justify-start`}
    >
      {rarity === 'common' ? (
        <h5 className="text-2xl font-semibold italic tracking-wide text-gray-400">
          {cardWidth < 500 ? 'C' : 'Common'}
        </h5>
      ) : rarity === 'uncommon' ? (
        <h5 className="text-shadow break-words text-2xl font-semibold italic tracking-wider text-green-500 text-shadow-blur-1 text-shadow-x-1 text-shadow-y-1 text-shadow-green-700">
          {cardWidth < 500 ? 'U' : 'Uncommon'}
        </h5>
      ) : rarity === 'rare' ? (
        <h5 className="text-shadow font-zen text-2xl font-semibold italic tracking-widest text-red-600 text-shadow-blur-1 text-shadow-x-1 text-shadow-y-1 text-shadow-red-900">
          {cardWidth < 500 ? 'R' : 'Rare'}
        </h5>
      ) : rarity === 'blackMarket' ? (
        <h5 className="text-shadow text-wrap text-right font-logo text-2xl font-semibold tracking-widest text-purple-700 text-shadow-blur-1 text-shadow-x-1 text-shadow-y-1 text-shadow-purple-900">
          {cardWidth < 500 ? 'B' : 'Black Market'}
        </h5>
      ) : rarity === 'artifact' ? (
        <h5 className="text-shadow font-kings text-3xl font-semibold tracking-widest text-amber-400 text-shadow-blur-1 text-shadow-x-1 text-shadow-y-1 text-shadow-amber-700">
          {cardWidth < 500 ? 'A' : 'Artifact'}
        </h5>
      ) : (
        <h5 className="text-2xl font-semibold text-gray-500">Unknown</h5>
      )}
      <div className="flex">
        {Array.from({ length: grade }).map((_, index) => (
          <Icon key={index} path={mdiStar} className="size-6 text-yellow-300" />
        ))}
      </div>
    </div>
  );
};

export default ItemRarity;
