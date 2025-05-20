import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import deleteItem from './deleteItem';

const useDeleteItemMutation = (
  apiUrl: string,
  setFormMessage: (message: string) => void,
  itemId: number,
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => {
      return deleteItem(apiUrl, itemId);
    },
    onSuccess: () => {
      navigate(-2);
      queryClient.invalidateQueries({
        queryKey: ['items'],
      });
      return queryClient.invalidateQueries({
        queryKey: ['activeCharacter'],
        exact: false,
      });
    },
    onError: (error) => {
      setFormMessage(error.message);
    },
    throwOnError: false,
  });
};

export default useDeleteItemMutation;
