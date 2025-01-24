import { useQuery } from '@tanstack/react-query';
import getActiveCharacter from './getActiveCharacter';

const useActiveCharacterQuery = (apiUrl: string) => {
  return useQuery({
    queryKey: ['activeCharacter'],
    queryFn: async () => await getActiveCharacter(apiUrl),
  });
};

export default useActiveCharacterQuery;
