import { Action } from 'src/types/action';
import { CharacterInventory } from 'src/types/character';

const useInventory = (inventory: CharacterInventory) => {
  const sortedInventory = inventory
    ? {
        weapons: inventory.items.filter((item) => item.itemType === 'weapon'),
        armor: inventory.items.filter((item) => item.itemType === 'armor'),
        cybernetics: inventory.items.filter(
          (item) => item.itemType === 'cybernetic',
        ),
        items: inventory.items.filter(
          (item) =>
            item.itemType === 'consumable' || item.itemType === 'reusable',
        ),
        vehicles: inventory.items.filter((item) => item.itemType === 'vehicle'),
        drones: inventory.items.filter((item) => item.itemType === 'drone'),
        actions: inventory.actions,
      }
    : null;

  const sortedEquipment = inventory
    ? {
        weapons: inventory.items.filter(
          (item) => item.itemType === 'weapon' && item.equipped === true,
        ),
        armor: inventory.items.filter(
          (item) => item.itemType === 'armor' && item.equipped === true,
        ),
        cybernetics: inventory.items.filter(
          (item) => item.itemType === 'cybernetic' && item.equipped === true,
        ),
        items: inventory.items.filter(
          (item) =>
            (item.itemType === 'consumable' || item.itemType === 'reusable') &&
            item.equipped === true,
        ),
        vehicles: inventory.items.filter(
          (item) => item.itemType === 'vehicle' && item.equipped === true,
        ),
        drones: inventory.items.filter(
          (item) => item.itemType === 'drone' && item.equipped === true,
        ),
        actions: inventory.actions.filter(
          (action: Action) => action.equipped === true,
        ),
      }
    : null;

  return { inventory: sortedInventory, equipment: sortedEquipment };
};

export default useInventory;
