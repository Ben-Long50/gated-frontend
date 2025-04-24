import { useMutation, useQueryClient } from '@tanstack/react-query';
import refreshArmorBlock from './refreshArmorBlock';
import { useRef } from 'react';
import { Character } from 'src/types/character';

const useRefreshArmorBlockMutation = (
  apiUrl: string,
  armorId: number,
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
          await refreshArmorBlock(apiUrl, armorId);
          resolve(armorId);
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
            armor: prev.characterInventory.armor.map((item) =>
              item.id === armorId
                ? {
                    ...item,
                    stats: {
                      ...item.stats,
                      currentBlock: item.stats.block,
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

export default useRefreshArmorBlockMutation;
