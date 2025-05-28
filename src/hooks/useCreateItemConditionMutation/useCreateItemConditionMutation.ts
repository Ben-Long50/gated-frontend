import { useMutation, useQueryClient } from '@tanstack/react-query';
import createItemCondition from './createItemCondition';

const useCreateItemConditionMutation = (
  apiUrl: string,
  itemId: number,
  toggleConditionModal: () => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: object) => {
      return createItemCondition(apiUrl, itemId, formData);
    },
    onSuccess: () => {
      toggleConditionModal();
      queryClient.invalidateQueries({
        queryKey: ['item', itemId],
      });
      return queryClient.invalidateQueries({
        queryKey: ['activeCharacter'],
        exact: false,
      });
    },
    throwOnError: false,
  });
};

export default useCreateItemConditionMutation;
