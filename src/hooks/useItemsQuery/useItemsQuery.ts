import { useQuery } from '@tanstack/react-query';
import getItems from './getItems';

const useItemsQuery = (apiUrl: string) => {
  return useQuery({
    queryKey: ['items'],
    queryFn: async () => await getItems(apiUrl),
  });
};

export default useItemsQuery;
