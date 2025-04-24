import { useMutation, useQueryClient } from '@tanstack/react-query';
import deleteAction from './deleteAffiliation';
import { useNavigate } from 'react-router-dom';

const useDeleteAffiliationMutation = (
  apiUrl: string,
  affiliationId: number,
  setFormMessage: (message: string) => void,
  factionId?: number,
  characterId?: number,
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => {
      return deleteAction(apiUrl, affiliationId);
    },
    onSuccess: () => {
      navigate(-1);
      queryClient.invalidateQueries({
        queryKey: ['affiliation', affiliationId],
      });
      queryClient.invalidateQueries({
        queryKey: ['faction', factionId],
      });
      return queryClient.invalidateQueries({
        queryKey: ['character', characterId],
      });
    },
    onError: (error) => {
      console.log(error);

      setFormMessage(error.message);
    },
    throwOnError: false,
  });
};

export default useDeleteAffiliationMutation;
