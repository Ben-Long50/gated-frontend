import { useMutation, useQueryClient } from '@tanstack/react-query';
import createItemCondition from './createItemCondition';
import { socket } from 'src/socket';
import { Item } from 'src/types/item';

const useCreateItemConditionMutation = (
  apiUrl: string,
  itemId: number,
  characterId: number,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: { conditionId: number; stacks?: number }[]) => {
      return createItemCondition(apiUrl, itemId, formData);
    },

    onMutate: (formData) => {
      queryClient.cancelQueries({ queryKey: ['item', itemId] });

      const prevItemData: Item | undefined = queryClient.getQueryData([
        'item',
        itemId,
      ]);

      const conditionData = formData
        .map((condition) => ({
          condition: queryClient.getQueryData([
            'condition',
            condition.conditionId,
          ]),
          stacks: condition.stacks,
          characterId,
        }))
        .sort((a, b) => a.condition.name.localeCompare(b.condition.name));

      queryClient.setQueryData(['item', itemId], (prev: Item) => ({
        ...prev,
        conditions: conditionData,
      }));

      return { prevItemData };
    },

    onSuccess: () => {
      socket.emit('item', itemId);
      return queryClient.invalidateQueries({
        queryKey: ['item', itemId],
      });
    },
    throwOnError: false,
  });
};

export default useCreateItemConditionMutation;
