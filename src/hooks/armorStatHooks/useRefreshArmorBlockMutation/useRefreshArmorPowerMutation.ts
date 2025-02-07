import { useMutation, useQueryClient } from '@tanstack/react-query';
import refreshArmorPower from './refreshArmorPower';
import { Character } from 'src/types/character';
import { useRef } from 'react';

const useRefreshArmorPowerMutation = (apiUrl: string, armorId: number) => {
  const queryClient = useQueryClient();
  const timeoutRef = useRef(0);

  return useMutation({
    mutationFn: () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      return new Promise((resolve) => {
        timeoutRef.current = setTimeout(async () => {
          await refreshArmorPower(apiUrl, armorId);
          resolve(armorId);
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
          armor: prev.characterInventory.armor.map((item) =>
            item.id === armorId
              ? {
                  ...item,
                  stats: {
                    ...item.stats,
                    currentPower: item.stats.power,
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

export default useRefreshArmorPowerMutation;
