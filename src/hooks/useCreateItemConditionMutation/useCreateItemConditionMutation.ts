import { useMutation, useQueryClient } from '@tanstack/react-query';
import createItemCondition from './createItemCondition';
import { socket } from 'src/socket';

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
      socket.emit('item', itemId);
      toggleConditionModal();
      return queryClient.invalidateQueries({
        queryKey: ['item', itemId],
      });
    },
    throwOnError: false,
  });
};

export default useCreateItemConditionMutation;
