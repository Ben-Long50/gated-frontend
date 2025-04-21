import { useMutation, useQueryClient } from '@tanstack/react-query';
import deleteAction from './deleteAffiliation';
import { useNavigate } from 'react-router-dom';

const useDeleteAffiliationMutation = (
  apiUrl: string,
  affiliationId: string,
  setFormMessage: (message: string) => void,
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
      return queryClient.invalidateQueries({
        queryKey: ['activeCharacter'],
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
