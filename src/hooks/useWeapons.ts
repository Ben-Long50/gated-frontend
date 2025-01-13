import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import useWeaponsQuery from './useWeaponsQuery/useWeaponsQuery';
import { WeaponWithKeywords } from '../types/weapon';

const useWeapons = (initialCategory: string) => {
  const { apiUrl } = useContext(AuthContext);

  const { data: weapons, isLoading, isPending } = useWeaponsQuery(apiUrl);

  const [query, setQuery] = useState<string>('');
  const [category, setCategory] = useState<string>(initialCategory || '');

  const filteredWeapons = category
    ? weapons
        ?.filter((weapon: WeaponWithKeywords) =>
          weapon.keywords.some((keyword) => keyword.keyword.name === category),
        )
        .filter((weapon: WeaponWithKeywords) =>
          weapon.name.toLowerCase().includes(query.toLowerCase()),
        )
    : (weapons?.filter((weapon: WeaponWithKeywords) =>
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
