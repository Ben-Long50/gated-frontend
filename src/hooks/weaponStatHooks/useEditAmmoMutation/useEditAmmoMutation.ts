import { useMutation, useQueryClient } from '@tanstack/react-query';
import editAmmo from './editAmmo';

const useEditAmmoMutation = (apiUrl: string, weaponId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (value: number) => {
      return editAmmo(apiUrl, weaponId, value);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['equipment'],
        exact: false,
      });
      console.log('success');
      return queryClient.invalidateQueries({
        queryKey: ['activeCharacter'],
        exact: false,
      });
    },
    throwOnError: false,
  });
};

export default useEditAmmoMutation;
