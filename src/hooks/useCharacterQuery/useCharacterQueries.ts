import { useQueries } from '@tanstack/react-query';
import getCharacter from './getCharacter';

const useCharacterQueries = (characterIds: number[]) => {
  return useQueries({
    queries: characterIds?.map((characterId) => ({
      queryKey: ['character', characterId],
      queryFn: () => getCharacter.fetch(characterId),
      enabled: !!characterId,
    })),
  });
};

export default useCharacterQueries;
