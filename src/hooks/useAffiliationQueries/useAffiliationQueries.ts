import { useQueries } from '@tanstack/react-query';
import getAffiliation from '../useAffiliationQuery/getAffiliation';

const useAffiliationQueries = (affiliationIds: number[]) => {
  return useQueries({
    queries: affiliationIds?.map((affiliationId) => ({
      queryKey: ['affiliation', affiliationId],
      queryFn: () => getAffiliation.fetch(affiliationId),
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
