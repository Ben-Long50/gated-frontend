import { useMutation, useQueryClient } from '@tanstack/react-query';
import editCurrentHealth from './editCurrentHealth';

const useCurrentHealthMutation = (apiUrl: string, characterId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (value: number) => {
      return editCurrentHealth(apiUrl, characterId, value);
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

export default useCurrentHealthMutation;
