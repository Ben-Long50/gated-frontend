import { useMutation, useQueryClient } from '@tanstack/react-query';
import toggleEquipment from './toggleEquipment';
import { Character } from 'src/types/character';

const useToggleEquipmentMutation = (apiUrl: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: {
      characterId: number;
      inventoryId: number;
      category: string;
      itemId: number;
    }) => {
      return toggleEquipment(apiUrl, formData);
    },

    onMutate: async (mutationInfo) => {
      await queryClient.cancelQueries({ queryKey: ['activeCharacter'] });

      const prevCharacterData: Character | undefined = queryClient.getQueryData(
        ['activeCharacter'],
      );

      const updateInventory = () => {
        switch (mutationInfo.category) {
          case 'weapon':
            return {
              ...prevCharacterData?.characterInventory,
              weapons: prevCharacterData?.characterInventory.weapons.map(
                (weapon) =>
                  weapon.id === mutationInfo.itemId
                    ? { ...weapon, equipped: !weapon.equipped }
                    : weapon,
              ),
            };
          case 'armor':
            return {
              ...prevCharacterData?.characterInventory,
              armor: prevCharacterData?.characterInventory.armor.map((armor) =>
                armor.id === mutationInfo.itemId
                  ? { ...armor, equipped: !armor.equipped }
                  : armor,
              ),
            };
          case 'cybernetic':
            return {
              ...prevCharacterData?.characterInventory,
              cybernetics:
                prevCharacterData?.characterInventory.cybernetics.map(
                  (cybernetic) =>
                    cybernetic.id === mutationInfo.itemId
                      ? { ...cybernetic, equipped: !cybernetic.equipped }
                      : cybernetic,
                ),
            };
          case 'item':
            return {
              ...prevCharacterData?.characterInventory,
              items: prevCharacterData?.characterInventory.items.map((item) =>
                item.id === mutationInfo.itemId
                  ? { ...item, equipped: !item.equipped }
                  : item,
              ),
            };
          default:
            return;
        }
      };

      const newInventory = updateInventory();

      // Optimistically update to the new value
      queryClient.setQueryData(['activeCharacter'], (prev: Character) => ({
        ...prev,
        characterInventory: newInventory,
      }));
      // Return a context object with the snapshotted value
      return { prevCharacterData };
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['activeCharacter'],
        exact: false,
      });
    },
    throwOnError: false,
  });
};

export default useToggleEquipmentMutation;
