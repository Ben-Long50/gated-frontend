import { useQuery } from '@tanstack/react-query';
import getFaction from './getFaction';

const useFactionQuery = (apiUrl: string, factionId: number) => {
  return useQuery({
    queryKey: ['faction', factionId],
    queryFn: async () => await getFaction(apiUrl, factionId),
    throwOnError: false,
  });
};

export default useFactionQuery;
