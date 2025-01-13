import { useQuery } from '@tanstack/react-query';
import getVehicles from './getVehicles';

const useVehiclesQuery = (apiUrl: string) => {
  return useQuery({
    queryKey: ['vehicles'],
    queryFn: async () => await getVehicles(apiUrl),
    throwOnError: false,
  });
};

export default useVehiclesQuery;
