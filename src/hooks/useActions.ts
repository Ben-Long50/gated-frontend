import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import useActionsQuery from './useActionsQuery/useActionsQuery';
import { Action } from '../types/action';

const useActions = () => {
  const { apiUrl } = useContext(AuthContext);

  const { data: actions, isLoading, isPending } = useActionsQuery(apiUrl);

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');

  const filteredActions: Action[] =
    category.length > 0
      ? subCategory.length > 0
        ? actions?.filter(
            (action: Action) =>
              action.actionType === category &&
              action.actionSubtypes.includes(subCategory) &&
              action.name.toLowerCase().includes(query.toLowerCase()),
          )
        : actions?.filter(
            (action: Action) =>
              action.actionType === category &&
              action.name.toLowerCase().includes(query.toLowerCase()),
          )
      : subCategory.length > 0
        ? actions?.filter(
            (action: Action) =>
              action.actionSubtypes.includes(subCategory) &&
              action.name.toLowerCase().includes(query.toLowerCase()),
          )
        : (actions?.filter((action: Action) =>
            action.name.toLowerCase().includes(query.toLowerCase()),
          ) ?? []);

  const filterByQuery = (query: string) => {
    setQuery(query);
  };

  const filterByCategory = (category: string) => {
    setCategory(category);
  };

  const filterBySubCategory = (subCategory: string) => {
    setSubCategory(subCategory);
  };

  const resetList = () => {
    setQuery('');
  };

  return {
    filteredActions,
    filterByQuery,
    filterByCategory,
    filterBySubCategory,
    resetList,
    isLoading,
    isPending,
  };
};

export default useActions;
