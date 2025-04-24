import { useMutation, useQueryClient } from '@tanstack/react-query';
import deleteNotification from './deleteNotification';

const useDeleteNotificationMutation = (apiUrl: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (notificationId: number) => {
      return deleteNotification(apiUrl, notificationId);
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['notifications'],
        exact: false,
      });
    },
    throwOnError: false,
  });
};

export default useDeleteNotificationMutation;
