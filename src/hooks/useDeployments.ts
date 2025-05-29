import { CharacterInventory } from 'src/types/character';

const useDeployments = (inventory: Partial<CharacterInventory>) => {
  const { filteredWeapons: equippedWeapons } = use({
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

export default useDeployments;
