import { useMutation, useQueryClient } from '@tanstack/react-query';
import createWeapon from './createWeapon';

const useCreateWeaponMutation = (
  apiUrl: string,
  setFormMessage: (message: string) => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => {
      return createWeapon(formData, apiUrl);
    },
    onSuccess: () => {
      setFormMessage('Weapon successfully created');
      queryClient.invalidateQueries({
        queryKey: ['weapon'],
        exact: false,
      });
      return queryClient.invalidateQueries({
        queryKey: ['weapons'],
        exact: false,
      });
    },
    onError: (error) => {
      setFormMessage(error.message);
    },
    throwOnError: false,
  });
};

export default useCreateWeaponMutation;
