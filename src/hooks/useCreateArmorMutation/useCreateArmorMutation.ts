import { useMutation, useQueryClient } from '@tanstack/react-query';
import createArmor from './createArmor';

const useCreateArmorMutation = (
  apiUrl: string,
  setFormMessage: (message: string) => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => {
      return createArmor(formData, apiUrl);
    },
    onSuccess: () => {
      setFormMessage('Armor successfully created');
      queryClient.invalidateQueries({
        queryKey: ['activeCharacter'],
        exact: false,
      });
      return queryClient.invalidateQueries({
        queryKey: ['armor'],
        exact: false,
      });
    },
    onError: (error) => {
      setFormMessage(error.message);
    },
    throwOnError: false,
  });
};

export default useCreateArmorMutation;
