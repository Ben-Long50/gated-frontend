import { useQuery } from '@tanstack/react-query';
import getCharacter from './getCharacter';
import { Character } from 'src/types/character';

const useCharacterQuery = (apiUrl: string, characterId?: string) => {
  return useQuery<Character>({
    queryKey: ['character', Number(characterId)],
    queryFn: async () => await getCharacter(apiUrl, characterId),
  });
};

export default useCharacterQuery;
