import { useQuery } from '@tanstack/react-query';
import getPerks from './getPerks';

const usePerksQuery = (apiUrl, authToken) => {
  return useQuery({
    queryKey: ['perks', authToken],
    queryFn: async () => await getPerks(apiUrl, authToken),
  });
};

export default usePerksQuery;
