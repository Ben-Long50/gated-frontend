import { useQuery } from '@tanstack/react-query';
import getCharacter from './getCharacter';

const useCharacterQuery = (apiUrl, authToken, characterId) => {
  return useQuery({
    queryKey: ['character', characterId],
    queryFn: async () => await getCharacter(apiUrl, authToken, characterId),
  });
};

export default useCharacterQuery;
