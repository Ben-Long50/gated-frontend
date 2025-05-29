import { useQuery } from '@tanstack/react-query';
import getCampaigns from './getCampaigns';
import { Campaign } from 'src/types/campaign';

const useCampaignsQuery = (apiUrl: string) => {
  return useQuery<Campaign[]>({
    queryKey: ['campaigns'],
    queryFn: () => getCampaigns(apiUrl),
    throwOnError: false,
  });
};

export default useCampaignsQuery;
