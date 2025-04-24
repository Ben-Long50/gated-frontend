import { useMutation, useQueryClient } from '@tanstack/react-query';
import createCharacter from './createCharacter';
import { useNavigate } from 'react-router-dom';

const useCreateCharacterMutation = (
  apiUrl: string,
  setFormMessage: (message: string) => void,
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (formData: FormData) => {
      return createCharacter(formData, apiUrl);
    },
    onSuccess: () => {
      setFormMessage('Successfully created character');
      return queryClient.invalidateQueries({
        queryKey: ['characters'],
        exact: false,
      });
      // navigate('/glam/characters');
    },
    onError: (error) => {
      setFormMessage(error.message);
    },
    throwOnError: false,
  });
};

export default useCreateCharacterMutation;
