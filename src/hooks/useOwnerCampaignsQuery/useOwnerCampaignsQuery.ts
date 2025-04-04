import { useQuery } from '@tanstack/react-query';
import getOwnerCampaigns from './getOwnerCampaigns';

const useOwnerCampaignsQuery = (apiUrl: string) => {
  return useQuery({
    queryKey: ['ownerCampaigns'],
    queryFn: async () => await getOwnerCampaigns(apiUrl),
    throwOnError: false,
  });
};

export default useOwnerCampaignsQuery;
