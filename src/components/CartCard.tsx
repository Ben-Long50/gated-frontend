import clsx from 'clsx';
import CartButton from './CartButton';
import CloudinaryImageSmall from './CloudinaryImageSmall';
import { WeaponWithKeywords } from 'src/types/weapon';
import { ArmorWithKeywords } from 'src/types/armor';
import { CyberneticWithKeywords } from 'src/types/cybernetic';
import { VehicleWithWeapons } from 'src/types/vehicle';
import { Item } from 'src/types/item';
import { ReactNode } from 'react';

const CartCard = ({
  className,
  item,
  category,
  handleRemove,
  children,
}: {
  className?: string;
  item:
    | WeaponWithKeywords
    | ArmorWithKeywords
    | CyberneticWithKeywords
    | VehicleWithWeapons
    | Item;
  category: string;
  handleRemove: () => void;
  children: ReactNode;
}) => {
  const rarityColors = {
    common: 'bg-gray-400',
    uncommon: 'bg-green-500',
    rare: 'bg-red-600',
    blackMarket: 'bg-purple-700',
    artifact: 'bg-amber-400',
  };

  return (
    <div className="rounded-br-4xl rounded-tl-4xl shadow-md shadow-zinc-950">
      <div
        className={`${className} bg-secondary timing flex w-full flex-col pr-4 clip-4 sm:pr-6`}
      >
        <div className="relative flex h-full items-center gap-4 sm:gap-8">
          <div
            className={clsx(
              rarityColors[item?.rarity] || 'bg-tertiary',
              'group relative shrink-0 overflow-hidden pl-1',
            )}
          >
            {item?.picture && (
              <CloudinaryImageSmall
                className="size-24"
                url={item.picture?.imageUrl}
                alt={item?.name + ' ' + 'image'}
              />
            )}
          </div>
          <h2 className={`${!item?.picture && 'py-5 pl-4'}`}>{item?.name}</h2>
          <div className="ml-auto flex flex-col items-end gap-2 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex items-center justify-end gap-4">
              <CartButton
                price={item?.price}
                category={category}
                itemId={item?.id}
                handleRemove={handleRemove}
              />
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
