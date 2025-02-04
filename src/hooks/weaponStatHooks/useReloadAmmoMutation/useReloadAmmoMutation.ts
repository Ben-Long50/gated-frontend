import { useMutation, useQueryClient } from '@tanstack/react-query';
import reloadAmmo from './reloadAmmo';

const useReloadAmmoMutation = (apiUrl: string, weaponId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => {
      return reloadAmmo(apiUrl, weaponId);
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['equipment'],
        exact: false,
      });
    },
    throwOnError: false,
  });
};

export default useReloadAmmoMutation;
