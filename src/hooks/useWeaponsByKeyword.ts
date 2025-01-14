import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { WeaponWithKeywords } from '../types/weapon';
import useWeaponsByKeywordQuery from './useWeaponsByKeywordQuery/useWeaponsByKeywordQuery';

const useWeaponsByKeyword = (keyword: string) => {
  const { apiUrl } = useContext(AuthContext);

  const {
    data: weapons,
    isLoading,
    isPending,
  } = useWeaponsByKeywordQuery(apiUrl, keyword);

  const [query, setQuery] = useState<string>('');

  const filteredWeapons =
    weapons?.filter((weapon: WeaponWithKeywords) =>
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

export default useWeaponsByKeyword;
