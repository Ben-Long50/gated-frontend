import { useQuery } from '@tanstack/react-query';
import getKeywords from './getKeywords';

const useKeywordsQuery = (apiUrl, authToken) => {
  return useQuery({
    queryKey: ['keywords', authToken],
    queryFn: async () => await getKeywords(apiUrl, authToken),
  });
};

export default useKeywordsQuery;
