import { useMutation, useQueryClient } from '@tanstack/react-query';
import createArmor from './createArmor';

const useCreateArmorMutation = (
  apiUrl: string,
  setFormMessage: (message: string) => void,
  armorId?: number,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => {
      return createArmor(formData, apiUrl);
    },
    onSuccess: (data) => {
      setFormMessage(data.message);
      queryClient.invalidateQueries({ queryKey: ['armorPiece', armorId] });
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
