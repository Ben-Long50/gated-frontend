import { useMutation, useQueryClient } from '@tanstack/react-query';
import refreshArmorPower from './refreshArmorPower';

const useRefreshArmorPowerMutation = (apiUrl: string, armorId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => {
      return refreshArmorPower(apiUrl, armorId);
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

export default useRefreshArmorPowerMutation;
