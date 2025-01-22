import { useQuery } from '@tanstack/react-query';
import getConditions from './getActions';

const useConditionsQuery = (apiUrl: string) => {
  return useQuery({
    queryKey: ['conditions'],
    queryFn: async () => await getConditions(apiUrl),
  });
};

export default useConditionsQuery;
