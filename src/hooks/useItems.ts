import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { FetchOptions } from 'src/types/fetchOptions';
import useItemsQuery from './useItemsQuery/useItemsQuery';
import { Item } from 'src/types/item';

const useItems = (fetchOptions?: FetchOptions) => {
  const { apiUrl } = useContext(AuthContext);

  const { data: items, isLoading, isPending } = useItemsQuery(apiUrl);

  const [query, setQuery] = useState('');

  const list = fetchOptions?.itemList || items;

  const filteredItems: Item[] =
    list
      ?.filter((item: Item) => {
        const match = fetchOptions?.includedKeywords
          ? fetchOptions?.includedKeywords.includes(item.category)
          : true;
        return match;
      })
      .filter((item: Item) =>
        item.name.toLowerCase().includes(query.toLowerCase()),
      ) ?? [];

  const filterByQuery = (query: string) => {
    setQuery(query);
  };

  const resetList = () => {
    setQuery('');
  };

  return {
    filteredItems,
    filterByQuery,
    resetList,
    isLoading,
    isPending,
  };
};

export default useItems;
