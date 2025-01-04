import { useQuery } from '@tanstack/react-query';
import getCyberneticById from './getCyberneticById';

const useCyberneticQuery = (apiUrl, authToken, cyberneticId) => {
  return useQuery({
    queryKey: ['cybernetic', cyberneticId],
    queryFn: async () =>
      await getCyberneticById(apiUrl, authToken, cyberneticId),
    throwOnError: false,
  });
};

export default useCyberneticQuery;
