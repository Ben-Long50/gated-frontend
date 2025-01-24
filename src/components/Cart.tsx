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
import { VehicleWithWeapons } from 'src/types/vehicle';
import BtnRect from './buttons/BtnRect';
import CartCard from './CartCard';
import useClearCartMutation from '../hooks/useClearCartMutation/useClearCartMutation';
import { useForm } from '@tanstack/react-form';
import InputField from './InputField';

const Cart = () => {
  const { apiUrl } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);

  const [deleteMode, setDeleteMode] = useState(false);

  const {
    data: character,
    isLoading,
    isPending,
  } = useActiveCharacterQuery(apiUrl);

  const clearCart = useClearCartMutation(apiUrl, character?.id, setDeleteMode);

  const weapons = useWeapons(undefined, character?.characterCart?.weapons);
  const armor = useArmor(undefined, character?.characterCart?.armor);
  const cybernetics = useCybernetics(character?.characterCart?.cybernetics);
  const vehicles = useVehicles(character?.characterCart?.vehicles);

  const cartForm = useForm({
    defaultValues: {
      weapons: [] as { weaponId: number; price: number; quantity: number }[],
      armor: [] as { armorId: number; price: number; quantity: number }[],
      cybernetics: [] as {
        cyberneticId: number;
        price: number;
        quantity: number;
      }[],
      vehicles: [] as { vehicleId: number; price: number; quantity: number }[],
    },
    onSubmit: ({ value }) => {
      console.log(value);
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
                cartForm.reset();
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
        </div>
      </ThemeContainer>
      {weapons.filteredWeapons?.length > 0 && (
        <cartForm.Field name="weapons" mode="array">
          {() => (
            <div className="flex w-full flex-col gap-4">
              <h2 className="pl-4">Weapons</h2>
              {weapons.filteredWeapons?.map(
                (weapon: WeaponWithKeywords, i: number) => {
                  return (
                    <CartCard key={weapon.id} item={weapon}>
                      <cartForm.Field
                        name={`weapons[${i}].weaponId`}
                        defaultValue={weapon.id}
                      />
                      <cartForm.Field
                        name={`weapons[${i}].price`}
                        defaultValue={weapon.price}
                      />
                      <cartForm.Field
                        name={`weapons[${i}].quantity`}
                        defaultValue={1}
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
                  );
                },
              )}
            </div>
          )}
        </cartForm.Field>
      )}
      {armor.filteredArmor?.length > 0 && (
        <cartForm.Field name="armor" mode="array">
          {() => (
            <div className="flex w-full flex-col gap-4">
              <h2 className="pl-4">Armor</h2>
              {armor.filteredArmor?.map(
                (armor: ArmorWithKeywords, i: number) => {
                  return (
                    <CartCard key={armor.id} item={armor}>
                      <cartForm.Field
                        name={`armor[${i}].armorId`}
                        defaultValue={armor.id}
                      />
                      <cartForm.Field
                        name={`armor[${i}].price`}
                        defaultValue={armor.price}
                      />
                      <cartForm.Field
                        name={`armor[${i}].quantity`}
                        defaultValue={1}
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
                  );
                },
              )}
            </div>
          )}
        </cartForm.Field>
      )}
      {cybernetics.filteredCybernetics?.length > 0 && (
        <cartForm.Field name="armor" mode="array">
          {() => (
            <div className="flex w-full flex-col gap-4">
              <h2 className="pl-4">Cybernetics</h2>
              {cybernetics.filteredCybernetics?.map(
                (cybernetic: CyberneticWithKeywords, i: number) => {
                  return (
                    <CartCard key={cybernetic.id} item={cybernetic}>
                      <cartForm.Field
                        name={`cybernetics[${i}].cyberneticId`}
                        defaultValue={cybernetic.id}
                      />
                      <cartForm.Field
                        name={`cybernetics[${i}].price`}
                        defaultValue={cybernetic.price}
                      />
                      <cartForm.Field
                        name={`cybernetics[${i}].quantity`}
                        defaultValue={1}
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
                  );
                },
              )}
            </div>
          )}
        </cartForm.Field>
      )}
      {vehicles.filteredVehicles?.length > 0 && (
        <cartForm.Field name="armor" mode="array">
          {() => (
            <div className="flex w-full flex-col gap-4">
              <h2 className="pl-4">Vehicles</h2>
              {vehicles.filteredVehicles?.map(
                (vehicle: VehicleWithWeapons, i: number) => {
                  return (
                    <CartCard key={vehicle.id} item={vehicle}>
                      <cartForm.Field
                        name={`vehicles[${i}].vehicleId`}
                        defaultValue={vehicle.id}
                      />
                      <cartForm.Field
                        name={`vehicles[${i}].price`}
                        defaultValue={vehicle.price}
                      />
                      <cartForm.Field
                        name={`vehicles[${i}].quantity`}
                        defaultValue={1}
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
                  );
                },
              )}
            </div>
          )}
        </cartForm.Field>
      )}
    </form>
  );
};

export default Cart;
