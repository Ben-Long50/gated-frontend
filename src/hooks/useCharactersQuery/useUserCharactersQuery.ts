import { useQueries } from '@tanstack/react-query';
import getCharacter from '../useCharacterQuery/getCharacter';

const useUserCharactersQuery = (apiUrl: string, characterIds: number[]) => {
  return useQueries({
    queries: characterIds.map((characterId) => ({
      queryKey: ['character', characterId],
      queryFn: () => getCharacter(apiUrl, characterId),
      enabled: !!characterId,
    })),
    combine: (results) => {
      return {
        characters: results.map((result) => result.data),
        isLoading: results.some((result) => result.isLoading),
        isPending: results.some((result) => result.isPending),
      };
    },
  });
};

export default useUserCharactersQuery;
