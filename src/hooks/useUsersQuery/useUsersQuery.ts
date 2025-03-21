import { useQuery } from '@tanstack/react-query';
import getUsers from './getUsers';

const useUsersQuery = (apiUrl: string, nameQuery: string) => {
  return useQuery({
    queryKey: ['users', nameQuery],
    queryFn: async () => await getUsers(apiUrl, nameQuery),
  });
};

export default useUsersQuery;
