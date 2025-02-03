import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import useActiveCharacterQuery from '../hooks/useActiveCharacterQuery/useActiveCharacterQuery';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import Loading from './Loading';
import useArmor from '../hooks/useArmor';
import { ArmorWithKeywords } from 'src/types/armor';
import useWeapons from '../hooks/useWeapons';
import useCybernetics from '../hooks/useCybernetics';
import useVehicles from '../hooks/useVehicles';
import { WeaponWithKeywords } from 'src/types/weapon';
import { CyberneticWithKeywords } from 'src/types/cybernetic';
import { Modification, VehicleWithWeapons } from 'src/types/vehicle';
import BtnRect from './buttons/BtnRect';
import CartCard from './CartCard';
import useClearCartMutation from '../hooks/useClearCartMutation/useClearCartMutation';
import { useForm } from '@tanstack/react-form';
import InputField from './InputField';
import useCompletePurchaseMutation from '../hooks/useCompletePurchaseMutation/useCompletePurchaseMutation';
import useModifications from '../hooks/useModifications';

const Cart = () => {
  const { apiUrl } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);

  const [deleteMode, setDeleteMode] = useState(false);

  const {
    data: character,
    isLoading,
    isPending,
  } = useActiveCharacterQuery(apiUrl);

  const clearCart = useClearCartMutation(
    apiUrl,
    character?.id,
    character?.characterCart?.id,
    setDeleteMode,
  );

  const completePurchase = useCompletePurchaseMutation(
    apiUrl,
    character?.id,
    character?.characterInventory?.id,
  );

  const weapons = useWeapons({ itemList: character?.characterCart?.weapons });
  const armor = useArmor({ itemList: character?.characterCart?.armor });
  const cybernetics = useCybernetics({
    itemList: character?.characterCart?.cybernetics,
  });
  const vehicles = useVehicles({
    itemList: character?.characterCart?.vehicles,
  });
  const modifications = useModifications({
    itemList: character?.characterCart?.modifications,
  });

  const cartForm = useForm({
    defaultValues: {
      weapons: weapons?.filteredWeapons?.map((weapon: WeaponWithKeywords) => {
        return { weaponId: weapon.id, price: weapon.price, quantity: 1 };
      }),
      armor: armor?.filteredArmor?.map((armor: ArmorWithKeywords) => {
        return { armorId: armor.id, price: armor.price, quantity: 1 };
      }),
      cybernetics: cybernetics?.filteredCybernetics?.map(
        (cybernetic: CyberneticWithKeywords) => {
          return {
            cyberneticId: cybernetic.id,
            price: cybernetic.price,
            quantity: 1,
          };
        },
      ),
      vehicles: vehicles?.filteredVehicles?.map(
        (vehicle: VehicleWithWeapons) => {
          return { vehicleId: vehicle.id, price: vehicle.price, quantity: 1 };
        },
      ),
      modifications: modifications?.filteredMods?.map((mod: Modification) => {
        return { modId: mod.id, price: mod.price, quantity: 1 };
      }),
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      await completePurchase.mutate(value, {
        onSuccess: () => cartForm.reset(),
      });
    },
    validators: {
      onSubmit: ({ value }) => {
        const totalPrice = Object.values(value)
          .flat()
          .map((item) => item.price * item.quantity)
          .reduce((sum, item) => sum + item, 0);
        if (totalPrice > character?.profits) {
          return 'You do not have enough profits to make this purchase';
        }
        return undefined;
      },
    },
  });

  if (isLoading || isPending) return <Loading />;

  return (
    <form className="flex w-full max-w-5xl flex-col items-center gap-6 sm:gap-8">
      <h1 className="text-center">
        {character.firstName + ' ' + character.lastName + "'s"} Cart
      </h1>
      <ThemeContainer
        className={`ml-auto w-full rounded-br-5xl rounded-tl-5xl shadow-lg shadow-zinc-950`}
        chamfer="24"
        borderColor={accentPrimary}
      >
        <div className="bg-primary flex w-full flex-col gap-4 p-4 clip-6 sm:px-8">
          <div className="flex w-full items-center justify-between gap-8">
            <h3>Available profits</h3>
            <h3 className="ml-auto">{character.profits}p</h3>
          </div>
          <cartForm.Subscribe selector={(state) => state.values}>
            {(itemArrays) => {
              const totalPrice = Object.values(itemArrays)
                .flat()
                .map((item) => item.price * item.quantity)
                .reduce((sum, item) => sum + item, 0);

              return (
                <div className="flex w-full items-center justify-between gap-8">
                  <h3>Cart total</h3>
                  <div className="flex items-center gap-4">
                    <h3 className="ml-auto">{totalPrice}p</h3>
                    <p
                      className={`${character?.profits - totalPrice < 0 && 'text-error'} text-base`}
                    >
                      ({character?.profits - totalPrice}p)
                    </p>
                  </div>
                </div>
              );
            }}
          </cartForm.Subscribe>

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
                        cartForm.reset();
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
              className="self-end"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                cartForm.handleSubmit();
              }}
            >
              Complete purchase
            </BtnRect>
          </div>
          {deleteMode && (
            <p className="text-error text-base">
              Press the confirm button to remove all cart items
            </p>
          )}
          <cartForm.Subscribe selector={(state) => state.errorMap}>
            {(errorMap) =>
              errorMap.onSubmit ? (
                <em className="text-error text-lg">{errorMap.onSubmit}</em>
              ) : null
            }
          </cartForm.Subscribe>
        </div>
      </ThemeContainer>
      {Object.values(character?.characterCart)
        .filter((item) => Array.isArray(item))
        .flat().length === 0 && <h2>Cart is empty</h2>}
      {Object.entries(cartForm.state.values).map(([key, value]) => {
        return (
          <cartForm.Field key={key} name={`${key}`} mode="array">
            {(field) => (
              <div className="flex w-full flex-col gap-4">
                {field.state.value.length > 0 && (
                  <h2 className="pl-4">
                    {key[0].toUpperCase() + key.slice(1)}
                  </h2>
                )}
                {field.state.value.map((_, i: number) => {
                  let item;
                  switch (key) {
                    case 'weapons':
                      item = weapons?.filteredWeapons[i];
                      break;
                    case 'armor':
                      item = armor?.filteredArmor[i];
                      break;
                    case 'cybernetics':
                      item = cybernetics?.filteredCybernetics[i];
                      break;
                    case 'vehicles':
                      item = vehicles?.filteredVehicles[i];
                      break;
                    case 'modifications':
                      item = modifications?.filteredMods[i];
                      break;
                    default:
                      item = '';
                      break;
                  }
                  return (
                    <cartForm.Field key={`${key}.${i}`} name={`${key}.${i}`}>
                      {() => (
                        <CartCard
                          item={item}
                          category={key}
                          handleRemove={() => field.removeValue(i)}
                        >
                          <cartForm.Field
                            name={`${key}.${i}.quantity`}
                            validators={{
                              onChange: ({ value }) => {
                                if (value == 0) {
                                  return 'Quantity cannot be 0';
                                } else if (value < 1) {
                                  return 'Quantity cannot be negative';
                                }
                                return undefined;
                              },
                            }}
                          >
                            {(subfield) => (
                              <InputField
                                className="bg-secondary max-w-20"
                                label="Qty."
                                type="number"
                                field={subfield}
                              />
                            )}
                          </cartForm.Field>
                        </CartCard>
                      )}
                    </cartForm.Field>
                  );
                })}
              </div>
            )}
          </cartForm.Field>
        );
      })}
    </form>
  );
};

export default Cart;
