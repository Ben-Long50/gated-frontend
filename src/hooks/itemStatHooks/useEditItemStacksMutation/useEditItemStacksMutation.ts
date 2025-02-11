import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import { Character } from 'src/types/character';
import editItemStacks from './editItemStacks';

const useEditItemStacksMutation = (apiUrl: string, itemId: number) => {
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
          await editItemStacks(apiUrl, itemId, finalValue);
          resolve(finalValue);
        }, 1000);
      });
    },

    onMutate: (value) => {
      queryClient.cancelQueries({ queryKey: ['activeCharacter'] });

      const prevCharacterData: Character | undefined = queryClient.getQueryData(
        ['activeCharacter'],
      );

      queryClient.setQueryData(['activeCharacter'], (prev: Character) => ({
        ...prev,
        characterInventory: {
          ...prev.characterInventory,
          items: prev.characterInventory.items.map((item) =>
            item.id === itemId
              ? {
                  ...item,
                  stats: {
                    ...item.stats,
                    currentStacks: item.stats.currentStacks
                      ? item.stats.currentStacks + value
                      : value,
                  },
                }
              : item,
          ),
        },
      }));

      return { prevCharacterData };
    },

    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['activeCharacter'],
        exact: false,
      });
    },
    throwOnError: false,
  });
};

export default useEditItemStacksMutation;
