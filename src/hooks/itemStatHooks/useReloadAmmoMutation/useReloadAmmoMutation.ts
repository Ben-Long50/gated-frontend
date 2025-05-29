import { useMutation, useQueryClient } from '@tanstack/react-query';
import reloadAmmo from './reloadAmmo';
import { useRef } from 'react';
import { Item } from 'src/types/item';

const useReloadAmmoMutation = (
  apiUrl: string,
  itemId: number,
  characterId: number,
) => {
  const queryClient = useQueryClient();
  const timeoutRef = useRef(0);

  return useMutation({
    mutationFn: () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      return new Promise((resolve) => {
        timeoutRef.current = setTimeout(async () => {
          await reloadAmmo(apiUrl, itemId);
          resolve(itemId);
        }, 1000);
      });
    },

    onMutate: () => {
      queryClient.cancelQueries({ queryKey: ['item', itemId] });

      const prevItemData: Item | undefined = queryClient.getQueryData([
        'item',
        itemId,
      ]);

      queryClient.setQueryData(['item', itemId], (prev: Item) => ({
        ...prev,
        stats: {
          ...prevItemData?.stats,
          currentAmmoCount: prevItemData?.stats.magCapacity,
          currentMagCount: prevItemData?.stats.currentMagCount
            ? prevItemData?.stats.currentMagCount - 1
            : undefined,
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

export default useReloadAmmoMutation;
