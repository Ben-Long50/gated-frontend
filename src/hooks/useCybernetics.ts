import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Keyword } from './useKeywords';
import useCyberneticsQuery from './useCyberneticsQuery/useCyberneticsQuery';

export interface Cybernetic {
  id: number;
  name: string;
  description: string;
  cyberneticType: string;
  cyber: number;
  stats: Partial<CyberneticStats>;
  price: number;
  keywords: Keyword[];
}

interface CyberneticStats {
  power: number;
  damage: number;
  salvo: number;
  flurry: number;
  range: number;
  magCapacity: number;
  magCount: number;
}

const useCybernetics = () => {
  const { apiUrl, authToken } = useContext(AuthContext);

  const {
    data: cybernetics,
    isLoading,
    isPending,
  } = useCyberneticsQuery(apiUrl, authToken);

  const [query, setQuery] = useState<string>('');
  const [category, setCategory] = useState<string>('');

  const filteredCybernetics = category
    ? cybernetics
        ?.filter(
          (cybernetic: Cybernetic) => cybernetic.cyberneticType === category,
        )
        .filter((cybernetic: Cybernetic) =>
          cybernetic.name.toLowerCase().includes(query.toLowerCase()),
        )
    : (cybernetics?.filter((cybernetic: Cybernetic) =>
        cybernetic.name.toLowerCase().includes(query.toLowerCase()),
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
    filteredCybernetics,
    filterByQuery,
    filterByCategory,
    resetList,
    isLoading,
    isPending,
  };
};

export default useCybernetics;
