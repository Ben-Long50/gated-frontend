import { useQuery } from '@tanstack/react-query';
import getKeywordById from './getConditionById';

const useConditionQuery = (apiUrl: string, conditonId?: string) => {
  return useQuery({
    queryKey: ['condition', conditonId],
    queryFn: async () => await getKeywordById(apiUrl, conditonId),
    throwOnError: false,
  });
};

export default useConditionQuery;
