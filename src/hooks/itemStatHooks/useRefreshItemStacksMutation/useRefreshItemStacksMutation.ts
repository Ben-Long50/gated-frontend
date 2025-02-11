import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Character } from 'src/types/character';
import { useRef } from 'react';
import refreshItemStacks from './refreshItemStacks';

const useRefreshItemStacksMutation = (apiUrl: string, itemId: number) => {
  const queryClient = useQueryClient();
  const timeoutRef = useRef(0);

  return useMutation({
    mutationFn: () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      return new Promise((resolve) => {
        timeoutRef.current = setTimeout(async () => {
          await refreshItemStacks(apiUrl, itemId);
          resolve(itemId);
        }, 1000);
      });
    },

    onMutate: () => {
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
                    currentStacks: item.stats.maxStacks,
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

export default useRefreshItemStacksMutation;
