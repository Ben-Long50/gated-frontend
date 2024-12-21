import { useQuery } from '@tanstack/react-query';
import getCharacters from './getCharacters';

const useCharactersQuery = (apiUrl, authToken) => {
  return useQuery({
    queryKey: ['characters', authToken],
    queryFn: async () => await getCharacters(apiUrl, authToken),
  });
};

export default useCharactersQuery;
