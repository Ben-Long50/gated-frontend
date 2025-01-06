import { useQuery } from '@tanstack/react-query';
import getAccount from './getAccount';

const useAccountQuery = (apiUrl: string) => {
  return useQuery({
    queryKey: ['account'],
    queryFn: async () => await getAccount(apiUrl),
    throwOnError: false,
  });
};

export default useAccountQuery;
