import { useQuery } from '@tanstack/react-query';
import getDrones from './getDrones';
import { Drone } from 'src/types/drone';

const useDronesQuery = (apiUrl: string) => {
  return useQuery<Drone[]>({
    queryKey: ['drones'],
    queryFn: async () => await getDrones(apiUrl),
    throwOnError: false,
  });
};

export default useDronesQuery;
