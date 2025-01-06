import { useQuery } from '@tanstack/react-query';
import getActions from './getActions';

const useActionsQuery = (apiUrl, authToken) => {
  return useQuery({
    queryKey: ['actions'],
    queryFn: async () => await getActions(apiUrl, authToken),
  });
};

export default useActionsQuery;
