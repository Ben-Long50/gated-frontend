import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import deleteCharacter from './deleteCharacter';

const useDeleteCharacterMutation = (characterId, apiUrl, authToken) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => {
      return deleteCharacter(characterId, apiUrl, authToken);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['characters'],
        exact: false,
      });
      navigate('/characters');
      console.log('Character successfully deleted');
    },
    onError: () => {
      console.error('Error creating character');
    },
    throwOnError: false,
  });
};

export default useDeleteCharacterMutation;
