import { useQuery } from '@tanstack/react-query';
import getBookSections from './getBookSections';

const useBookSectionsQuery = (apiUrl: string) => {
  return useQuery({
    queryKey: ['book'],
    queryFn: async () => await getBookSections(apiUrl),
  });
};

export default useBookSectionsQuery;
