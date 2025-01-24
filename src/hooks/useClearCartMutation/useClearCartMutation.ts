import { useMutation, useQueryClient } from '@tanstack/react-query';
import clearCart from './clearCart';

const useClearCartMutation = (
  apiUrl: string,
  characterId: string,
  setDeleteMode: (mode: boolean) => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => {
      return clearCart(apiUrl, characterId);
    },
    onSuccess: () => {
      setDeleteMode(false);
      return queryClient.invalidateQueries({
        queryKey: ['activeCharacter'],
        exact: false,
      });
    },
    throwOnError: false,
  });
};

export default useClearCartMutation;
