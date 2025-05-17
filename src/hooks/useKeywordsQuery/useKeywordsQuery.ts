import { useQuery } from '@tanstack/react-query';
import getKeywords from './getKeywords';
import { Keyword } from 'src/types/keyword';

const useKeywordsQuery = (apiUrl: string) => {
  return useQuery<Keyword[]>({
    queryKey: ['keywords'],
    queryFn: async () => await getKeywords(apiUrl),
  });
};

export default useKeywordsQuery;
