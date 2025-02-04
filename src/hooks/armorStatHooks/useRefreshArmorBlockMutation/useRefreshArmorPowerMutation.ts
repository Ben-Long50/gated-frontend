import { useMutation, useQueryClient } from '@tanstack/react-query';
import refreshArmorPower from './refreshArmorPower';

const useRefreshArmorPowerMutation = (apiUrl: string, armorId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => {
      return refreshArmorPower(apiUrl, armorId);
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

export default useRefreshArmorPowerMutation;
