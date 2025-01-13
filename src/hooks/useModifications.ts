import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import useVehicleModsQuery from './useVehicleModsQuery/useVehicleModsQuery';
import { Modification } from '../types/vehicle';

const useModifications = () => {
  const { apiUrl } = useContext(AuthContext);

  const {
    data: modifications,
    isLoading,
    isPending,
  } = useVehicleModsQuery(apiUrl);

  const [query, setQuery] = useState('');

  const filteredMods: Modification[] =
    modifications?.filter((modification: Modification) =>
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
