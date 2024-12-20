import { useMutation, useQueryClient } from '@tanstack/react-query';
import createPerk from './createPerk';

const useCreatePerkMutation = (apiUrl, authToken) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData) => {
      return createPerk(formData, apiUrl, authToken);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['perks'],
        exact: false,
      });
      console.log('Perk successfully created');
    },
    onError: () => {
      console.error('Error creating perk');
    },
  });
};

export default useCreatePerkMutation;
