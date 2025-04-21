import { useMutation, useQueryClient } from '@tanstack/react-query';
import updateFaction from './updateAffiliation';

const useUpdateAffiliationMutation = (
  apiUrl: string,
  affiliationId: string,
  setFormMessage: (message: string) => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (value: number) => {
      return updateFaction(value, affiliationId, apiUrl);
    },
    onSuccess: () => {
      setFormMessage('Affiliation successfully updated');
      queryClient.invalidateQueries({
        queryKey: ['affiliation', affiliationId],
      });
      return queryClient.invalidateQueries({
        queryKey: ['activeCharacter'],
      });
    },
    onError: (error) => {
      setFormMessage(error.message);
    },
    throwOnError: false,
  });
};

export default useUpdateAffiliationMutation;
