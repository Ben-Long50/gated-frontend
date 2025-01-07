import { useMutation, useQueryClient } from '@tanstack/react-query';
import createCharacter from './createCharacter';
import { useNavigate } from 'react-router-dom';

const useCreateCharacterMutation = (apiUrl: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (formData: FormData) => {
      return createCharacter(formData, apiUrl);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['characters'],
        exact: false,
      });
      navigate('/glam/characters');
    },
    throwOnError: false,
  });
};

export default useCreateCharacterMutation;
