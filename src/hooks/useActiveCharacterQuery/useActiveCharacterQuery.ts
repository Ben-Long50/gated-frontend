import { useQuery } from '@tanstack/react-query';
import getActiveCharacter from './getActiveCharacter';
import { Character } from 'src/types/character';

const useActiveCharacterQuery = (apiUrl: string) => {
  return useQuery<Character>({
    queryKey: ['activeCharacter'],
    queryFn: async () => await getActiveCharacter(apiUrl),
  });
};

export default useActiveCharacterQuery;
