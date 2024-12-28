import { useContext, useState } from 'react';
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

  const [query, setQuery] = useState<string>('');

  const filteredWeapons =
    weapons?.filter((weapon: Weapon) =>
      weapon.name.toLowerCase().includes(query.toLowerCase()),
    ) ?? [];

  const filterByQuery = (newQuery: string) => {
    setQuery(newQuery);
  };

  const resetList = () => {
    setQuery('');
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
