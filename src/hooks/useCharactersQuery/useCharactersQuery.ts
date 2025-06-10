import { useQuery } from '@tanstack/react-query';
import getCharacters from './getCharacters';
import { Character } from 'src/types/character';

const useCharactersQuery = () => {
  return useQuery<Character[]>({
    queryKey: ['characters'],
    queryFn: () => getCharacters(),
  });
};

export default useCharactersQuery;
