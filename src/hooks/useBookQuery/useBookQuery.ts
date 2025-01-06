import { useQuery } from '@tanstack/react-query';
import getBook from './getBook';

const useBookQuery = (apiUrl, authToken) => {
  return useQuery({
    queryKey: ['book'],
    queryFn: async () => await getBook(apiUrl, authToken),
  });
};

export default useBookQuery;
