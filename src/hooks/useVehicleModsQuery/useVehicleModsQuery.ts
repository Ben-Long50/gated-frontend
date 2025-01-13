import { useQuery } from '@tanstack/react-query';
import getVehicleMods from './getVehicleMods';

const useVehicleModsQuery = (apiUrl: string) => {
  return useQuery({
    queryKey: ['vehicleMods'],
    queryFn: async () => await getVehicleMods(apiUrl),
  });
};

export default useVehicleModsQuery;
