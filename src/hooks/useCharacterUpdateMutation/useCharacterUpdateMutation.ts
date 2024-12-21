import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import updateCharacter from './updateCharacter';

const useUpdateCharacterMutation = (characterId, apiUrl, authToken) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (formData) => {
      return updateCharacter(formData, characterId, apiUrl, authToken);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['character'],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ['characters'],
        exact: false,
      });
      navigate(`/characters`);
      console.log('Character successfully created');
    },
    onError: () => {
      console.error('Error creating character');
    },
    throwOnError: false,
  });
};

export default useUpdateCharacterMutation;
