import { CharacterInventory } from 'src/types/character';
import useInventoryItemsQuery from './useInventoryItemsQuery/useInventoryItemsQuery';
import { useContext, useMemo } from 'react';
import { AuthContext } from 'src/contexts/AuthContext';

const useInventory = (inventory: CharacterInventory) => {
  const { apiUrl } = useContext(AuthContext);

  const itemInfo =
    inventory?.items?.map((item) => ({
      category: item.itemType,
      id: item.id,
    })) || [];

  const { items, isLoading, isPending } = useInventoryItemsQuery(
    apiUrl,
    itemInfo,
  );

  const sortedInventory = useMemo(
    () =>
      items
        ? {
            weapons: items?.filter((item) => item?.itemType === 'weapon'),
            armors: items?.filter((item) => item?.itemType === 'armor'),
            augmentations: items?.filter(
              (item) => item?.itemType === 'augmentation',
            ),
            vehicles: items?.filter((item) => item?.itemType === 'vehicle'),
            drones: items?.filter((item) => item?.itemType === 'drone'),
            modifications: items?.filter(
              (item) => item?.itemType === 'modification',
            ),
            reusables: items?.filter((item) => item?.itemType === 'reusable'),
            consumables: items?.filter(
              (item) => item?.itemType === 'consumable',
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
              (item) => item?.itemType === 'weapon' && item?.equipped === true,
            ),
            armors: items?.filter(
              (item) => item?.itemType === 'armor' && item?.equipped === true,
            ),
            augmentations: items?.filter(
              (item) =>
                item?.itemType === 'augmentation' && item?.equipped === true,
            ),
            vehicles: items?.filter(
              (item) => item?.itemType === 'vehicle' && item?.equipped === true,
            ),
            drones: items?.filter(
              (item) => item?.itemType === 'drone' && item?.equipped === true,
            ),
            modifications: items?.filter(
              (item) =>
                item?.itemType === 'modification' && item?.equipped === true,
            ),
            reusables: items?.filter(
              (item) =>
                item?.itemType === 'reusable' && item?.equipped === true,
            ),
            consumables: items?.filter(
              (item) =>
                item?.itemType === 'consumable' && item?.equipped === true,
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
