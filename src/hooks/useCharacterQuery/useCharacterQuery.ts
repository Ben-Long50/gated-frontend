import { useQuery } from '@tanstack/react-query';
import getCharacter from './getCharacter';

const useCharacterQuery = (apiUrl: string, characterId?: string) => {
  return useQuery({
    queryKey: ['character', characterId],
    queryFn: async () => await getCharacter(apiUrl, characterId),
  });
};

export default useCharacterQuery;
