import { useMutation, useQueryClient } from '@tanstack/react-query';
import refreshDronePower from './refreshDronePower';

const useRefreshDronePowerMutation = (
  apiUrl: string,
  droneId: number,
  characterId: number,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => {
      return refreshDronePower(apiUrl, droneId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['equipment'],
        exact: false,
      });
      return queryClient.invalidateQueries({
        queryKey: ['character', characterId],
      });
    },
    throwOnError: false,
  });
};

export default useRefreshDronePowerMutation;
