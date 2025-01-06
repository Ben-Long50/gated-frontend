import { useQuery } from '@tanstack/react-query';
import getKeywordById from './getKeywordById';

const useKeywordQuery = (apiUrl: string, keywordId: string) => {
  return useQuery({
    queryKey: ['keyword', keywordId],
    queryFn: async () => await getKeywordById(apiUrl, keywordId),
  });
};

export default useKeywordQuery;
