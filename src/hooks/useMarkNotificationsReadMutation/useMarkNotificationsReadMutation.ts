import { useMutation, useQueryClient } from '@tanstack/react-query';
import updateFaction from './markNotificationsRead';

const useMarkNotificationsReadMutation = (apiUrl: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => {
      return updateFaction(apiUrl);
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['account'],
      });
    },
    throwOnError: false,
  });
};

export default useMarkNotificationsReadMutation;
