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
  keywords: { keyword: Keyword; value?: number }[];
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
  const [category, setCategory] = useState<string>('');

  const filteredWeapons = category
    ? weapons
        ?.filter((weapon: Weapon) =>
          weapon.keywords.some((keyword) => keyword.keyword.name === category),
        )
        .filter((weapon: Weapon) =>
          weapon.name.toLowerCase().includes(query.toLowerCase()),
        )
    : (weapons?.filter((weapon: Weapon) =>
        weapon.name.toLowerCase().includes(query.toLowerCase()),
      ) ?? []);

  const filterByQuery = (newQuery: string) => {
    setQuery(newQuery);
  };

  const filterByCategory = (newCategory: string) => {
    setCategory(newCategory);
  };

  const resetList = () => {
    setQuery('');
  };

  return {
    filteredWeapons,
    filterByQuery,
    filterByCategory,
    resetList,
    isLoading,
    isPending,
  };
};

export default useWeapons;
