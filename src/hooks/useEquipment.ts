import { CharacterInventory } from 'src/types/character';
import useWeapons from './useWeapons';
import useArmor from './useArmor';
import useCybernetics from './useCybernetics';
import { Cybernetic } from 'src/types/cybernetic';
import { Armor } from 'src/types/armor';
import { Weapon } from 'src/types/weapon';

const useEquipment = (inventory: CharacterInventory) => {
  const { filteredWeapons: equippedWeapons } = useWeapons({
    itemList: inventory?.weapons.filter(
      (weapon: Weapon) => weapon.equipped === true,
    ),
  });
  const { filteredArmor: equippedArmor } = useArmor({
    itemList: inventory?.armor.filter(
      (armor: Armor) => armor.equipped === true,
    ),
  });
  const { filteredCybernetics: equippedCybernetics } = useCybernetics({
    itemList: inventory?.cybernetics.filter(
      (cybernetic: Cybernetic) => cybernetic.equipped === true,
    ),
  });

  return {
    equippedWeapons,
    equippedArmor,
    equippedCybernetics,
  };
};

export default useEquipment;
