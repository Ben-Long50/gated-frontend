import { CharacterInventory } from 'src/types/character';
import useWeapons from './useWeapons';
import useArmor from './useArmor';
import useCybernetics from './useCybernetics';
import { Cybernetic } from 'src/types/cybernetic';
import { Armor } from 'src/types/armor';
import { Weapon } from 'src/types/weapon';
import { Item } from 'src/types/item';

const useEquipment = (inventory: CharacterInventory) => {
  const { filteredWeapons: equippedWeapons } = useWeapons({
    itemList: inventory?.weapons?.filter(
      (weapon: Weapon) => weapon.equipped === true,
    ),
  });
  const { filteredArmor: equippedArmor } = useArmor({
    itemList: inventory?.armor?.filter(
      (armor: Armor) => armor.equipped === true,
    ),
  });
  const { filteredCybernetics: equippedCybernetics } = useCybernetics({
    itemList: inventory?.cybernetics?.filter(
      (cybernetic: Cybernetic) => cybernetic.equipped === true,
    ),
  });
  const { filteredCybernetics: equippedItems } = useCybernetics({
    itemList: inventory?.items?.filter((item: Item) => item.equipped === true),
  });

  return {
    equippedWeapons,
    equippedArmor,
    equippedCybernetics,
    equippedItems,
  };
};

export default useEquipment;
