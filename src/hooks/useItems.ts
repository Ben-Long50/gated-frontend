import { useContext, useMemo, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import useItemsQuery from './useItemsQuery/useItemsQuery';
import { Item } from 'src/types/item';
import { camelCase } from 'change-case';

const useItems = ({
  category,
  itemList,
  includedKeywords,
  excludedKeywords,
  subcategory,
}: {
  category: string;
  itemList?: Item[];
  includedKeywords?: string[];
  excludedKeywords?: string[];
  subcategory?: string;
}) => {
  const { apiUrl } = useContext(AuthContext);

  const { data: items, isLoading, isPending } = useItemsQuery(apiUrl, category);

  const categorizedItems = useMemo(() => {
    const list =
      itemList ||
      (subcategory
        ? items?.filter((item) => item.itemSubtypes?.includes(subcategory))
        : items);

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
  }, [items, itemList, includedKeywords, excludedKeywords, subcategory]);

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
  const [priceFilter, setPriceFilter] = useState('');
  const [rarity, setRarity] = useState('');

  const filterItems = (items: Item[]) => {
    if (!items) return;
    let filteredItems = items;
    if (itemCategory) {
      filteredItems = items.filter((item: Item) =>
        item.keywords.some(
          (keyword) =>
            camelCase(itemCategory) === camelCase(keyword.keyword.name),
        ),
      );
    }
    if (query) {
      filteredItems = filteredItems.filter((item: Item) =>
        item.name.toLowerCase().includes(query.toLowerCase()),
      );
    }
    if (priceFilter === 'lowToHigh') {
      filteredItems = filteredItems.sort((a, b) => {
        if (a.price === null) {
          return -1;
        } else if (b.price === null) {
          return 1;
        } else {
          return a.price - b.price;
        }
      });
    }
    if (priceFilter === 'highToLow') {
      filteredItems = filteredItems.sort((a, b) => {
        if (b.price === null) {
          return -1;
        } else if (a.price === null) {
          return 1;
        } else {
          return b.price - a.price;
        }
      });
    }
    if (!priceFilter) {
      filteredItems = filteredItems.sort((a, b) =>
        a.name.localeCompare(b.name),
      );
    }
    if (rarity) {
      filteredItems = filteredItems.filter((item) => item.rarity === rarity);
    }
    return filteredItems;
  };

  const filteredItems = filterItems(categorizedItems);

  const filterByQuery = (newQuery: string) => {
    setQuery(newQuery);
  };

  const filterByPrice = (direction: string) => {
    setPriceFilter(direction);
  };

  const filterByRarity = (rarity: string) => {
    setRarity(rarity);
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
    filterByPrice,
    filterByRarity,
    resetList,
    isLoading,
    isPending,
  };
};

export default useItems;
