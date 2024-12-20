import { useMutation, useQueryClient } from '@tanstack/react-query';
import createCharacter from './createCharacter';

const useCreateCharacterMutation = (apiUrl, authToken) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData) => {
      return createCharacter(formData, apiUrl, authToken);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['characters'],
        exact: false,
      });
      console.log('Character successfully created');
    },
    onError: () => {
      console.error('Error creating character');
    },
  });
};

export default useCreateCharacterMutation;
