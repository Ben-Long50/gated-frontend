import { CharacterInventory } from 'src/types/character';
import useInventoryItemQueries from './useInventoryItemQueries/useInventoryItemQueries';
import { useMemo } from 'react';

const useInventory = (inventory: CharacterInventory) => {
  const { items, isLoading, isPending } = useInventoryItemQueries(
    inventory?.items.map((item) => item.id) || [],
  );

  const sortedInventory = useMemo(
    () =>
      items
        ? {
            weapons: items?.filter((item) =>
              item?.itemTypes.includes('weapon'),
            ),
            armors: items?.filter((item) => item?.itemTypes.includes('armor')),
            augmentations: items?.filter((item) =>
              item?.itemTypes.includes('augmentation'),
            ),
            vehicles: items?.filter((item) =>
              item?.itemTypes.includes('vehicle'),
            ),
            drones: items?.filter((item) => item?.itemTypes.includes('drone')),
            modifications: items?.filter((item) =>
              item?.itemTypes.includes('modification'),
            ),
            reusables: items?.filter((item) =>
              item?.itemTypes.includes('reusable'),
            ),
            consumables: items?.filter((item) =>
              item?.itemTypes.includes('consumable'),
            ),
            actions: items?.flatMap((item) => item?.itemLinkReference?.actions),
          }
        : null,
    [items],
  );

  const sortedEquipment = useMemo(
    () =>
      items
        ? {
            weapons: items?.filter(
              (item) =>
                item?.itemTypes.includes('weapon') && item?.equipped === true,
            ),
            armors: items?.filter(
              (item) =>
                item?.itemTypes.includes('armor') && item?.equipped === true,
            ),
            augmentations: items?.filter(
              (item) =>
                item?.itemTypes.includes('augmentation') &&
                item?.equipped === true,
            ),
            vehicles: items?.filter(
              (item) =>
                item?.itemTypes.includes('vehicle') && item?.equipped === true,
            ),
            drones: items?.filter(
              (item) =>
                item?.itemTypes.includes('drone') && item?.equipped === true,
            ),
            modifications: items?.filter(
              (item) =>
                item?.itemTypes.includes('modification') &&
                item?.equipped === true,
            ),
            reusables: items?.filter(
              (item) =>
                item?.itemTypes.includes('reusable') && item?.equipped === true,
            ),
            consumables: items?.filter(
              (item) =>
                item?.itemTypes.includes('consumable') &&
                item?.equipped === true,
            ),
          }
        : null,
    [items],
  );

  const actions = useMemo(
    () =>
      items
        ? items
            ?.filter((item) => item?.equipped === true)
            .flatMap((item) => item?.itemLinkReference?.actions)
        : null,
    [items],
  );

  return {
    inventory: sortedInventory,
    equipment: sortedEquipment,
    actions,
    isLoading,
    isPending,
  };
};

export default useInventory;
