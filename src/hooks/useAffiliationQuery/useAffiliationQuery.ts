import { useQuery } from '@tanstack/react-query';
import getAffiliation from './getAffiliation';

const useAffiliationQuery = (affiliationId: number) => {
  return useQuery({
    queryKey: ['affiliation', affiliationId],
    queryFn: () => getAffiliation.fetch(affiliationId),
    throwOnError: false,
    enabled: !!affiliationId,
  });
};

export default useAffiliationQuery;
