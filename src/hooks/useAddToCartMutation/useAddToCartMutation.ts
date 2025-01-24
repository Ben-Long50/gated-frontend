import { useMutation, useQueryClient } from '@tanstack/react-query';
import addToCart from './addToCart';

const useAddToCartMutation = (apiUrl: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: {
      characterId: string;
      category: string;
      itemId: string;
    }) => {
      return addToCart(apiUrl, formData);
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

export default useAddToCartMutation;
