import { useMutation, useQueryClient } from '@tanstack/react-query';
import toggleEquipment from './toggleEquipment';
import { Character } from 'src/types/character';

const useToggleEquipmentMutation = (apiUrl: string, characterId: number) => {
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
      await queryClient.cancelQueries({ queryKey: ['character', characterId] });

      const prevCharacterData: Character | undefined = queryClient.getQueryData(
        ['character', characterId],
      );

      queryClient.setQueryData(
        ['character', characterId],
        (prev: Character) => ({
          ...prev,
          characterInventory: {
            ...prevCharacterData?.characterInventory,
            items: prevCharacterData?.characterInventory.items.map((item) =>
              item.id === mutationInfo.itemId
                ? { ...item, equipped: !item.equipped }
                : item,
            ),
          },
        }),
      );

      return { prevCharacterData };
    },

    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['character', characterId],
      });
    },
    throwOnError: false,
  });
};

export default useToggleEquipmentMutation;
