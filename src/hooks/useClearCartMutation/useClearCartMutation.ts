import { useMutation, useQueryClient } from '@tanstack/react-query';
import clearCart from './clearCart';

const useClearCartMutation = (
  apiUrl: string,
  characterId: number,
  cartId: number,
  setDeleteMode: (mode: boolean) => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => {
      return clearCart(apiUrl, characterId, cartId);
    },
    onSuccess: () => {
      setDeleteMode(false);
      return queryClient.invalidateQueries({
        queryKey: ['character', characterId],
      });
    },
    throwOnError: false,
  });
};

export default useClearCartMutation;
