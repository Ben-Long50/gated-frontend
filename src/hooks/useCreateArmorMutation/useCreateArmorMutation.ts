import { useMutation, useQueryClient } from '@tanstack/react-query';
import createArmor from './createArmor';

const useCreateArmorMutation = (apiUrl, authToken) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData) => {
      return createArmor(formData, apiUrl, authToken);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['armorPiece'],
        exact: false,
      });
      return queryClient.invalidateQueries({
        queryKey: ['armor'],
        exact: false,
      });
    },
    throwOnError: false,
  });
};

export default useCreateArmorMutation;
