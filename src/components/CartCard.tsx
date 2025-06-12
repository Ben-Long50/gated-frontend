import { Item } from 'src/types/item';
import { useContext } from 'react';
import { mdiMinus, mdiPlus } from '@mdi/js';
import { ThemeContext } from 'src/contexts/ThemeContext';
import useEditCartMutation from 'src/hooks/useEditCartMutation/useEditCartMutation';
import { AuthContext } from 'src/contexts/AuthContext';
import BtnIcon from './buttons/BtnIcon';
import CloudinaryImage from './CloudinaryImage';

const CartCard = ({
  className,
  item,
  quantity,
  characterId,
  cartId,
}: {
  className?: string;
  item: Item;
  quantity: number;
  characterId: number;
  cartId: number;
}) => {
  const { apiUrl } = useContext(AuthContext);
  const { rarityColorMap } = useContext(ThemeContext);

  const editCart = useEditCartMutation(apiUrl, Number(characterId), cartId);

  const shopName = item?.characterInventory
    ? item?.characterInventory.character.firstName +
      ' ' +
      item?.characterInventory.character.lastName +
      "'s Shop"
    : 'Global Shop';

  return (
    <div className="w-full rounded-br-4xl rounded-tl-4xl shadow-md shadow-black">
      <div
        className={`${className} bg-secondary timing flex w-full flex-col pr-4 clip-4 sm:pr-6`}
      >
        <div className="relative flex h-full items-center">
          {item?.picture.imageUrl && (
            <div
              className="group relative size-24 shrink-0 overflow-hidden pl-1"
              style={{ backgroundColor: rarityColorMap[item?.rarity] }}
            >
              <CloudinaryImage
                className=""
                publicId={item?.picture?.publicId}
                position={item?.picture?.position}
              />
            </div>
          )}
          <div className="flex grow items-center justify-between">
            <div className="flex flex-col items-start justify-center gap-1 py-4 pl-8">
              <h2>{item?.name}</h2>
              <h4 className="text-tertiary">({shopName})</h4>
            </div>
            <h3 className="mr-4 sm:mr-8">{item.price * quantity}p</h3>
          </div>
          <div className="ml-auto grid grid-cols-3 items-end gap-2 sm:flex-row sm:items-center sm:gap-4">
            <BtnIcon
              path={mdiMinus}
              active={true}
              onClick={() => {
                if (cartId) {
                  editCart.mutate({
                    itemId: item.id,
                    value: -1,
                  });
                }
              }}
            />
            <h2 className="text-center">{quantity}</h2>
            <BtnIcon
              path={mdiPlus}
              active={true}
              onClick={() => {
                if (cartId) {
                  editCart.mutate({
                    itemId: item.id,
                    value: 1,
                  });
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
