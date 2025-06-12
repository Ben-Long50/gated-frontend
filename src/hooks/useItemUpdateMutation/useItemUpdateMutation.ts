import { useMutation, useQueryClient } from '@tanstack/react-query';
import updateItem from './updateItem';
import { useNavigate } from 'react-router-dom';

const useItemUpdateMutation = (
  apiUrl: string,
  category: string,
  itemId: number,
  characterId: number,
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (formData: FormData) => {
      return updateItem(apiUrl, category, itemId, formData);
    },
    onSuccess: () => {
      navigate(-1);
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
