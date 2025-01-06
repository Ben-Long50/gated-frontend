import { useQuery } from '@tanstack/react-query';
import getPerkById from './getPerkById';

const usePerkQuery = (apiUrl: string, perkId: string) => {
  return useQuery({
    queryKey: ['perk', perkId],
    queryFn: async () => await getPerkById(apiUrl, perkId),
  });
};

export default usePerkQuery;
