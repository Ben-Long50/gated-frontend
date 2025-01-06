import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Keyword } from './useKeywords';
import useArmorQuery from './useArmorQuery/useArmorQuery';

interface Armor {
  id: number;
  name: string;
  description: string;
  stats: Partial<ArmorStats>;
  price: number;
  keywords: { keyword: Keyword; value?: number }[];
}

interface ArmorStats {
  armor: number;
  ward: number;
  block: number;
  power: number;
  weight: number;
}

const useArmor = () => {
  const { apiUrl, authToken } = useContext(AuthContext);

  const {
    data: armor,
    isLoading,
    isPending,
  } = useArmorQuery(apiUrl, authToken);

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('');

  const filteredArmor = category
    ? armor
        ?.filter((armor: Armor) =>
          armor.keywords.some((keyword) => keyword.keyword.name === category),
        )
        .filter((armor: Armor) =>
          armor.name.toLowerCase().includes(query.toLowerCase()),
        )
    : (armor?.filter((armor: Armor) =>
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
