import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import useConditionsQuery from './useConditionsQuery/useActionsQuery';
import { Condition } from 'src/types/condition';

const useConditions = (conditionList?: Condition[]) => {
  const { apiUrl } = useContext(AuthContext);

  const { data: conditions, isLoading, isPending } = useConditionsQuery(apiUrl);

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');

  const list = conditionList || conditions;

  const filteredConditions =
    category.length > 0
      ? list?.filter(
          (condition: Condition) =>
            condition.conditionType === category &&
            condition.name.toLowerCase().includes(query.toLowerCase()),
        )
      : (list?.filter((condition: Condition) =>
          condition.name.toLowerCase().includes(query.toLowerCase()),
        ) ?? []);

  const filterByQuery = (query: string) => {
    setQuery(query);
  };

  const filterByCategory = (query: string) => {
    setCategory(query);
  };

  const resetList = () => {
    setQuery('');
  };

  return {
    filteredConditions,
    filterByQuery,
    filterByCategory,
    resetList,
    isLoading,
    isPending,
  };
};

export default useConditions;
