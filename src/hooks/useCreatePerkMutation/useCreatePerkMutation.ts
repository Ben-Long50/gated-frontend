import { useMutation, useQueryClient } from '@tanstack/react-query';
import createPerk from './createPerk';

const useCreatePerkMutation = (
  apiUrl: string,
  perkId: string,
  setFormMessage: (message: string) => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: object) => {
      return createPerk(formData, perkId, apiUrl);
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
    onError: (error) => {
      setFormMessage(error.message);
    },
    throwOnError: false,
  });
};

export default useCreatePerkMutation;
