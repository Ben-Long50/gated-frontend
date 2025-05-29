import { useMutation, useQueryClient } from '@tanstack/react-query';
import deleteItemCondition from './deleteItemCondition';
import { Item } from 'src/types/item';

const useDeleteItemConditionMutation = (
  apiUrl: string,
  conditionId: number,
  itemId: number,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => {
      return deleteItemCondition(apiUrl, conditionId, itemId);
    },

    onMutate: () => {
      queryClient.cancelQueries({ queryKey: ['item', itemId] });

      const prevItemData: Item | undefined = queryClient.getQueryData([
        'item',
        itemId,
      ]);

      queryClient.setQueryData(['item', itemId], (prev: Item) => ({
        ...prev,
        conditions: prevItemData?.conditions.filter(
          (condition) => condition.id !== conditionId,
        ),
      }));

      return { prevItemData };
    },

    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['item', itemId],
      });
    },
    throwOnError: false,
  });
};

export default useDeleteItemConditionMutation;
