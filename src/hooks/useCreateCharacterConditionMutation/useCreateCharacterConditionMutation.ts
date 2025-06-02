import { useMutation, useQueryClient } from '@tanstack/react-query';
import createCharacterCondition from './createCharacterCondition';
import { socket } from 'src/socket';
import { Character } from 'src/types/character';

const useCreateCharacterConditionMutation = (
  apiUrl: string,
  characterId: number,
  toggleConditionModal: () => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: { conditionId: number; stacks?: number }[]) => {
      return createCharacterCondition(apiUrl, characterId, formData);
    },

    onMutate: (formData) => {
      queryClient.cancelQueries({ queryKey: ['character', characterId] });

      const prevCharacterData: Character | undefined = queryClient.getQueryData(
        ['character', characterId],
      );

      const conditionData = formData
        .map((condition) => ({
          condition: queryClient.getQueryData([
            'condition',
            condition.conditionId,
          ]),
          stacks: condition.stacks,
          characterId,
        }))
        .sort((a, b) => a.condition.name.localeCompare(b.condition.name));

      queryClient.setQueryData(
        ['character', characterId],
        (prev: Character) => ({
          ...prev,
          conditions: conditionData,
        }),
      );

      toggleConditionModal();

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

export default useCreateCharacterConditionMutation;
