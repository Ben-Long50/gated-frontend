import { useQueries } from '@tanstack/react-query';
import getAffiliation from '../useAffiliationQuery/getAffiliation';

const useAffiliationQueries = (apiUrl: string, affiliationIds: number[]) => {
  return useQueries({
    queries: affiliationIds.map((affiliationId) => ({
      queryKey: ['affiliation', affiliationId],
      queryFn: () => getAffiliation(apiUrl, affiliationId),
      enabled: !!affiliationId,
    })),
    combine: (results) => {
      return {
        data: results.map((result) => result.data) || [],
        isLoading: results.some((result) => result.isLoading),
        isPending: results.some((result) => result.isPending),
      };
    },
  });
};

export default useAffiliationQueries;
