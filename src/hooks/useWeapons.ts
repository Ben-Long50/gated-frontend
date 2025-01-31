import { useContext, useEffect, useMemo, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import useWeaponsQuery from './useWeaponsQuery/useWeaponsQuery';
import { Weapon, WeaponWithKeywords } from '../types/weapon';
import useKeywords from './useKeywords';
import { Keyword } from 'src/types/keyword';
import { FetchOptions } from 'src/types/fetchOptions';

const useWeapons = (fetchOptions?: FetchOptions) => {
  const { apiUrl } = useContext(AuthContext);

  useEffect(() => {
    setCategory('');
  }, [fetchOptions]);

  const keywords = useKeywords('weapon');

  const { data: weapons, isLoading, isPending } = useWeaponsQuery(apiUrl);

  const weaponsWithKeywords = useMemo(() => {
    if (!weapons || !keywords.filteredKeywords) return null;

    const list = fetchOptions?.itemList || weapons;

    return list
      ?.map((weapon: Weapon) => {
        const keywordDetails = weapon.keywords.map((keyword) => {
          const details = keywords.filteredKeywords.find(
            (item: Keyword) => item.id === keyword.keywordId,
          );
          return { keyword: details, value: keyword.value };
        });
        return { ...weapon, keywords: keywordDetails };
      })
      .filter((weapon: WeaponWithKeywords) => {
        const matchesKeywordList = fetchOptions?.includedKeywords
          ? weapon.keywords.some((keyword) =>
              fetchOptions.includedKeywords?.includes(keyword.keyword?.name),
            )
          : true;
        const matchesExcludeList = fetchOptions?.excludedKeywords
          ? weapon.keywords.every(
              (keyword) =>
                !fetchOptions.excludedKeywords?.includes(keyword.keyword?.name),
            )
          : true;

        return matchesKeywordList && matchesExcludeList;
      });
  }, [weapons, fetchOptions, keywords.filteredKeywords]);

  const filteredKeywords = useMemo(() => {
    if (!weaponsWithKeywords) return null;

    const kw = [
      ...new Set(
        weaponsWithKeywords.flatMap((weapon: WeaponWithKeywords) => {
          return weapon.keywords.map((keyword) => keyword.keyword.name);
        }),
      ),
    ] as string[];

    return kw.sort((a, b) => a.localeCompare(b));
  }, [weaponsWithKeywords]);

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');

  const filteredWeapons =
    category.length > 0
      ? weaponsWithKeywords
          ?.filter((weapon: WeaponWithKeywords) =>
            weapon.keywords.some(
              (keyword) => category === keyword.keyword.name,
            ),
          )
          .filter((weapon: WeaponWithKeywords) =>
            weapon.name.toLowerCase().includes(query.toLowerCase()),
          )
      : (weaponsWithKeywords?.filter((weapon: WeaponWithKeywords) =>
          weapon.name.toLowerCase().includes(query.toLowerCase()),
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
    filteredWeapons,
    filteredKeywords,
    filterByQuery,
    filterByCategory,
    resetList,
    isLoading,
    isPending,
    keywordsLoading: keywords.isLoading,
    keywordsPending: keywords.isPending,
  };
};

export default useWeapons;
