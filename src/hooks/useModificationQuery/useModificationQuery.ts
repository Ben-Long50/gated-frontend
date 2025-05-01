import { useQuery } from '@tanstack/react-query';
import getModificationById from './getModificationById';

const useModificationQuery = (apiUrl: string, modificationId: number) => {
  return useQuery({
    queryKey: ['vehicleMod', modificationId],
    queryFn: async () => await getModificationById(apiUrl, modificationId),
    throwOnError: false,
    enabled: !!modificationId,
  });
};

export default useModificationQuery;
