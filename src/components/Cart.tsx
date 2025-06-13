import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import Loading from './Loading';
import BtnRect from './buttons/BtnRect';
import CartCard from './CartCard';
import useClearCartMutation from '../hooks/useClearCartMutation/useClearCartMutation';
import useCompletePurchaseMutation from '../hooks/useCompletePurchaseMutation/useCompletePurchaseMutation';
import { useParams } from 'react-router-dom';
import { Character } from 'src/types/character';
import ArrowHeader3 from './ArrowHeader3';
import useCharacter from 'src/hooks/useCharacter';

const Cart = ({ character }: { character?: Character }) => {
  const { apiUrl } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);
  const { characterId } = useParams();
  const [deleteMode, setDeleteMode] = useState(false);

  const { filteredCharacter } = useCharacter(Number(characterId));

  const characterObj = character || filteredCharacter;

  const clearCart = useClearCartMutation(
    apiUrl,
    characterObj?.id,
    characterObj?.characterCart?.id,
    setDeleteMode,
  );

  const completePurchase = useCompletePurchaseMutation(
    apiUrl,
    characterObj?.id,
    characterObj?.characterInventory?.id,
  );

  const totalPrice = characterObj
    ? Object.values(characterObj?.characterCart?.items).reduce(
        (sum, itemReference) =>
          itemReference.item.price
            ? sum + itemReference.item.price * itemReference.quantity
            : sum,
        0,
      )
    : 0;

  return (
    <form className="flex w-full max-w-5xl flex-col items-center gap-6 sm:gap-8">
      <ThemeContainer
        className={`ml-auto w-full`}
        chamfer="medium"
        borderColor={accentPrimary}
      >
        <div className="flex w-full flex-col gap-4 p-4">
          <div className="flex w-full items-center justify-between gap-8">
            <ArrowHeader3 title="Available Profits" />
            <h3 className="ml-auto">{characterObj?.profits}p</h3>
          </div>

          <div className="flex w-full items-center justify-between gap-8">
            <ArrowHeader3 title="Cart Total" />
            <div className="flex items-center gap-4">
              <h3 className="ml-auto">{totalPrice}p</h3>
              <p
                className={`${characterObj?.profits - totalPrice < 0 && 'text-error'} text-base`}
              >
                ({characterObj?.profits - totalPrice}p)
              </p>
            </div>
          </div>
          <div className="flex w-full items-end justify-between">
            <div className="flex items-end justify-start gap-8">
              <button
                className="text-accent text-base hover:underline"
                onClick={
                  deleteMode
                    ? (e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        clearCart.mutate();
                      }
                    : (e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setDeleteMode(true);
                      }
                }
              >
                {deleteMode ? 'Confirm' : 'Clear cart'}
              </button>
              {deleteMode && (
                <button
                  className="text-secondary text-base hover:underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setDeleteMode(false);
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
            <BtnRect
              ariaLabel="Complete purchase"
              type="submit"
              className="group min-w-64 self-end"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                if (completePurchase.isPending) return;
                completePurchase.mutate();
              }}
            >
              {completePurchase.isPending ? (
                <Loading
                  className="group-hover:text-accent dark:text-gray-900"
                  size={1.15}
                />
              ) : (
                'Complete purchase'
              )}
            </BtnRect>
          </div>
          {deleteMode && (
            <p className="text-error text-base">
              Press the confirm button to remove all cart items
            </p>
          )}
        </div>
      </ThemeContainer>
      {characterObj?.characterCart.items.map((itemReference) => {
        return (
          <CartCard
            key={itemReference.id}
            item={itemReference.item}
            quantity={itemReference.quantity}
            characterId={characterObj?.id}
            cartId={itemReference.characterCartId}
          />
        );
      })}
    </form>
  );
};

export default Cart;
