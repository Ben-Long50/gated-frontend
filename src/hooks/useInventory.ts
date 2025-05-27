import { Action } from 'src/types/action';
import { CharacterInventory } from 'src/types/character';

const useInventory = (inventory: CharacterInventory) => {
  const sortedInventory = inventory
    ? {
        weapons: inventory.items.filter((item) => item.itemType === 'weapon'),
        armors: inventory.items.filter((item) => item.itemType === 'armor'),
        augmentations: inventory.items.filter(
          (item) => item.itemType === 'augmentation',
        ),
        consumables: inventory.items.filter(
          (item) => item.itemType === 'consumable',
        ),
        reusables: inventory.items.filter(
          (item) => item.itemType === 'reusable',
        ),
        vehicles: inventory.items.filter((item) => item.itemType === 'vehicle'),
        drones: inventory.items.filter((item) => item.itemType === 'drone'),
        modifications: inventory.items.filter(
          (item) => item.itemType === 'modification',
        ),
        actions: inventory.actions,
      }
    : null;

  const sortedEquipment = inventory
    ? {
        weapons: inventory.items.filter(
          (item) => item.itemType === 'weapon' && item.equipped === true,
        ),
        armors: inventory.items.filter(
          (item) => item.itemType === 'armor' && item.equipped === true,
        ),
        augmentations: inventory.items.filter(
          (item) => item.itemType === 'augmentation' && item.equipped === true,
        ),
        consumables: inventory.items.filter(
          (item) => item.itemType === 'consumable' && item.equipped === true,
        ),
        reusables: inventory.items.filter(
          (item) => item.itemType === 'reusable' && item.equipped === true,
        ),
        vehicles: inventory.items.filter(
          (item) => item.itemType === 'vehicle' && item.equipped === true,
        ),
        drones: inventory.items.filter(
          (item) => item.itemType === 'drone' && item.equipped === true,
        ),
        modifications: inventory.items.filter(
          (item) => item.itemType === 'modification' && item.equipped === true,
        ),
        actions: inventory.actions.filter(
          (action: Action) => action.equipped === true,
        ),
      }
    : null;

  return { inventory: sortedInventory, equipment: sortedEquipment };
};

export default useInventory;
