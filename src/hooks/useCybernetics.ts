import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import useCyberneticsQuery from './useCyberneticsQuery/useCyberneticsQuery';
import { CyberneticWithKeywords } from 'src/types/cybernetic';

import { FetchOptions } from 'src/types/fetchOptions';
import { Item } from 'src/types/item';
import useItemsQuery from './useItemsQuery/useItemsQuery';

const useCybernetics = (fetchOptions?: FetchOptions) => {
  const { apiUrl } = useContext(AuthContext);

  const {
    data: cybernetics,
    isLoading,
    isPending,
  } = useItemsQuery(apiUrl, 'augmentations');

  const list = fetchOptions?.itemList || cybernetics || [];

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');

  const filteredCybernetics = category
    ? list
        ?.filter((cybernetic: Item) => cybernetic.itemSubtype === category)
        .filter((cybernetic: Item) =>
          cybernetic.name.toLowerCase().includes(query.toLowerCase()),
        )
    : (list?.filter((cybernetic: Item) =>
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
    filteredCybernetics: filteredCybernetics.filter(
      (augment) => augment.itemSubtype === 'cybernetic',
    ),
    filteredMutations: filteredCybernetics.filter(
      (augment) => augment.itemSubtype === 'mutation',
    ),
    filterByQuery,
    filterByCategory,
    resetList,
    isLoading,
    isPending,
  };
};

export default useCybernetics;
