import { useMutation, useQueryClient } from '@tanstack/react-query';
import refreshCyberneticPower from './refreshCyberneticPower';

const useRefreshCyberneticPowerMutation = (
  apiUrl: string,
  cyberneticId: number,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => {
      return refreshCyberneticPower(apiUrl, cyberneticId);
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

export default useRefreshCyberneticPowerMutation;
