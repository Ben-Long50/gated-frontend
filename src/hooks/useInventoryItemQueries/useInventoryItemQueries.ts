import { useQueries } from '@tanstack/react-query';
import getItemById from '../useItemQuery/getItemById';
import { Item } from 'src/types/item';

const useInventoryItemQueries = (itemsIds: number[]) => {
  return useQueries({
    queries: itemsIds?.map((itemId) => ({
      queryKey: ['item', itemId],
      queryFn: () => getItemById.fetch(itemId),
      enabled: !!itemId,
    })),
    combine: (results) => {
      return {
        items: results?.map((result) => result.data) as Item[],
        isLoading: results?.some((result) => result.isLoading),
        isPending: results?.some((result) => result.isPending),
      };
    },
  });
};

export default useInventoryItemQueries;
