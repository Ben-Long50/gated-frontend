import { useContext } from 'react';
import useActiveCharacterQuery from '../hooks/useActiveCharacterQuery/useActiveCharacterQuery';
import Loading from './Loading';
import WeaponCard from './WeaponCard';
import { AuthContext } from '../contexts/AuthContext';
import useWeapons from '../hooks/useWeapons';
import useArmor from '../hooks/useArmor';
import ArmorCard from './ArmorCard';
import { WeaponWithKeywords } from 'src/types/weapon';
import { ArmorWithKeywords } from 'src/types/armor';
import useCybernetics from '../hooks/useCybernetics';
import { CyberneticWithKeywords } from 'src/types/cybernetic';
import CyberneticCard from './CyberneticCard';
import useVehicles from '../hooks/useVehicles';
import VehicleCard from './VehicleCard';
import { VehicleWithWeapons } from 'src/types/vehicle';

const Inventory = ({ category }: { category: string }) => {
  const { apiUrl } = useContext(AuthContext);

  const {
    data: character,
    isPending,
    isLoading,
  } = useActiveCharacterQuery(apiUrl);

  const weapons = useWeapons(undefined, character?.characterInventory?.weapons);

  const armor = useArmor(undefined, character?.characterInventory?.armor);

  const cybernetics = useCybernetics(
    character?.characterInventory?.cybernetics,
  );

  const vehicles = useVehicles(character?.characterInventory?.vehicles);

  if (isLoading || isPending) return <Loading />;

  return (
    <div className="flex w-full max-w-5xl flex-col gap-8">
      <h1 className="text-center">
        {character.firstName + ' ' + character.lastName + "'s "}
        <span>{category[0].toUpperCase() + category.slice(1)}</span>
      </h1>
      {category === 'weapons' ? (
        weapons.filteredWeapons.map((weapon: WeaponWithKeywords) => {
          return (
            <WeaponCard key={weapon.id} weapon={weapon} type="inventory" />
          );
        })
      ) : category === 'armor' ? (
        armor.filteredArmor.map((armor: ArmorWithKeywords) => {
          return <ArmorCard key={armor.id} armor={armor} type="inventory" />;
        })
      ) : category === 'cybernetics' ? (
        cybernetics.filteredCybernetics.map(
          (cybernetic: CyberneticWithKeywords) => {
            return (
              <CyberneticCard
                key={cybernetic.id}
                cybernetic={cybernetic}
                type="inventory"
              />
            );
          },
        )
      ) : category === 'vehicles' ? (
        vehicles.filteredVehicles.map((vehicle: VehicleWithWeapons) => {
          return (
            <VehicleCard key={vehicle.id} vehicle={vehicle} type="inventory" />
          );
        })
      ) : (
        <h1>Invalid category</h1>
      )}
    </div>
  );
};

export default Inventory;
