import { useContext, useMemo, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import useVehiclesQuery from './useVehiclesQuery/useVehiclesQuery';
import { Vehicle, VehicleWithWeapons } from 'src/types/vehicle';
import useWeapons from './useWeapons';
import { WeaponWithKeywords } from 'src/types/weapon';

const useVehicles = (vehicleList?: Vehicle[]) => {
  const { apiUrl } = useContext(AuthContext);

  const vehicleWeapons = useWeapons(['Vehicle']);

  const { data: vehicles, isLoading, isPending } = useVehiclesQuery(apiUrl);

  const vehiclesWithWeapons = useMemo(() => {
    if (!vehicles || !vehicleWeapons.filteredWeapons) return null;

    const list = vehicleList || vehicles;

    if (list.length === 0) return [];

    return list?.map((vehicle: Vehicle) => {
      const weaponDetails = vehicle.weapons.map((weapon) => {
        const details = vehicleWeapons.filteredWeapons.find(
          (item: WeaponWithKeywords) => item.id === weapon.weaponId,
        );
        return { weapon: details, quantity: weapon.quantity };
      });
      return { ...vehicle, weapons: weaponDetails };
    });
  }, [vehicleWeapons.filteredWeapons, vehicles]);

  const [query, setQuery] = useState('');

  const filteredVehicles = useMemo(() => {
    if (!vehiclesWithWeapons) return [];
    return vehiclesWithWeapons?.filter((vehicle: VehicleWithWeapons) =>
      vehicle.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [vehiclesWithWeapons, query]);

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
    weaponsLoading: vehicleWeapons.isLoading,
    weaponsPending: vehicleWeapons.isPending,
  };
};

export default useVehicles;
