import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import useActionsQuery from './useActionsQuery/useActionsQuery';
import { Action } from '../types/action';

const useActions = () => {
  const { apiUrl } = useContext(AuthContext);

  const { data: actions, isLoading, isPending } = useActionsQuery(apiUrl);

  const [query, setQuery] = useState('');

  const filteredActions: {
    action: { title: string; list: Action[] };
    extendedAction: { title: string; list: Action[] };
    reaction: { title: string; list: Action[] };
  } = {
    action: {
      title: 'Action',
      list:
        actions?.filter(
          (action: Action) =>
            action.actionType === 'action' &&
            action.name.toLowerCase().includes(query.toLowerCase()),
        ) ?? [],
    },
    extendedAction: {
      title: 'Extended Action',
      list:
        actions?.filter(
          (action: Action) =>
            action.actionType === 'extendedAction' &&
            action.name.toLowerCase().includes(query.toLowerCase()),
        ) ?? [],
    },
    reaction: {
      title: 'Reaction',
      list:
        actions?.filter(
          (action: Action) =>
            action.actionType === 'reaction' &&
            action.name.toLowerCase().includes(query.toLowerCase()),
        ) ?? [],
    },
  };

  const filterByQuery = (query: string) => {
    setQuery(query);
  };

  const resetList = () => {
    setQuery('');
  };

  return {
    filteredActions,
    filterByQuery,
    resetList,
    isLoading,
    isPending,
  };
};

export default useActions;
