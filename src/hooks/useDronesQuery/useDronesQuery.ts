import { useQuery } from '@tanstack/react-query';
import getDrones from './getDrones';
import { Item } from 'src/types/item';

const useDronesQuery = (apiUrl: string) => {
  return useQuery<Item[]>({
    queryKey: ['drones'],
    queryFn: async () => await getDrones(apiUrl),
    throwOnError: false,
  });
};

export default useDronesQuery;
