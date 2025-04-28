import { useQuery, useQueryClient } from '@tanstack/react-query';
import getCharacters from './getCharacters';
import { Character } from 'src/types/character';
import { useEffect } from 'react';

const useCharactersQuery = (apiUrl: string) => {
  const queryClient = useQueryClient();

  const characters = useQuery<Character[]>({
    queryKey: ['characters'],
    queryFn: async () => await getCharacters(apiUrl),
  });

  useEffect(() => {
    if (characters.data) {
      characters.data?.forEach((character) => {
        queryClient.setQueryData(['character', character.id], character);
      });
    }
  }, [characters.data, queryClient]);

  return characters;
};

export default useCharactersQuery;
