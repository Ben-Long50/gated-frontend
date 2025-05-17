import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import { Character } from 'src/types/character';
import editHull from './editHull';

const useEditHullMutation = (
  apiUrl: string,
  vehicleId: number,
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
          await editHull(apiUrl, vehicleId, finalValue);
          resolve(finalValue);
        }, 1000);
      });
    },

    onMutate: (value) => {
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
              item.id === vehicleId
                ? {
                    ...item,
                    stats: {
                      ...item.stats,
                      currentHull: item.stats.currentHull
                        ? item.stats.currentHull + value
                        : value,
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

export default useEditHullMutation;
