import { useQuery } from '@tanstack/react-query';
import getPerks from './getPerks';
import { Perk } from 'src/types/perk';

const usePerksQuery = (apiUrl: string) => {
  return useQuery<Perk[]>({
    queryKey: ['perks'],
    queryFn: async () => await getPerks(apiUrl),
  });
};

export default usePerksQuery;
