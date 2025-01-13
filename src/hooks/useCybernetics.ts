import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import useCyberneticsQuery from './useCyberneticsQuery/useCyberneticsQuery';
import { CyberneticWithKeywords } from 'src/types/cybernetic';

const useCybernetics = () => {
  const { apiUrl } = useContext(AuthContext);

  const {
    data: cybernetics,
    isLoading,
    isPending,
  } = useCyberneticsQuery(apiUrl);

  const [query, setQuery] = useState<string>('');
  const [category, setCategory] = useState<string>('');

  const filteredCybernetics = category
    ? cybernetics
        ?.filter(
          (cybernetic: CyberneticWithKeywords) =>
            cybernetic.cyberneticType === category,
        )
        .filter((cybernetic: CyberneticWithKeywords) =>
          cybernetic.name.toLowerCase().includes(query.toLowerCase()),
        )
    : (cybernetics?.filter((cybernetic: CyberneticWithKeywords) =>
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
