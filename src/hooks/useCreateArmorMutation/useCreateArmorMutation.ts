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
        queryKey: ['armorPiece'],
        exact: false,
      });
      return queryClient.invalidateQueries({
        queryKey: ['armor'],
        exact: false,
      });
    },
    onError: () => {
      setFormMessage('Error creating armor');
    },
    throwOnError: false,
  });
};

export default useCreateArmorMutation;
