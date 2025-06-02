import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import { Item } from 'src/types/item';
import editCharacterConditionStacks from './editCharacterConditionStacks';
import { socket } from 'src/socket';
import { Character } from 'src/types/character';

const useCharacterConditionStacksMutation = (
  apiUrl: string,
  conditionId: number,
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
          await editCharacterConditionStacks(
            apiUrl,
            conditionId,
            characterId,
            finalValue,
          );
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
          conditions: prevCharacterData?.conditions.map((condition) =>
            condition.id === conditionId
              ? {
                  ...condition,
                  stacks: condition?.stacks ? condition.stacks + value : value,
                }
              : condition,
          ),
        }),
      );

      return { prevCharacterData };
    },

    onSuccess: () => {
      socket.emit('character', characterId);
      return queryClient.invalidateQueries({
        queryKey: ['character', characterId],
      });
    },
    throwOnError: false,
  });
};

export default useCharacterConditionStacksMutation;
