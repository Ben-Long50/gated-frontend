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

export default useRefreshCyberneticPowerMutation;
