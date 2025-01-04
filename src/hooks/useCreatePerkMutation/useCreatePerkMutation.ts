import { useMutation, useQueryClient } from '@tanstack/react-query';
import createPerk from './createPerk';

const useCreatePerkMutation = (apiUrl, authToken, perkId, setFormMessage) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData) => {
      return createPerk(formData, apiUrl, authToken, perkId);
    },
    onSuccess: () => {
      setFormMessage('Perk successfully created');
      queryClient.invalidateQueries({
        queryKey: ['perk'],
        exact: false,
      });
      return queryClient.invalidateQueries({
        queryKey: ['perks'],
        exact: false,
      });
    },
    onError: () => {
      setFormMessage('Error creating perk');
    },
    throwOnError: false,
  });
};

export default useCreatePerkMutation;
