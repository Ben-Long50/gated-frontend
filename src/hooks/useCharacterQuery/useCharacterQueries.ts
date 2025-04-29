import { useQueries } from '@tanstack/react-query';
import getCharacter from './getCharacter';

const useCharacterQueries = (apiUrl: string, characterIds: number[]) => {
  return useQueries({
    queries: characterIds?.map((characterId) => ({
      queryKey: ['character', characterId],
      queryFn: () => getCharacter(apiUrl, characterId),
      enabled: !!characterId,
    })),
  });
};

export default useCharacterQueries;
