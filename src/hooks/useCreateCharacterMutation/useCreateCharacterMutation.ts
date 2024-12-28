import { useMutation, useQueryClient } from '@tanstack/react-query';
import createCharacter from './createCharacter';
import { useNavigate } from 'react-router-dom';

const useCreateCharacterMutation = (apiUrl, authToken) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (formData) => {
      return createCharacter(formData, apiUrl, authToken);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['characters'],
        exact: false,
      });
      navigate('/characters');
    },
    throwOnError: false,
  });
};

export default useCreateCharacterMutation;
