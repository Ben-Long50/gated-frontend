import { useMutation, useQueryClient } from '@tanstack/react-query';
import modifyItem from './modifyItem';

const useModifyItemMutation = (
  apiUrl: string,
  itemId: number,
  category: string,
  setFormMessage: (message: string) => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => {
      return modifyItem(formData, itemId, apiUrl);
    },
    onSuccess: (data) => {
      setFormMessage(data.message);
      return queryClient.invalidateQueries({
        queryKey: [category, itemId],
      });
    },
    onError: (error) => {
      setFormMessage(error.message);
    },
    throwOnError: false,
  });
};

export default useModifyItemMutation;
