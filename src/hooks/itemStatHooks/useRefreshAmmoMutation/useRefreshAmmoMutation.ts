import { useMutation, useQueryClient } from '@tanstack/react-query';
import refreshAmmo from './refreshAmmo';
import { useRef } from 'react';
import { Character } from 'src/types/character';
import { Item } from 'src/types/item';

const useRefreshAmmoMutation = (
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
          await refreshAmmo(apiUrl, itemId);
          resolve(itemId);
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
          currentAmmoCount: prevItemData?.stats.magCapacity,
          currentMagCount: prevItemData?.stats.magCount
            ? prevItemData?.stats.magCount - 1
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

export default useRefreshAmmoMutation;
