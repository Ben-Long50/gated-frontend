import { useMutation, useQueryClient } from '@tanstack/react-query';
import editAmmo from './editAmmo';
import { useRef } from 'react';
import { Character } from 'src/types/character';

const useEditAmmoMutation = (apiUrl: string, weaponId: number) => {
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
          await editAmmo(apiUrl, weaponId, finalValue);
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
          weapons: prev.characterInventory.weapons.map((item) =>
            item.id === weaponId
              ? {
                  ...item,
                  stats: {
                    ...item.stats,
                    currentAmmoCount: item.stats.currentAmmoCount
                      ? item.stats.currentAmmoCount + value
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

export default useEditAmmoMutation;
