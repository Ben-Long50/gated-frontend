import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import useCyberneticsQuery from './useCyberneticsQuery/useCyberneticsQuery';
import { CyberneticWithKeywords } from 'src/types/cybernetic';

import { FetchOptions } from 'src/types/fetchOptions';

const useCybernetics = (fetchOptions?: FetchOptions) => {
  const { apiUrl } = useContext(AuthContext);

  const {
    data: cybernetics,
    isLoading,
    isPending,
  } = useCyberneticsQuery(apiUrl);

  const list = fetchOptions?.itemList || cybernetics || [];

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');

  const filteredCybernetics = category
    ? list
        ?.filter(
          (cybernetic: CyberneticWithKeywords) =>
            cybernetic.cyberneticType === category,
        )
        .filter((cybernetic: CyberneticWithKeywords) =>
          cybernetic.name.toLowerCase().includes(query.toLowerCase()),
        )
    : (list?.filter((cybernetic: CyberneticWithKeywords) =>
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
