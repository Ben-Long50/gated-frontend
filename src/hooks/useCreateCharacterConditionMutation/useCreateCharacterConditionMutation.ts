import { useMutation, useQueryClient } from '@tanstack/react-query';
import createCharacterCondition from './createCharacterCondition';
import { socket } from 'src/socket';

const useCreateCharacterConditionMutation = (
  apiUrl: string,
  characterId: number,
  toggleConditionModal: () => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: object) => {
      return createCharacterCondition(apiUrl, characterId, formData);
    },
    onSuccess: () => {
      socket.emit('character', characterId);
      toggleConditionModal();
      return queryClient.invalidateQueries({
        queryKey: ['character', characterId],
      });
    },
    throwOnError: false,
  });
};

export default useCreateCharacterConditionMutation;
