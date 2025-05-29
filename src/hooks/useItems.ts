import { useContext, useMemo, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import useItemsQuery from './useItemsQuery/useItemsQuery';
import { Item } from 'src/types/item';

const useItems = ({
  category,
  itemList,
  includedKeywords,
  excludedKeywords,
}: {
  category: string;
  itemList?: Item[];
  includedKeywords?: string[];
  excludedKeywords?: string[];
}) => {
  const { apiUrl } = useContext(AuthContext);

  const { data: items, isLoading, isPending } = useItemsQuery(apiUrl, category);

  const categorizedItems = useMemo(() => {
    const list = itemList || items;

    const filteredExcludeList = excludedKeywords
      ? list?.filter((item: Item) =>
          item.keywords?.every(
            (keyword) => !excludedKeywords?.includes(keyword.keyword?.name),
          ),
        )
      : list;

    const filteredIncludeList = includedKeywords
      ? filteredExcludeList?.filter((item: Item) =>
          item.keywords?.some((keyword) =>
            includedKeywords?.includes(keyword.keyword?.name),
          ),
        )
      : filteredExcludeList;

    return filteredIncludeList;
  }, [items, itemList, includedKeywords, excludedKeywords]);

  const filteredKeywords = useMemo(() => {
    if (!categorizedItems) return null;

    const kw = [
      ...new Set(
        categorizedItems.flatMap((item: Item) => {
          return item.keywords?.map((keyword) => keyword.keyword?.name);
        }),
      ),
    ] as string[];

    return kw.sort((a, b) => a.localeCompare(b));
  }, [categorizedItems]);

  const [query, setQuery] = useState('');
  const [itemCategory, setItemCategory] = useState('');

  const filteredItems =
    itemCategory.length > 0
      ? categorizedItems
          ?.filter((item: Item) =>
            item.keywords.some((keyword) => category === keyword.keyword.name),
          )
          .filter((item: Item) =>
            item.name.toLowerCase().includes(query.toLowerCase()),
          )
      : (categorizedItems?.filter((item: Item) =>
          item.name.toLowerCase().includes(query.toLowerCase()),
        ) ?? []);

  const filterByQuery = (newQuery: string) => {
    setQuery(newQuery);
  };

  const filterByCategory = (newCategory: string) => {
    setItemCategory(newCategory);
  };

  const resetList = () => {
    setQuery('');
  };

  return {
    filteredItems,
    filteredKeywords,
    filterByQuery,
    filterByCategory,
    resetList,
    isLoading,
    isPending,
  };
};

export default useItems;
