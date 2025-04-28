import { useQuery } from '@tanstack/react-query';
import getVehicleById from './getVehicleById';

const useVehicleQuery = (
  apiUrl: string,
  vehicleId: number,
  options: object,
) => {
  return useQuery({
    queryKey: ['vehicle', vehicleId],
    queryFn: async () => await getVehicleById(apiUrl, vehicleId),
    ...options,
  });
};

export default useVehicleQuery;
