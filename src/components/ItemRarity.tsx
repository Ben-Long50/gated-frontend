import romans from 'romans';

const ItemRarity = ({
  rarity,
  grade,
  className,
}: {
  rarity: string;
  grade: number;
  className?: string;
}) => {
  return (
    <div className={`${className} flex items-center gap-4`}>
      {rarity === 'common' ? (
        <h5 className="text-2xl font-semibold italic tracking-wide text-gray-400">
          Common
        </h5>
      ) : rarity === 'uncommon' ? (
        <h5 className="text-shadow text-2xl font-semibold italic tracking-wider text-green-500 text-shadow-blur-1 text-shadow-x-1 text-shadow-y-1 text-shadow-green-700">
          Uncommon
        </h5>
      ) : rarity === 'rare' ? (
        <h5 className="font-zen text-shadow text-2xl font-semibold italic tracking-widest text-red-600 text-shadow-blur-1 text-shadow-x-1 text-shadow-y-1 text-shadow-red-900">
          Rare
        </h5>
      ) : rarity === 'blackMarket' ? (
        <h5 className="text-shadow font-logo text-2xl font-semibold tracking-widest text-purple-700 text-shadow-blur-1 text-shadow-x-1 text-shadow-y-1 text-shadow-purple-900">
          Black Market
        </h5>
      ) : rarity === 'artifact' ? (
        <h5 className="font-kings text-shadow text-3xl font-semibold tracking-widest text-amber-400 text-shadow-blur-1 text-shadow-x-1 text-shadow-y-1 text-shadow-amber-700">
          Artifact
        </h5>
      ) : (
        <h5 className="text-2xl font-semibold text-gray-500">Unknown</h5>
      )}
      <h5 className="text-primary font-zen text-2xl italic">
        {romans.romanize(grade)}
      </h5>
    </div>
  );
};

export default ItemRarity;
