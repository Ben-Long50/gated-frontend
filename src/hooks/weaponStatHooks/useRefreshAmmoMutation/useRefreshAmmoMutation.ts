import { useMutation, useQueryClient } from '@tanstack/react-query';
import refreshAmmo from './refreshAmmo';

const useRefreshAmmoMutation = (apiUrl: string, weaponId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => {
      return refreshAmmo(apiUrl, weaponId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['equipment'],
        exact: false,
      });
      return queryClient.invalidateQueries({
        queryKey: ['activeCharacter'],
        exact: false,
      });
    },
    throwOnError: false,
  });
};

export default useRefreshAmmoMutation;
