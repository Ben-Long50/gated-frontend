import { useMutation, useQueryClient } from '@tanstack/react-query';
import createItem from './createItemCopy';

const useCreateItemCopyMutation = (
  apiUrl: string,
  category: string,
  itemId: number,
  setFormMessage: (message: string) => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => {
      return createItem(apiUrl, category, itemId);
    },
    onSuccess: (data) => {
      setFormMessage(data.message);
      return queryClient.invalidateQueries({
        queryKey: [category],
      });
    },
    onError: (error) => {
      setFormMessage(error.message);
    },
    throwOnError: false,
  });
};

export default useCreateItemCopyMutation;
