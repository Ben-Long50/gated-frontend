import { useQuery } from '@tanstack/react-query';
import getVehicleModById from './getVehicleModById';

const useVehicleModQuery = (apiUrl: string, modId?: string) => {
  return useQuery({
    queryKey: ['vehicleMod', modId],
    queryFn: async () => await getVehicleModById(apiUrl, modId),
    throwOnError: false,
    enabled: !!modId,
  });
};

export default useVehicleModQuery;
