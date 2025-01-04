import { useQuery } from '@tanstack/react-query';
import getKeywordById from './getKeywordById';

const useKeywordQuery = (apiUrl, authToken, keywordId) => {
  return useQuery({
    queryKey: ['keyword', keywordId],
    queryFn: async () => await getKeywordById(apiUrl, authToken, keywordId),
  });
};

export default useKeywordQuery;
