import { useQuery } from '@tanstack/react-query';
import getWeapons from './getWeapons';

const useWeaponsQuery = (apiUrl: string) => {
  return useQuery({
    queryKey: ['weapons'],
    queryFn: async () => await getWeapons(apiUrl),
    throwOnError: false,
  });
};

export default useWeaponsQuery;
