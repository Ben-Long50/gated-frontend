import CloudinaryImageSmall from './CloudinaryImageSmall';
import { WeaponWithKeywords } from 'src/types/weapon';
import { ArmorWithKeywords } from 'src/types/armor';
import { CyberneticWithKeywords } from 'src/types/cybernetic';
import { VehicleWithWeapons } from 'src/types/vehicle';
import { Item } from 'src/types/item';
import { useContext } from 'react';
import Loading from './Loading';
import Icon from '@mdi/react';
import { mdiMinus, mdiPlus } from '@mdi/js';
import { ThemeContext } from 'src/contexts/ThemeContext';
import useEditCartMutation from 'src/hooks/useEditCartMutation/useEditCartMutation';
import useActiveCharacterQuery from 'src/hooks/useActiveCharacterQuery/useActiveCharacterQuery';
import { AuthContext } from 'src/contexts/AuthContext';
import { useParams } from 'react-router-dom';

const CartCard = ({
  className,
  item,
  quantity,
  category,
}: {
  className?: string;
  item:
    | WeaponWithKeywords
    | ArmorWithKeywords
    | CyberneticWithKeywords
    | VehicleWithWeapons
    | Item;
  quantity: number;
  category: string;
}) => {
  const { apiUrl } = useContext(AuthContext);
  const { rarityColorMap } = useContext(ThemeContext);
  const { characterId } = useParams();

  const { data: character } = useActiveCharacterQuery(apiUrl);

  const editCart = useEditCartMutation(
    apiUrl,
    Number(characterId),
    character?.characterCart.id,
  );

  return (
    <div className="rounded-br-4xl rounded-tl-4xl shadow-md shadow-zinc-950">
      <div
        className={`${className} bg-secondary timing flex w-full flex-col pr-4 clip-4 sm:pr-6`}
      >
        <div className="relative flex h-full items-center gap-4 sm:gap-8">
          {item?.picture && (
            <div
              className="group relative shrink-0 overflow-hidden pl-1"
              style={{ backgroundColor: rarityColorMap[item?.rarity] }}
            >
              <CloudinaryImageSmall
                className="size-24"
                url={item.picture?.imageUrl}
                alt={item?.name + ' ' + 'image'}
              />
            </div>
          )}
          <h2 className={`${!item?.picture && 'py-5 pl-4'}`}>{item?.name}</h2>
          <div className="ml-auto grid grid-cols-3 items-end gap-2 sm:flex-row sm:items-center sm:gap-4">
            <button
              className="hover:bg-primary timing group grid size-10 shrink-0 place-items-center rounded-full bg-yellow-300 shadow-md shadow-black hover:ring-2 hover:ring-yellow-300"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                if (character) {
                  editCart.mutate({
                    category,
                    itemId: item.id,
                    value: -1,
                  });
                }
              }}
            >
              <Icon
                className="timing text-zinc-950 group-hover:text-yellow-300"
                path={mdiMinus}
                size={1}
              />
            </button>
            <h2 className="text-center">{quantity}</h2>
            <button
              className="hover:bg-primary timing group grid size-10 shrink-0 place-items-center rounded-full bg-yellow-300 shadow-md shadow-black hover:ring-2 hover:ring-yellow-300"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                if (character) {
                  editCart.mutate({
                    category,
                    itemId: item.id,
                    value: 1,
                  });
                }
              }}
            >
              <Icon
                className="timing text-zinc-950 group-hover:text-yellow-300"
                path={mdiPlus}
                size={1}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
