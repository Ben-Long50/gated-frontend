import { useQuery, useQueryClient } from '@tanstack/react-query';
import getConditions from './getActions';
import { Condition } from 'src/types/condition';
import { useEffect } from 'react';

const useConditionsQuery = (apiUrl: string) => {
  const queryClient = useQueryClient();

  const conditions = useQuery<Condition[]>({
    queryKey: ['conditions'],
    queryFn: async () => await getConditions(apiUrl),
  });

  useEffect(() => {
    if (conditions.data) {
      conditions.data.map((condition) =>
        queryClient.setQueryData(['condition', condition.id], condition),
      );
    }
  }, [conditions, queryClient]);

  return conditions;
};

export default useConditionsQuery;
