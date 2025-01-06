import { useQuery } from '@tanstack/react-query';
import getCharacters from './getCharacters';

const useCharactersQuery = (apiUrl: string) => {
  return useQuery({
    queryKey: ['characters'],
    queryFn: async () => await getCharacters(apiUrl),
  });
};

export default useCharactersQuery;
