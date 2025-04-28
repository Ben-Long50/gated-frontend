import { useContext, useEffect, useMemo, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import useArmorQuery from './useArmorQuery/useArmorQuery';
import { ArmorWithKeywords } from '../types/armor';
import { FetchOptions } from 'src/types/fetchOptions';

const useArmor = (fetchOptions?: FetchOptions) => {
  const { apiUrl } = useContext(AuthContext);

  useEffect(() => {
    setCategory('');
  }, [fetchOptions]);

  const { data: armor, isLoading, isPending } = useArmorQuery(apiUrl);

  const armorWithKeywords = useMemo(() => {
    if (!armor) return null;

    const list = fetchOptions?.itemList || armor;

    const filteredExcludeList = fetchOptions?.excludedKeywords
      ? list.filter((armor: ArmorWithKeywords) =>
          armor.keywords?.every(
            (keyword) =>
              !fetchOptions.excludedKeywords?.includes(keyword.keyword?.name),
          ),
        )
      : list;

    const filteredIncludeList = fetchOptions?.includedKeywords
      ? filteredExcludeList.filter((armor: ArmorWithKeywords) =>
          armor.keywords?.some((keyword) =>
            fetchOptions.includedKeywords?.includes(keyword.keyword?.name),
          ),
        )
      : filteredExcludeList;

    return filteredIncludeList;
  }, [armor, fetchOptions]);

  const filteredKeywords = useMemo(() => {
    if (!armorWithKeywords) return null;

    const kw = [
      ...new Set(
        armorWithKeywords.flatMap((armor: ArmorWithKeywords) => {
          return armor.keywords?.map((keyword) => keyword.keyword?.name);
        }),
      ),
    ] as string[];

    return kw.sort((a, b) => a.localeCompare(b));
  }, [armorWithKeywords]);

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');

  const filteredArmor =
    category.length > 0
      ? armorWithKeywords
          ?.filter((armor: ArmorWithKeywords) =>
            armor.keywords.some((keyword) => keyword.keyword.name === category),
          )
          .filter((armor: ArmorWithKeywords) =>
            armor.name.toLowerCase().includes(query.toLowerCase()),
          )
      : (armorWithKeywords?.filter((armor: ArmorWithKeywords) =>
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
    filteredKeywords,
    filterByQuery,
    filterByCategory,
    resetList,
    isLoading,
    isPending,
  };
};

export default useArmor;
