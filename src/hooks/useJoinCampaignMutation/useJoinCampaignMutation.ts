import { useMutation, useQueryClient } from '@tanstack/react-query';
import joinCampaign from './joinCampaign';

const useJoinCampaignMutation = (apiUrl: string, campaignId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      if (!campaignId) {
        throw new Error('Campaign id required to join campaign');
      }
      return joinCampaign(apiUrl, campaignId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['campaign', campaignId],
      });
      return queryClient.invalidateQueries({
        queryKey: ['campaigns'],
        exact: false,
      });
    },
    throwOnError: false,
  });
};

export default useJoinCampaignMutation;
