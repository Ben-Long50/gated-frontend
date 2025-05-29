import { useMutation, useQueryClient } from '@tanstack/react-query';
import editAmmo from './editAmmo';
import { useRef } from 'react';
import { Item } from 'src/types/item';
import { socket } from 'src/socket';

const useEditAmmoMutation = (
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
          await editAmmo(apiUrl, itemId, finalValue);
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
          currentAmmoCount: prevItemData?.stats.currentAmmoCount
            ? prevItemData?.stats.currentAmmoCount + value
            : value,
        },
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

export default useEditAmmoMutation;
