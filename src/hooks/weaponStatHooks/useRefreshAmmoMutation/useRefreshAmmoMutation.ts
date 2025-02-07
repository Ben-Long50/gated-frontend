import { useMutation, useQueryClient } from '@tanstack/react-query';
import refreshAmmo from './refreshAmmo';
import { useRef } from 'react';
import { Character } from 'src/types/character';

const useRefreshAmmoMutation = (apiUrl: string, weaponId: number) => {
  const queryClient = useQueryClient();
  const timeoutRef = useRef(0);

  return useMutation({
    mutationFn: () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      return new Promise((resolve) => {
        timeoutRef.current = setTimeout(async () => {
          await refreshAmmo(apiUrl, weaponId);
          resolve(weaponId);
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
          weapons: prev.characterInventory.weapons.map((item) =>
            item.id === weaponId
              ? {
                  ...item,
                  stats: {
                    ...item.stats,
                    currentAmmoCount: item.stats.magCapacity,
                    currentMagCount: item.stats.magCount - 1,
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

export default useRefreshAmmoMutation;
