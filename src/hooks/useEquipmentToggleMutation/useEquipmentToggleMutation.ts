import { useMutation, useQueryClient } from '@tanstack/react-query';
import toggleEquipment from './toggleEquipment';

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
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['equipment'],
        exact: false,
      });
      return queryClient.invalidateQueries({
        queryKey: ['activeCharacter'],
        exact: false,
      });
    },
    throwOnError: false,
  });
};

export default useToggleEquipmentMutation;
