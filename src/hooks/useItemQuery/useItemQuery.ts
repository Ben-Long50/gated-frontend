import { useQuery } from '@tanstack/react-query';
import getItemById from './getItemById';

const useItemQuery = (apiUrl: string, itemId: number, options: object) => {
  return useQuery({
    queryKey: ['item', itemId],
    queryFn: async () => await getItemById(apiUrl, itemId),
    ...options,
  });
};

export default useItemQuery;
