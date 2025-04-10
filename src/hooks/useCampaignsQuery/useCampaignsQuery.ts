import { useQuery } from '@tanstack/react-query';
import getOwnerCampaigns from './getOwnerCampaigns';
import getPlayerCampaigns from './getPlayerCampaigns';
import getPendingCampaigns from './getPendingCampaigns';

const useCampaignsQuery = (apiUrl: string, type?: string) => {
  return useQuery({
    queryKey: ['campaigns', type],
    queryFn: async () => {
      let campaigns;
      switch (type?.toLowerCase()) {
        case 'owner':
          campaigns = await getOwnerCampaigns(apiUrl);
          break;
        case 'player':
          campaigns = await getPlayerCampaigns(apiUrl);
          break;
        case 'pending':
          campaigns = await getPendingCampaigns(apiUrl);
          break;
        default:
          const ownerCampaigns = await getOwnerCampaigns(apiUrl);
          const playerCampaigns = await getPlayerCampaigns(apiUrl);
          campaigns = [...ownerCampaigns, ...playerCampaigns];

          break;
      }

      return campaigns;
    },
    throwOnError: false,
  });
};

export default useCampaignsQuery;
