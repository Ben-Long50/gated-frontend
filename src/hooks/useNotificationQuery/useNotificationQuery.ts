import { useQuery } from '@tanstack/react-query';
import getNotifications from './getNotifications';

const useNotificationQuery = (apiUrl: string) => {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: async () => await getNotifications(apiUrl),
    throwOnError: false,
  });
};

export default useNotificationQuery;
