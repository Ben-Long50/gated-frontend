import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Keyword } from './useKeywords';
import useWeaponsQuery from './useWeaponsQuery/useWeaponsQuery';

interface Weapon {
  id: number;
  name: string;
  description: string;
  stats: Partial<WeaponStats>;
  price: number;
  keywords: Keyword[];
}

interface WeaponStats {
  damage: number;
  salvo: number;
  flurry: number;
  range: number;
  magCapacity: number;
  magCount: number;
  weight: number;
}

const useWeapons = () => {
  const { apiUrl, authToken } = useContext(AuthContext);

  const {
    data: weapons,
    isLoading,
    isPending,
  } = useWeaponsQuery(apiUrl, authToken);

  const [filteredWeapons, setFilteredWeapons] = useState<Weapon[]>([]);

  useEffect(() => {
    if (weapons) {
      setFilteredWeapons(weapons);
    }
  }, [weapons]);

  const filterByQuery = (query: string) => {
    const filteredWeapons = weapons.filter((weapon) =>
      weapon.name?.toLowerCase().includes(query.toLowerCase()),
    );

    setFilteredWeapons(filteredWeapons);
  };

  const resetList = () => {
    setFilteredWeapons(weapons);
  };

  return {
    filteredWeapons,
    filterByQuery,
    resetList,
    isLoading,
    isPending,
  };
};

export default useWeapons;
