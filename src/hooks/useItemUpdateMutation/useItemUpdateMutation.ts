import { useMutation, useQueryClient } from '@tanstack/react-query';
import updateItem from './updateItem';

const useItemUpdateMutation = (
  apiUrl: string,
  category: string,
  itemId: number,
  characterId: number,
  toggleUpdateMode: () => void,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => {
      return updateItem(apiUrl, category, itemId, formData);
    },
    onSuccess: () => {
      toggleUpdateMode();
      queryClient.invalidateQueries({
        queryKey: ['item', itemId],
      });
      return queryClient.invalidateQueries({
        queryKey: ['character', characterId],
      });
    },
    throwOnError: false,
  });
};

export default useItemUpdateMutation;
