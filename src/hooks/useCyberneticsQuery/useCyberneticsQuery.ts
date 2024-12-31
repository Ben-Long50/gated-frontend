import { useQuery } from '@tanstack/react-query';
import getCybernetics from './getCybernetics';

const useCyberneticsQuery = (apiUrl, authToken) => {
  return useQuery({
    queryKey: ['cybernetics'],
    queryFn: async () => await getCybernetics(apiUrl, authToken),
    throwOnError: false,
  });
};

export default useCyberneticsQuery;
