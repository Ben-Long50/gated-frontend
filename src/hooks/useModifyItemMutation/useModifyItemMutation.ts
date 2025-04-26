import { useMutation, useQueryClient } from '@tanstack/react-query';
import modifyItem from './modifyItem';

const useModifyItemMutation = (
  apiUrl: string,
  itemId: string,
  setFormMessage: (message: string) => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => {
      return modifyItem(formData, itemId, apiUrl);
    },
    onSuccess: (data) => {
      setFormMessage(data.message);
      queryClient.invalidateQueries({
        queryKey: ['item'],
        exact: false,
      });
      return queryClient.invalidateQueries({
        queryKey: ['character'],
        exact: false,
      });
    },
    onError: (error) => {
      setFormMessage(error.message);
    },
    throwOnError: false,
  });
};

export default useModifyItemMutation;
