import { useMutation, useQueryClient } from '@tanstack/react-query';
import createItemCondition from './createItemCondition';

const useCreateItemConditionMutation = (
  apiUrl: string,
  itemId: number,
  category: string,
  characterId: number,
  toggleConditionModal: () => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: object) => {
      return createItemCondition(apiUrl, itemId, category, formData);
    },
    onSuccess: () => {
      toggleConditionModal();
      queryClient.invalidateQueries({
        queryKey: ['item', itemId],
      });
      queryClient.invalidateQueries({
        queryKey: ['character', characterId],
      });
      return queryClient.invalidateQueries({
        queryKey: ['activeCharacter'],
      });
    },
    throwOnError: false,
  });
};

export default useCreateItemConditionMutation;
