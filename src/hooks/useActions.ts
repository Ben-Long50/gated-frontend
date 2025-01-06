import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Cybernetic } from './useCybernetics';
import useActionsQuery from './useActionsQuery/useActionsQuery';

enum ActionType {
  action = 'action',
  extendedAction = 'extendedAction',
  reaction = 'reaction',
}

export interface Action {
  id: number;
  name: string;
  description: string;
  actionType: ActionType;
  attribute: string;
  skill: string;
  actionSubtypes: string[];
  cybernetics: Cybernetic[];
}

interface ActionList {
  [key: string]: Action[];
}

const useActions = () => {
  const { apiUrl } = useContext(AuthContext);

  const { data: actions, isLoading, isPending } = useActionsQuery(apiUrl);

  const [query, setQuery] = useState('');

  const filteredActions: ActionList = {
    action:
      actions?.filter(
        (action: Action) =>
          action.actionType === 'action' &&
          action.name.toLowerCase().includes(query.toLowerCase()),
      ) ?? [],
    extendedAction:
      actions?.filter(
        (action: Action) =>
          action.actionType === 'extendedAction' &&
          action.name.toLowerCase().includes(query.toLowerCase()),
      ) ?? [],
    reaction:
      actions?.filter(
        (action: Action) =>
          action.actionType === 'reaction' &&
          action.name.toLowerCase().includes(query.toLowerCase()),
      ) ?? [],
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
