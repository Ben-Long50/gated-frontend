import { useMutation, useQueryClient } from '@tanstack/react-query';
import updateCharacter from './setActiveCharacter';

const useSetActiveCharacterMutation = (apiUrl: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (characterId: number) => {
      return updateCharacter(apiUrl, characterId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['activeCharacter'],
        exact: false,
      });
      return queryClient.invalidateQueries({
        queryKey: ['characters'],
        exact: false,
      });
    },
    throwOnError: false,
  });
};

export default useSetActiveCharacterMutation;
