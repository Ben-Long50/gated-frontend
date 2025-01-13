import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import useVehiclesQuery from './useVehiclesQuery/useVehiclesQuery';
import { VehicleWithWeapons } from 'src/types/vehicle';

const useVehicles = () => {
  const { apiUrl } = useContext(AuthContext);

  const { data: vehicles, isLoading, isPending } = useVehiclesQuery(apiUrl);

  const [query, setQuery] = useState<string>('');
  console.log(vehicles);

  const filteredVehicles = vehicles?.filter((vehicle: VehicleWithWeapons) =>
    vehicle.name.toLowerCase().includes(query.toLowerCase()),
  );

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
