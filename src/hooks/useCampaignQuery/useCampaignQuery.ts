import { useQuery } from '@tanstack/react-query';
import getCampaign from './getCampaign';
import { Campaign } from 'src/types/campaign';

const useCampaignQuery = (apiUrl: string, campaignId: number) => {
  return useQuery<Campaign>({
    queryKey: ['campaign', campaignId],
    queryFn: async () => await getCampaign(apiUrl, campaignId),
    throwOnError: false,
  });
};

export default useCampaignQuery;
