import { useQuery } from '@tanstack/react-query';
import getItemById from './getItemById';
import { Item } from 'src/types/item';

const useItemQuery = (apiUrl: string, itemId: number, category: string) => {
  return useQuery<Item>({
    queryKey: ['item', itemId],
    queryFn: async () => await getItemById(apiUrl, itemId, category),
    enabled: !!category,
  });
};

export default useItemQuery;
