import { useQuery } from '@tanstack/react-query';
import getItemById from './getItemById';

const useItemQuery = (apiUrl: string, itemId?: string) => {
  return useQuery({
    queryKey: ['item', itemId],
    queryFn: async () => await getItemById(apiUrl, itemId),
  });
};

export default useItemQuery;
