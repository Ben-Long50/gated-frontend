import { useContext, useMemo, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import useVehiclesQuery from './useVehiclesQuery/useVehiclesQuery';
import { Vehicle, VehicleWithWeapons } from 'src/types/vehicle';
import { Weapon } from 'src/types/weapon';
import useKeywords from './useKeywords';
import { Keyword } from 'src/types/keyword';

const useVehicles = (vehicleList?: Vehicle[]) => {
  const { apiUrl } = useContext(AuthContext);

  const keywords = useKeywords();

  const { data: vehicles, isLoading, isPending } = useVehiclesQuery(apiUrl);

  const getWeaponsKeywords = (weapons: Weapon[]) => {
    if (!weapons || weapons.length === 0) return;
    return weapons?.map((weapon: Weapon) => {
      const keywordDetails = weapon.keywords.map((keyword) => {
        const details = keywords.filteredKeywords.find(
          (item: Keyword) => item.id === keyword.keywordId,
        );
        return { keyword: details, value: keyword.value };
      });
      return { ...weapon, keywords: keywordDetails };
    });
  };

  const vehiclesWithWeapons = useMemo(() => {
    if (!vehicles) return null;

    const list = vehicleList || vehicles;

    if (list.length === 0) return [];

    return list?.map((vehicle: Vehicle) => {
      const integratedWeaopns = getWeaponsKeywords(vehicle.weapons);

      return { ...vehicle, weapons: integratedWeaopns };
    });
  }, [vehicleList, vehicles]);

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
  };
};

export default useVehicles;
