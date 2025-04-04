import { useQuery } from '@tanstack/react-query';
import getCampaign from './getCampaign';

const useCampaignQuery = (apiUrl: string, campaignId: string) => {
  return useQuery({
    queryKey: ['campaign', campaignId],
    queryFn: async () => await getCampaign(apiUrl, campaignId),
    throwOnError: false,
  });
};

export default useCampaignQuery;
