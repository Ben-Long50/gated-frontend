import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import editItemConditionStacks from './editItemConditionStacks';
import { Item } from 'src/types/item';
import { socket } from 'src/socket';

const useItemConditionStacksMutation = (
  apiUrl: string,
  conditionId: number,
  itemId: number,
) => {
  const queryClient = useQueryClient();
  const updateBuffer = useRef(0);
  const timeoutRef = useRef(0);

  return useMutation({
    mutationFn: (value: number) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      updateBuffer.current += value;

      return new Promise((resolve) => {
        timeoutRef.current = setTimeout(async () => {
          const finalValue = updateBuffer.current;

          updateBuffer.current = 0;
          await editItemConditionStacks(
            apiUrl,
            conditionId,
            itemId,
            finalValue,
          );
          resolve(finalValue);
        }, 1000);
      });
    },

    onMutate: (value) => {
      queryClient.cancelQueries({ queryKey: ['item', itemId] });

      const prevItemData: Item | undefined = queryClient.getQueryData([
        'item',
        itemId,
      ]);

      queryClient.setQueryData(['item', itemId], (prev: Item) => ({
        ...prev,
        conditions: prevItemData?.conditions.map((condition) =>
          condition.id === conditionId
            ? {
                ...condition,
                stacks: condition?.stacks ? condition.stacks + value : value,
              }
            : condition,
        ),
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

export default useItemConditionStacksMutation;
