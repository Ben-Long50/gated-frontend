import { useQuery } from '@tanstack/react-query';
import getVehicles from './getVehicles';
import { Item } from 'src/types/item';

const useVehiclesQuery = (apiUrl: string) => {
  return useQuery<Item[]>({
    queryKey: ['vehicles'],
    queryFn: async () => await getVehicles(apiUrl),
    throwOnError: false,
  });
};

export default useVehiclesQuery;
