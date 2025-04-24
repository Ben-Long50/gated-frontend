import { useQuery } from '@tanstack/react-query';
import getUsers from './getUsers';
import { User } from 'src/types/user';

const useUsersQuery = (apiUrl: string, nameQuery: string) => {
  return useQuery<User[]>({
    queryKey: ['users', nameQuery],
    queryFn: async () => await getUsers(apiUrl, nameQuery),
  });
};

export default useUsersQuery;
