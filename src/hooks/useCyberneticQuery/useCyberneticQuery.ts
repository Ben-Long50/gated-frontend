import { useQuery } from '@tanstack/react-query';
import getCyberneticById from './getCyberneticById';

const useCyberneticQuery = (apiUrl: string, cyberneticId?: string) => {
  return useQuery({
    queryKey: ['cybernetic', cyberneticId],
    queryFn: async () => await getCyberneticById(apiUrl, cyberneticId),
    throwOnError: false,
  });
};

export default useCyberneticQuery;
