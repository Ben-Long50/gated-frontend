import { useQuery } from '@tanstack/react-query';
import getWeapons from './getWeapons';

const useWeaponsQuery = (apiUrl, authToken) => {
  return useQuery({
    queryKey: ['weapons'],
    queryFn: async () => await getWeapons(apiUrl, authToken),
    throwOnError: false,
  });
};

export default useWeaponsQuery;
