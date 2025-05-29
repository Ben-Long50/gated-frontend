import { useMutation, useQueryClient } from '@tanstack/react-query';
import deleteItemCondition from './deleteCharacterCondition';
import { Item } from 'src/types/item';

const useDeleteCharacterConditionMutation = (
  apiUrl: string,
  conditionId: number,
  characterId: number,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => {
      return deleteItemCondition(apiUrl, conditionId, characterId);
    },

    onMutate: () => {
      queryClient.cancelQueries({ queryKey: ['character', characterId] });

      const prevCharacterData: Item | undefined = queryClient.getQueryData([
        'character',
        characterId,
      ]);

      queryClient.setQueryData(['character', characterId], (prev: Item) => ({
        ...prev,
        conditions: prevCharacterData?.conditions.filter(
          (condition) => condition.id !== conditionId,
        ),
      }));

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

export default useDeleteCharacterConditionMutation;
