import { useContext, useMemo, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { VehicleWithWeapons } from 'src/types/vehicle';
import { FetchOptions } from 'src/types/fetchOptions';
import useVehiclesQuery from './useVehiclsQuery/useVehiclesQuery';

const useVehicles = (fetchOptions?: FetchOptions) => {
  const { apiUrl } = useContext(AuthContext);

  const { data: vehicles, isLoading, isPending } = useVehiclesQuery(apiUrl);

  const list = fetchOptions?.itemList || vehicles;

  const [query, setQuery] = useState('');

  const filteredVehicles = useMemo(() => {
    if (!list) return [];
    return list?.filter((vehicle: VehicleWithWeapons) =>
      vehicle.name?.toLowerCase().includes(query.toLowerCase()),
    );
  }, [list, query]);

  const filterByQuery = (newQuery: string) => {
    setQuery(newQuery);
  };

  const resetList = () => {
    setQuery('');
  };

  return {
    filteredVehicles,
    filterByQuery,
    resetList,
    isLoading,
    isPending,
  };
};

export default useVehicles;
