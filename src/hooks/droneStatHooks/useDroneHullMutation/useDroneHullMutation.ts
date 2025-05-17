import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import { Character } from 'src/types/character';
import editDroneHull from './editDroneHull';

const useDroneHullMutation = (
  apiUrl: string,
  droneId: number,
  characterId: number,
) => {
  const queryClient = useQueryClient();
  const updateBuffer = useRef(0);
  const timeoutRef = useRef(0);

  const editDroneHullMutation = useMutation({
    mutationFn: async (value: number) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      updateBuffer.current += value;

      return new Promise((resolve) => {
        timeoutRef.current = setTimeout(async () => {
          const finalValue = updateBuffer.current;

          updateBuffer.current = 0;
          await editDroneHull(apiUrl, droneId, finalValue);
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
              item.id === droneId
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
      // queryClient.invalidateQueries({
      //   queryKey: ['drone', droneId],
      // });
      return queryClient.invalidateQueries({
        queryKey: ['character', characterId],
      });
    },
    throwOnError: false,
  });
  return editDroneHullMutation;
};

export default useDroneHullMutation;
