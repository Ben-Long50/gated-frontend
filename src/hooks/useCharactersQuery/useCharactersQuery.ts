import { useQuery } from '@tanstack/react-query';
import getCharacters from './getCharacters';
import { Character } from 'src/types/character';

const useCharactersQuery = (apiUrl: string) => {
  return useQuery<Character[]>({
    queryKey: ['characters'],
    queryFn: () => getCharacters(apiUrl),
  });
};

export default useCharactersQuery;
