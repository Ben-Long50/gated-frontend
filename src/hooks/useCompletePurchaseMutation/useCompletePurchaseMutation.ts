import { useMutation, useQueryClient } from '@tanstack/react-query';
import completePurchase from './completePurchase';

const useCompletePurchaseMutation = (
  apiUrl: string,
  characterId: number,
  inventoryId: number,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: object) => {
      return completePurchase(formData, apiUrl, characterId, inventoryId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['activeCharacter'],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ['character'],
        exact: false,
      });
      return queryClient.invalidateQueries({
        queryKey: ['characters'],
        exact: false,
      });
    },
    throwOnError: false,
  });
};

export default useCompletePurchaseMutation;
