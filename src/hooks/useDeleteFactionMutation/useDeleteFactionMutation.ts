import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import deleteFaction from './deleteFaction';

const useDeleteFactionMutation = (
  apiUrl: string,
  campaignId: number,
  factionId: number,
  setFormMessage: (message: string) => void,
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => {
      return deleteFaction(apiUrl, campaignId, factionId);
    },
    onSuccess: () => {
      navigate(`/glam/campaigns/${campaignId}`);
      queryClient.invalidateQueries({
        queryKey: ['faction', factionId],
      });
      return queryClient.invalidateQueries({
        queryKey: ['campaign', campaignId],
      });
    },
    onError: (error) => {
      setFormMessage(error.message);
    },
    throwOnError: false,
  });
};

export default useDeleteFactionMutation;
