import { useQuery } from '@tanstack/react-query';
import getWeaponById from './getVehicleById';

const useVehicleQuery = (apiUrl: string, vehicleId: string) => {
  return useQuery({
    queryKey: ['vehicle', vehicleId],
    queryFn: async () => await getWeaponById(apiUrl, vehicleId),
    throwOnError: false,
  });
};

export default useVehicleQuery;
