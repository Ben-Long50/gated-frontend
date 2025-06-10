import { useQueries } from '@tanstack/react-query';
import getCharacter from '../useCharacterQuery/getCharacter';

const useCampaignCharactersQuery = (characterIds: number[]) => {
  return useQueries({
    queries: characterIds.map((characterId) => ({
      queryKey: ['character', characterId],
      queryFn: () => getCharacter.fetch(characterId),
      enabled: !!characterId,
    })),
    combine: (results) => {
      return {
        playerCharacters:
          results
            .map((result) => result.data)
            .filter((character) => character?.playerCharacter) || [],
        nonPlayerCharacters:
          results
            .map((result) => result.data)
            .filter((character) => !character?.playerCharacter) || [],
        isLoading: results.some((result) => result.isLoading),
        isPending: results.some((result) => result.isPending),
      };
    },
  });
};

export default useCampaignCharactersQuery;
