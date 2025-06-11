import { useMutation, useQueryClient } from '@tanstack/react-query';
import editCart from './editCart';
import { useRef } from 'react';
import { Character } from 'src/types/character';

const useEditCartMutation = (
  apiUrl: string,
  characterId: number,
  cartId: number,
) => {
  const queryClient = useQueryClient();
  const updateBuffer = useRef(0);
  const timeoutRef = useRef(0);

  return useMutation({
    mutationFn: (formData: { itemId: number; value: number }) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      updateBuffer.current += formData.value;

      return new Promise((resolve) => {
        timeoutRef.current = setTimeout(async () => {
          const finalValue = updateBuffer.current;

          updateBuffer.current = 0;

          await editCart(apiUrl, characterId, cartId, {
            itemId: formData.itemId,
            value: finalValue,
          });
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
        (prev: Character) => {
          const targetItem = prev.characterCart.items.find(
            (item) =>
              Object.values(item).find((value) => typeof value === 'object')
                .id === value.itemId,
          );

          if (targetItem && targetItem.quantity + value.value <= 0) {
            return {
              ...prev,
              characterCart: {
                ...prev.characterCart,
                items: prev.characterCart.items.filter(
                  (item) => item.id !== targetItem.id,
                ),
              },
            };
          }

          return !targetItem
            ? {
                ...prev,
                characterCart: {
                  ...prev.characterCart,
                  items: [
                    ...prev.characterCart.items,
                    {
                      quantity: value.value,
                      item: { id: value.itemId },
                    },
                  ],
                },
              }
            : {
                ...prev,
                characterCart: {
                  ...prev.characterCart,
                  items: prev.characterCart.items.map((item) =>
                    item.id === targetItem.id
                      ? {
                          ...item,
                          quantity: item.quantity + value.value,
                        }
                      : item,
                  ),
                },
              };
        },
      );

      return { prevCharacterData };
    },

    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['character', characterId],
      });
    },
    throwOnError: false,
  });
};

export default useEditCartMutation;
