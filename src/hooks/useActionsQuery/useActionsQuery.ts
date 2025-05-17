import { useQuery } from '@tanstack/react-query';
import getActions from './getActions';
import { Action } from 'src/types/action';

const useActionsQuery = (apiUrl: string) => {
  return useQuery<Action[]>({
    queryKey: ['actions'],
    queryFn: async () => await getActions(apiUrl),
  });
};

export default useActionsQuery;
