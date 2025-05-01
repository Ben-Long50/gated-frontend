import { useContext, useMemo, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { VehicleWithWeapons } from 'src/types/vehicle';
import { FetchOptions } from 'src/types/fetchOptions';
import useDronesQuery from './useDronesQuery/useDronesQuery';

const useDrones = (fetchOptions?: FetchOptions) => {
  const { apiUrl } = useContext(AuthContext);

  const { data: vehicles, isLoading, isPending } = useDronesQuery(apiUrl);

  const list = fetchOptions?.itemList || vehicles;

  const [query, setQuery] = useState('');

  const filteredDrones = useMemo(() => {
    if (!list) return [];
    return list?.filter((vehicle: VehicleWithWeapons) =>
      vehicle.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [list, query]);

  const filterByQuery = (newQuery: string) => {
    setQuery(newQuery);
  };

  const resetList = () => {
    setQuery('');
  };

  return {
    filteredDrones,
    filterByQuery,
    resetList,
    isLoading,
    isPending,
  };
};

export default useDrones;
