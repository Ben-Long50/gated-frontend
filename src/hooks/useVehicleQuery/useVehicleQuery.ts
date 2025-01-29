import { useQuery } from '@tanstack/react-query';
import getVehicleById from './getVehicleById';

const useVehicleQuery = (apiUrl: string, vehicleId?: string) => {
  return useQuery({
    queryKey: ['vehicle', vehicleId],
    queryFn: async () => await getVehicleById(apiUrl, vehicleId),
    throwOnError: false,
    enabled: !!vehicleId,
  });
};

export default useVehicleQuery;
