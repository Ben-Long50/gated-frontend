import { useQuery } from '@tanstack/react-query';
import getItems from './getItems';
import { Item } from 'src/types/item';

const useItemsQuery = (apiUrl: string) => {
  return useQuery<Item[]>({
    queryKey: ['items'],
    queryFn: async () => await getItems(apiUrl),
  });
};

export default useItemsQuery;
