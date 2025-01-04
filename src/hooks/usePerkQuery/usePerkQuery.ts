import { useQuery } from '@tanstack/react-query';
import getPerkById from './getPerkById';

const usePerkQuery = (apiUrl, authToken, perkId) => {
  return useQuery({
    queryKey: ['perk', perkId],
    queryFn: async () => await getPerkById(apiUrl, authToken, perkId),
  });
};

export default usePerkQuery;
