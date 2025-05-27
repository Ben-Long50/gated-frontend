import { useMutation, useQueryClient } from '@tanstack/react-query';
import modifyItem from './modifyItem';
import { useNavigate } from 'react-router-dom';

const useModifyItemMutation = (
  apiUrl: string,
  characterId: number,
  itemId: number,
  category: string,
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (formData: FormData) => {
      return modifyItem(formData, characterId, itemId, category, apiUrl);
    },
    onSuccess: () => {
      navigate(-1);
      return queryClient.invalidateQueries({
        queryKey: ['item', itemId],
      });
    },
    throwOnError: false,
  });
};

export default useModifyItemMutation;
