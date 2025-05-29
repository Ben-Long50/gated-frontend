import { useMutation, useQueryClient } from '@tanstack/react-query';
import editArmorPower from './editPower';
import { useRef } from 'react';
import { Character } from 'src/types/character';
import { Item } from 'src/types/item';

const useEditPowerMutation = (
  apiUrl: string,
  itemId: number,
  characterId: number,
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
          await editArmorPower(apiUrl, itemId, finalValue);
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
        stats: {
          ...prevItemData?.stats,
          currentPower: prevItemData?.stats.currentPower
            ? prevItemData?.stats.currentPower + value
            : value,
        },
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

export default useEditPowerMutation;
