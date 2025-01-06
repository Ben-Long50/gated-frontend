import { useQuery } from '@tanstack/react-query';
import getActions from './getActions';

const useActionsQuery = (apiUrl: string) => {
  return useQuery({
    queryKey: ['actions'],
    queryFn: async () => await getActions(apiUrl),
  });
};

export default useActionsQuery;
