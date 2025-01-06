import { useQuery } from '@tanstack/react-query';
import getBookEntry from './getBookEntry';

const useBookEntryQuery = (apiUrl, authToken, bookEntryTitle) => {
  return useQuery({
    queryKey: ['bookEntry', bookEntryTitle],
    queryFn: async () => await getBookEntry(apiUrl, authToken, bookEntryTitle),
  });
};

export default useBookEntryQuery;
