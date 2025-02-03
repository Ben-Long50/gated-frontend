import { useMutation, useQueryClient } from '@tanstack/react-query';
import editCurrentSanity from './editCurrentSanity';

const useCurrentSanityMutation = (apiUrl: string, characterId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (value: number) => {
      return editCurrentSanity(apiUrl, characterId, value);
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

export default useCurrentSanityMutation;
