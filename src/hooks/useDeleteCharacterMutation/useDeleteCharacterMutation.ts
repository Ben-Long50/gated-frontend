import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import deleteCharacter from './deleteCharacter';

const useDeleteCharacterMutation = (apiUrl: string, characterId?: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => {
      return deleteCharacter(apiUrl, characterId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['characters'],
        exact: false,
      });
      navigate('/glam/characters');
      console.log('Character successfully deleted');
    },
    onError: () => {
      console.error('Error creating character');
    },
    throwOnError: false,
  });
};

export default useDeleteCharacterMutation;
