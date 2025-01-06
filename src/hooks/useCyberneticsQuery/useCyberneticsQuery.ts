import { useQuery } from '@tanstack/react-query';
import getCybernetics from './getCybernetics';

const useCyberneticsQuery = (apiUrl: string) => {
  return useQuery({
    queryKey: ['cybernetics'],
    queryFn: async () => await getCybernetics(apiUrl),
    throwOnError: false,
  });
};

export default useCyberneticsQuery;
