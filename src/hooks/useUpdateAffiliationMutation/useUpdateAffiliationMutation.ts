import { useMutation, useQueryClient } from '@tanstack/react-query';
import updateFaction from './updateAffiliation';

const useUpdateAffiliationMutation = (
  apiUrl: string,
  affiliationId: number,
  setFormMessage: (message: string) => void,
  factionId?: number,
  characterId?: number,
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
      queryClient.invalidateQueries({
        queryKey: ['faction', factionId],
      });
      return queryClient.invalidateQueries({
        queryKey: ['character', characterId],
      });
    },
    onError: (error) => {
      setFormMessage(error.message);
    },
    throwOnError: false,
  });
};

export default useUpdateAffiliationMutation;
