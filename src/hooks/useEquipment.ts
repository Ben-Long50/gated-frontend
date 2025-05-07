import { CharacterInventory } from 'src/types/character';
import { CyberneticWithKeywords } from 'src/types/cybernetic';
import { ArmorWithKeywords } from 'src/types/armor';
import { WeaponWithKeywords } from 'src/types/weapon';
import { Item } from 'src/types/item';
import { Action } from 'src/types/action';
import { VehicleWithWeapons } from 'src/types/vehicle';
import { Drone } from 'src/types/drone';

const useEquipment = (inventory: CharacterInventory) => {
  const equippedWeapons = inventory?.weapons?.filter(
    (weapon: WeaponWithKeywords) => weapon.equipped === true,
  );

  const equippedArmor = inventory?.armor?.filter(
    (armor: ArmorWithKeywords) => armor.equipped === true,
  );

  const equippedCybernetics = inventory?.cybernetics?.filter(
    (cybernetic: CyberneticWithKeywords) => cybernetic.equipped === true,
  );

  const equippedItems = inventory?.items?.filter(
    (item: Item) => item.equipped === true,
  );

  const equippedActions = inventory?.actions?.filter(
    (action: Action) => action.equipped === true,
  );

  const equippedVehicles = inventory?.vehicles?.filter(
    (vehicle: VehicleWithWeapons) => vehicle.equipped === true,
  );

  const equippedDrones = inventory?.drones?.filter(
    (drone: Drone) => drone.equipped === true,
  );

  return {
    equippedWeapons,
    equippedArmor,
    equippedCybernetics,
    equippedItems,
    equippedActions,
    equippedVehicles,
    equippedDrones,
  };
};

export default useEquipment;
