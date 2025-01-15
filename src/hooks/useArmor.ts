import { useContext, useEffect, useMemo, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import useArmorQuery from './useArmorQuery/useArmorQuery';
import { Armor, ArmorWithKeywords } from '../types/armor';
import useKeywords from './useKeywords';
import { Keyword } from 'src/types/keyword';

const useArmor = (keywordList?: string[]) => {
  const { apiUrl } = useContext(AuthContext);

  useEffect(() => {
    setCategory('');
  }, [keywordList]);

  const keywords = useKeywords();

  const { data: armor, isLoading, isPending } = useArmorQuery(apiUrl);

  const armorWithKeywords = useMemo(() => {
    if (!armor || !keywords.filteredKeywords) return null;

    return armor
      ?.map((armorSet: Armor) => {
        const keywordDetails = armorSet.keywords.map((keyword) => {
          const details = keywords.filteredKeywords.armor.find(
            (item: Keyword) => item.id === keyword.keywordId,
          );
          return { keyword: details, value: keyword.value };
        });
        return { ...armorSet, keywords: keywordDetails };
      })
      .filter((armorSet: ArmorWithKeywords) => {
        if (keywordList) {
          return armorSet.keywords.some((keyword) =>
            keywordList?.includes(keyword.keyword?.name),
          );
        } else {
          return true;
        }
      });
  }, [armor, keywords.filteredKeywords]);

  const filteredKeywords = useMemo(() => {
    if (!armorWithKeywords) return null;

    const kw = [
      ...new Set(
        armorWithKeywords.flatMap((armor: ArmorWithKeywords) => {
          return armor.keywords?.map((keyword) => keyword.keyword.name);
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
    keywordsLoading: keywords.isLoading,
    keywordsPending: keywords.isPending,
  };
};

export default useArmor;
