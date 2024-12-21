import { useQuery } from '@tanstack/react-query';
import getAccount from './getAccount';

const useAccountQuery = (apiUrl, token) => {
  return useQuery({
    queryKey: ['account', token],
    queryFn: async () => await getAccount(apiUrl, token),
    enabled: !!token,
    throwOnError: false,
  });
};

export default useAccountQuery;
