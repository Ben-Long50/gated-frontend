import { useQuery } from '@tanstack/react-query';
import getKeywordById from './getActionById';

const useActionQuery = (apiUrl: string, actionId: string) => {
  return useQuery({
    queryKey: ['action', actionId],
    queryFn: async () => await getKeywordById(apiUrl, actionId),
  });
};

export default useActionQuery;
