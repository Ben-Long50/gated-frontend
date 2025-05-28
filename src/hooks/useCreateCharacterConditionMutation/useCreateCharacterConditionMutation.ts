import { useMutation, useQueryClient } from '@tanstack/react-query';
import createCharacterCondition from './createCharacterCondition';

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
      toggleConditionModal();
      queryClient.invalidateQueries({
        queryKey: ['character', characterId],
      });
      return queryClient.invalidateQueries({
        queryKey: ['characters'],
        exact: false,
      });
    },
    throwOnError: false,
  });
};

export default useCreateCharacterConditionMutation;
