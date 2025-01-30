import { useQuery } from '@tanstack/react-query';
import getVehicleMods from './getVehicleMods';

const useVehicleModsQuery = (
  apiUrl: string,
  options?: { enabled: boolean },
) => {
  return useQuery({
    queryKey: ['vehicleMods'],
    queryFn: async () => await getVehicleMods(apiUrl),
    enabled: options?.enabled,
  });
};

export default useVehicleModsQuery;
