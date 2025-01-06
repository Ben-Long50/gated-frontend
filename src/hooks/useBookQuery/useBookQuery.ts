import { useQuery } from '@tanstack/react-query';
import getBook from './getBook';

const useBookQuery = (apiUrl: string) => {
  return useQuery({
    queryKey: ['book'],
    queryFn: async () => await getBook(apiUrl),
  });
};

export default useBookQuery;
