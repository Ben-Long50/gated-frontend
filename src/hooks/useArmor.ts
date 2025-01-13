import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import useArmorQuery from './useArmorQuery/useArmorQuery';
import { ArmorWithKeywords } from '../types/armor';

const useArmor = () => {
  const { apiUrl } = useContext(AuthContext);

  const { data: armor, isLoading, isPending } = useArmorQuery(apiUrl);

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('');

  const filteredArmor = category
    ? armor
        ?.filter((armor: ArmorWithKeywords) =>
          armor.keywords.some((keyword) => keyword.keyword.name === category),
        )
        .filter((armor: ArmorWithKeywords) =>
          armor.name.toLowerCase().includes(query.toLowerCase()),
        )
    : (armor?.filter((armor: ArmorWithKeywords) =>
        armor.name.toLowerCase().includes(query.toLowerCase()),
      ) ?? []);

  const filterByQuery = (query: string) => {
    setQuery(query);
  };

  const filterByCategory = (newCategory: string) => {
    setCategory(newCategory);
  };

  const resetList = () => {
    setQuery('');
  };

  return {
    filteredArmor,
    filterByQuery,
    filterByCategory,
    resetList,
    isLoading,
    isPending,
  };
};

export default useArmor;
