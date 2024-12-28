import { useContext, useState } from 'react';
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

  const [query, setQuery] = useState('');

  const filteredKeywords: List = {
    weapon:
      keywords?.filter(
        (keyword: Keyword) =>
          keyword.keywordType === 'Weapon' &&
          keyword.name.toLowerCase().includes(query.toLowerCase()),
      ) ?? [],
    armor:
      keywords?.filter(
        (keyword: Keyword) =>
          keyword.keywordType === 'Armor' &&
          keyword.name.toLowerCase().includes(query.toLowerCase()),
      ) ?? [],
  };

  const filterByQuery = (query: string) => {
    setQuery(query);
  };

  const resetList = () => {
    setQuery('');
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
