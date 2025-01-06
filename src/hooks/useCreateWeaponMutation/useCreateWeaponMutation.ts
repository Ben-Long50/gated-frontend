import { useMutation, useQueryClient } from '@tanstack/react-query';
import createWeapon from './createWeapon';

const useCreateWeaponMutation = (apiUrl: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => {
      return createWeapon(formData, apiUrl);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['weapon'],
        exact: false,
      });
      return queryClient.invalidateQueries({
        queryKey: ['weapons'],
        exact: false,
      });
    },
    throwOnError: false,
  });
};

export default useCreateWeaponMutation;
