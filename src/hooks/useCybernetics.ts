import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Keyword } from './useKeywords';
import useCyberneticsQuery from './useCyberneticsQuery/useCyberneticsQuery';

interface Cybernetic {
  id: number;
  name: string;
  description: string;
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

  const filteredCybernetics =
    cybernetics?.filter((cybernetic: Cybernetic) =>
      cybernetic.name.toLowerCase().includes(query.toLowerCase()),
    ) ?? [];

  const filterByQuery = (newQuery: string) => {
    setQuery(newQuery);
  };

  const resetList = () => {
    setQuery('');
  };

  return {
    filteredCybernetics,
    filterByQuery,
    resetList,
    isLoading,
    isPending,
  };
};

export default useCybernetics;
