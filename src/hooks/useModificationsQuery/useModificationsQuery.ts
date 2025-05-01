import { useQuery } from '@tanstack/react-query';
import getModifications from './getModifications';

const useModificationsQuery = (apiUrl: string) => {
  return useQuery({
    queryKey: ['vehicleMods'],
    queryFn: async () => await getModifications(apiUrl),
  });
};

export default useModificationsQuery;
