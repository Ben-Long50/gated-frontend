import { useMutation, useQueryClient } from '@tanstack/react-query';
import createItem from './createItem';

const useCreateItemMutation = (
  apiUrl: string,
  setFormMessage: (message: string) => void,
  itemId?: number,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => {
      return createItem(apiUrl, formData);
    },
    onSuccess: (data) => {
      setFormMessage(data.message);
      queryClient.invalidateQueries({
        queryKey: ['item', itemId],
        exact: false,
      });
      return queryClient.invalidateQueries({
        queryKey: ['items'],
        exact: false,
      });
    },
    onError: (error) => {
      setFormMessage(error.message);
    },
    throwOnError: false,
  });
};

export default useCreateItemMutation;
