import { useQuery } from '@tanstack/react-query';
import getBookEntry from './getBookEntry';

const useBookEntryQuery = (apiUrl: string, bookEntryTitle: string) => {
  return useQuery({
    queryKey: ['bookEntry', bookEntryTitle],
    queryFn: async () => await getBookEntry(apiUrl, bookEntryTitle),
  });
};

export default useBookEntryQuery;
