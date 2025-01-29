import { useMutation, useQueryClient } from '@tanstack/react-query';
import editCart from './editCart';

const useEditCartMutation = (apiUrl: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: {
      characterId: string;
      category: string;
      itemId: string;
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
