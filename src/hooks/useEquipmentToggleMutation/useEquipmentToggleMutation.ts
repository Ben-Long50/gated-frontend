import { useMutation, useQueryClient } from '@tanstack/react-query';
import toggleEquipment from './toggleEquipment';
import { Item } from 'src/types/item';

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
      await queryClient.cancelQueries({
        queryKey: ['item', mutationInfo.itemId],
      });

      const prevItemData: Item | undefined = queryClient.getQueryData([
        'item',
        mutationInfo.itemId,
      ]);

      queryClient.setQueryData(['item', mutationInfo.itemId], (prev: Item) => ({
        ...prev,
        equipped: !prevItemData.equipped,
      }));

      return { prevItemData };
    },

    onSuccess: (_, mutationInfo) => {
      return queryClient.invalidateQueries({
        queryKey: ['item', mutationInfo.itemId],
      });
    },
    throwOnError: false,
  });
};

export default useToggleEquipmentMutation;
