import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import Loading from './Loading';
import BtnRect from './buttons/BtnRect';
import CartCard from './CartCard';
import useClearCartMutation from '../hooks/useClearCartMutation/useClearCartMutation';
import useCompletePurchaseMutation from '../hooks/useCompletePurchaseMutation/useCompletePurchaseMutation';
import ArrowHeader2 from './ArrowHeader2';
import useCharacters from 'src/hooks/useCharacters';

const Cart = () => {
  const { apiUrl } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);

  const [deleteMode, setDeleteMode] = useState(false);

  const { activeCharacter, isLoading } = useCharacters();

  const clearCart = useClearCartMutation(
    apiUrl,
    activeCharacter?.id,
    activeCharacter?.characterCart?.id,
    setDeleteMode,
  );

  const completePurchase = useCompletePurchaseMutation(
    apiUrl,
    activeCharacter?.id,
    activeCharacter?.characterInventory?.id,
  );

  if (isLoading) return <Loading />;

  const cart = Object.fromEntries(
    Object.entries(activeCharacter?.characterCart)
      .filter(([key, value]) => Array.isArray(value) && value.length > 0)
      .map(([key, value]) => [key, value]),
  );

  const totalPrice = Object.values(cart)
    .flat()
    .map(
      (reference) =>
        reference.quantity *
        Object.values(reference).find((item) => typeof item === 'object').price,
    )
    .reduce((sum, item) => sum + item, 0);

  return (
    <form className="flex w-full max-w-5xl flex-col items-center gap-6 sm:gap-8">
      <h1 className="text-center">
        {activeCharacter?.firstName + ' ' + activeCharacter?.lastName + "'s"}{' '}
        Cart
      </h1>
      <ThemeContainer
        className={`ml-auto w-full`}
        chamfer="medium"
        borderColor={accentPrimary}
      >
        <div className="flex w-full flex-col gap-4 p-4 sm:px-8">
          <div className="flex w-full items-center justify-between gap-8">
            <h3>Available profits</h3>
            <h3 className="ml-auto">{activeCharacter?.profits}p</h3>
          </div>

          <div className="flex w-full items-center justify-between gap-8">
            <h3>Cart total</h3>
            <div className="flex items-center gap-4">
              <h3 className="ml-auto">{totalPrice}p</h3>
              <p
                className={`${activeCharacter?.profits - totalPrice < 0 && 'text-error'} text-base`}
              >
                ({activeCharacter?.profits - totalPrice}p)
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
                  className="group-hover:text-yellow-300 dark:text-gray-900"
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
      {Object.values(cart)
        .filter((item) => Array.isArray(item))
        .flat().length === 0 && <h2>Cart is empty</h2>}
      {Object.entries(cart).map(([key, value]) => {
        let itemType;
        switch (key) {
          case 'weapons':
            itemType = 'weapon';
            break;
          case 'armor':
            itemType = 'armor';
            break;
          case 'cybernetics':
            itemType = 'cybernetic';
            break;
          case 'vehicles':
            itemType = 'vehicle';
            break;
          case 'drones':
            itemType = 'drone';
            break;
          case 'modifications':
            itemType = 'modification';
            break;
          case 'items':
            itemType = 'item';
            break;
          default:
            break;
        }
        return (
          <>
            <ArrowHeader2
              className="w-full text-left"
              key={key}
              title={key.charAt(0).toUpperCase() + key.slice(1)}
            />
            <div className="flex w-full flex-col gap-4">
              {value.map((reference) => (
                <CartCard
                  key={reference.id}
                  item={reference[itemType]}
                  quantity={reference.quantity}
                  category={key}
                />
              ))}
            </div>
          </>
        );
      })}
    </form>
  );
};

export default Cart;
