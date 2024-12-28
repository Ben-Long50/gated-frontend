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
  keywords: Keyword[];
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

  const filteredArmor =
    armor?.filter((armor: Armor) =>
      armor.name.toLowerCase().includes(query.toLowerCase()),
    ) ?? [];

  const filterByQuery = (query: string) => {
    setQuery(query);
  };

  const resetList = () => {
    setQuery('');
  };

  return {
    filteredArmor,
    filterByQuery,
    resetList,
    isLoading,
    isPending,
  };
};

export default useArmor;
