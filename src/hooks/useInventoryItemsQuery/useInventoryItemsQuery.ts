import { useQueries } from '@tanstack/react-query';
import getItemById from '../useItemQuery/getItemById';

const useInventoryItemsQuery = (
  apiUrl: string,
  items: { category: string; id: number }[],
) => {
  return useQueries({
    queries: items?.map((item) => ({
      queryKey: ['item', item.id],
      queryFn: () => getItemById(apiUrl, item.id, item.category + 's'),
      enabled: !!item.id,
    })),
    combine: (results) => {
      return {
        items: results?.map((result) => result.data),
        isLoading: results?.some((result) => result.isLoading),
        isPending: results?.some((result) => result.isPending),
      };
    },
  });
};

export default useInventoryItemsQuery;
