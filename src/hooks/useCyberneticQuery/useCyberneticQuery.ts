import { useQuery } from '@tanstack/react-query';
import getCyberneticById from './getCyberneticById';

const useCyberneticQuery = (
  apiUrl: string,
  cyberneticId: number,
  options: object,
) => {
  return useQuery({
    queryKey: ['cybernetic', cyberneticId],
    queryFn: async () => await getCyberneticById(apiUrl, cyberneticId),
    ...options,
  });
};

export default useCyberneticQuery;
