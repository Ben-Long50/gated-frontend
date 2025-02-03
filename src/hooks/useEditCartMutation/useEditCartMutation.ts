import { useMutation, useQueryClient } from '@tanstack/react-query';
import editCart from './editCart';

const useEditCartMutation = (apiUrl: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: {
      characterId: number;
      cartId: number;
      category: string;
      itemId: number;
    }) => {
      return editCart(apiUrl, formData);
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

export default useEditCartMutation;
