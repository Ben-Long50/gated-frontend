import { useQuery } from '@tanstack/react-query';
import getDroneById from './getDroneById';
import { Drone } from 'src/types/drone';

const useDroneQuery = (apiUrl: string, droneId: number, options: object) => {
  return useQuery<Drone>({
    queryKey: ['drone', droneId],
    queryFn: async () => await getDroneById(apiUrl, droneId),
    ...options,
  });
};

export default useDroneQuery;
