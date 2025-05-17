import { useQuery } from '@tanstack/react-query';
import getCybernetics from './getCybernetics';
import { Item } from 'src/types/item';

const useCyberneticsQuery = (apiUrl: string) => {
  return useQuery<Item[]>({
    queryKey: ['cybernetics'],
    queryFn: async () => await getCybernetics(apiUrl),
    throwOnError: false,
  });
};

export default useCyberneticsQuery;
