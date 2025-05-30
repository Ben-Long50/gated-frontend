import { useMutation, useQueryClient } from '@tanstack/react-query';
import completePurchase from './completePurchase';

const useCompletePurchaseMutation = (
  apiUrl: string,
  characterId: number,
  inventoryId: number,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => {
      return completePurchase(apiUrl, characterId, inventoryId);
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['character', characterId],
      });
    },
    throwOnError: false,
  });
};

export default useCompletePurchaseMutation;
