import { useMutation, useQueryClient } from '@tanstack/react-query';
import updateCharacter from './setActiveCharacter';
import { socket } from 'src/socket';

const useSetActiveCharacterMutation = (
  apiUrl: string,
  activeCharacterId: number,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (characterId: number) => {
      return updateCharacter(apiUrl, characterId);
    },
    onSuccess: (_, characterId) => {
      socket.emit('character', characterId);
      socket.emit('character', activeCharacterId);
      queryClient.invalidateQueries({
        queryKey: ['character', activeCharacterId],
      });
      return queryClient.invalidateQueries({
        queryKey: ['character', characterId],
      });
    },
    throwOnError: false,
  });
};

export default useSetActiveCharacterMutation;
