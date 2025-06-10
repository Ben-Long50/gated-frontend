import { useQuery } from '@tanstack/react-query';
import getCharacter from './getCharacter';
import { Character } from 'src/types/character';

const useCharacterQuery = (characterId: number) => {
  return useQuery<Character>({
    queryKey: ['character', characterId],
    queryFn: () => getCharacter.fetch(characterId),
    throwOnError: false,
    enabled: !!characterId,
  });
};

export default useCharacterQuery;
