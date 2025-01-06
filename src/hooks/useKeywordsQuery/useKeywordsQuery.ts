import { useQuery } from '@tanstack/react-query';
import getKeywords from './getKeywords';

const useKeywordsQuery = (apiUrl: string) => {
  return useQuery({
    queryKey: ['keywords'],
    queryFn: async () => await getKeywords(apiUrl),
  });
};

export default useKeywordsQuery;
