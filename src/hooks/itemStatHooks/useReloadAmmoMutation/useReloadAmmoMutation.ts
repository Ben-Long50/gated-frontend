import { useMutation, useQueryClient } from '@tanstack/react-query';
import reloadAmmo from './reloadAmmo';
import { useRef } from 'react';
import { Character } from 'src/types/character';

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
      queryClient.cancelQueries({ queryKey: ['character', characterId] });

      const prevCharacterData: Character | undefined = queryClient.getQueryData(
        ['character', characterId],
      );

      queryClient.setQueryData(
        ['character', characterId],
        (prev: Character) => ({
          ...prev,
          characterInventory: {
            ...prev.characterInventory,
            items: prev.characterInventory.items.map((item) =>
              item.id === itemId
                ? {
                    ...item,
                    stats: {
                      ...item.stats,
                      currentAmmoCount: item.stats.magCapacity,
                      currentMagCount: item.stats.currentMagCount
                        ? item.stats.currentMagCount - 1
                        : undefined,
                    },
                  }
                : item,
            ),
          },
        }),
      );

      return { prevCharacterData };
    },

    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['character', characterId],
        exact: false,
      });
    },
    throwOnError: false,
  });
};

export default useReloadAmmoMutation;
