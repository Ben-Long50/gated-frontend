import { useQuery } from '@tanstack/react-query';
import getPerks from './getPerks';

const usePerksQuery = (apiUrl: string) => {
  return useQuery({
    queryKey: ['perks'],
    queryFn: async () => await getPerks(apiUrl),
  });
};

export default usePerksQuery;
