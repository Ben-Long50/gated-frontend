import { useMutation, useQueryClient } from '@tanstack/react-query';
import createWeapon from './createWeapon';

const useCreateWeaponMutation = (apiUrl, authToken) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData) => {
      return createWeapon(formData, apiUrl, authToken);
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
