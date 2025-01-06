import { useQuery } from '@tanstack/react-query';
import getKeywordById from './getActionById';

const useActionQuery = (apiUrl, authToken, actionId) => {
  return useQuery({
    queryKey: ['action', actionId],
    queryFn: async () => await getKeywordById(apiUrl, authToken, actionId),
  });
};

export default useActionQuery;
