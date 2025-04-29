import { useQuery, useQueryClient } from '@tanstack/react-query';
import getCampaign from './getCampaign';
import { Campaign } from 'src/types/campaign';
import { Character } from 'src/types/character';

const useCampaignQuery = (apiUrl: string, campaignId: number) => {
  const queryClient = useQueryClient();

  return useQuery<Campaign>({
    queryKey: ['campaign', campaignId],
    queryFn: async () => {
      const campaign = (await getCampaign(apiUrl, campaignId)) as Campaign;

      campaign.characters.forEach((character: Character) => {
        queryClient.setQueryData(['character', character.id], character);
      });

      return campaign;
    },
    enabled: !!campaignId,
    throwOnError: false,
  });
};

export default useCampaignQuery;
