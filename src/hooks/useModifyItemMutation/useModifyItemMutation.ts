import { useMutation, useQueryClient } from '@tanstack/react-query';
import modifyItem from './modifyItem';
import { useNavigate } from 'react-router-dom';

const useModifyItemMutation = (
  apiUrl: string,
  characterId: number,
  itemId: number,
  category: string,
  setFormMessage: (message: string) => void,
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (formData: FormData) => {
      return modifyItem(formData, characterId, itemId, apiUrl);
    },
    onSuccess: (data) => {
      setFormMessage(data.message);
      navigate(-1);
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
