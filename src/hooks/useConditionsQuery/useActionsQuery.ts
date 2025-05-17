import { useQuery } from '@tanstack/react-query';
import getConditions from './getActions';
import { Condition } from 'src/types/condition';

const useConditionsQuery = (apiUrl: string) => {
  return useQuery<Condition[]>({
    queryKey: ['conditions'],
    queryFn: async () => await getConditions(apiUrl),
  });
};

export default useConditionsQuery;
