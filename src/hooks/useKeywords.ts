import { useContext, useEffect, useState } from 'react';
import useKeywordsQuery from './useKeywordQuery/useKeywordsQuery';
import { AuthContext } from '../contexts/AuthContext';

enum KeywordType {
  Weapon = 'Weapon',
  Armor = 'Armor',
}

export interface Keyword {
  id: number;
  name: string;
  description: string;
  keywordType: KeywordType;
  value: number;
}

interface List {
  [key: string]: Keyword[];
}

const useKeywords = () => {
  const { apiUrl, authToken } = useContext(AuthContext);

  const {
    data: keywords,
    isLoading,
    isPending,
  } = useKeywordsQuery(apiUrl, authToken);

  const [sortedKeywords, setSortedKeywords] = useState<List>({
    weapon: [],
    armor: [],
  });
  const [filteredKeywords, setFilteredKeywords] = useState<List>({
    weapon: [],
    armor: [],
  });

  useEffect(() => {
    if (keywords) {
      setSortedKeywords(sortKeywords(keywords));
      setFilteredKeywords(sortKeywords(keywords));
    }
  }, [keywords]);

  // Oraganizes the keywords from the keyword list by keyword type
  const sortKeywords = (keywordList: Keyword[]) => {
    const weaponKeywords = keywordList.filter(
      (keyword) => keyword.keywordType === 'Weapon',
    );
    const armorKeywords = keywordList.filter(
      (keyword) => keyword.keywordType === 'Armor',
    );

    return {
      weapon: weaponKeywords,
      armor: armorKeywords,
    };
  };

  const filterByQuery = (query: string) => {
    const filteredKeywords = { ...sortedKeywords };
    Object.entries(sortedKeywords).map(([type, keywordList]) => {
      filteredKeywords[type] = keywordList.filter((keyword: Partial<Keyword>) =>
        keyword.name?.toLowerCase().includes(query.toLowerCase()),
      );
    });
    setFilteredKeywords(filteredKeywords);
  };

  const resetList = () => {
    setFilteredKeywords(sortedKeywords);
  };

  return {
    filteredKeywords,
    filterByQuery,
    resetList,
    isLoading,
    isPending,
  };
};

export default useKeywords;
