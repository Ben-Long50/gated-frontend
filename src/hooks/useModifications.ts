import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Modification } from '../types/vehicle';
import { FetchOptions } from 'src/types/fetchOptions';
import useItemsQuery from './useItemsQuery/useItemsQuery';

const useModifications = (fetchOptions?: FetchOptions) => {
  const { apiUrl } = useContext(AuthContext);

  const {
    data: modifications,
    isLoading,
    isPending,
  } = useItemsQuery(apiUrl, 'modifications');

  const [query, setQuery] = useState('');

  const list = fetchOptions?.itemList || modifications;

  const filteredMods: Modification[] =
    list?.filter((modification: Modification) =>
      modification.name.toLowerCase().includes(query.toLowerCase()),
    ) ?? [];

  const filterByQuery = (query: string) => {
    setQuery(query);
  };

  const resetList = () => {
    setQuery('');
  };

  return {
    filteredMods,
    filterByQuery,
    resetList,
    isLoading,
    isPending,
  };
};

export default useModifications;
