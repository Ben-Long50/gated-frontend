import { useMutation, useQueryClient } from '@tanstack/react-query';
import deletePerk from './deletePerk';
import { useNavigate } from 'react-router-dom';

const useDeletePerkMutation = (
  apiUrl: string,
  perkId: number,
  setFormMessage: (message: string) => void,
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => {
      return deletePerk(apiUrl, perkId);
    },
    onSuccess: () => {
      navigate('/glam/codex/perks');
      queryClient.removeQueries({
        queryKey: ['perk', perkId],
      });
      return queryClient.invalidateQueries({
        queryKey: ['perks'],
        exact: false,
      });
    },
    onError: (error) => {
      setFormMessage(error.message);
    },
    throwOnError: false,
  });
};

export default useDeletePerkMutation;
