import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import updateCharacter from './updateCharacter';

const useUpdateCharacterMutation = (
  apiUrl: string,
  characterId: string,
  setFormMessage: (message: string) => void,
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (formData: FormData) => {
      return updateCharacter(formData, apiUrl, characterId);
    },
    onSuccess: () => {
      navigate(`/glam/characters`);
      queryClient.invalidateQueries({
        queryKey: ['activeCharacter'],
        exact: false,
      });
      return queryClient.invalidateQueries({
        queryKey: ['characters'],
        exact: false,
      });
    },
    onError: (error) => {
      setFormMessage(error.message);
    },
    throwOnError: false,
  });
};

export default useUpdateCharacterMutation;
