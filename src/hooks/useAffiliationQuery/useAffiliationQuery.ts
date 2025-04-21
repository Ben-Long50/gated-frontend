import { useQuery } from '@tanstack/react-query';
import getCampaign from './getAffiliation';

const useAffiliationQuery = (apiUrl: string, affiliationId: string) => {
  return useQuery({
    queryKey: ['affiliation', affiliationId],
    queryFn: async () => await getCampaign(apiUrl, affiliationId),
    throwOnError: false,
  });
};

export default useAffiliationQuery;
