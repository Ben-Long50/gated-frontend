import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import useCharactersQuery from './useCharactersQuery/useCharactersQuery';
import { Character } from 'src/types/character';

const useCharacters = () => {
  const { apiUrl } = useContext(AuthContext);

  const { data: characters, isLoading, isPending } = useCharactersQuery(apiUrl);

  const [query, setQuery] = useState('');
  const [campaignId, setCampaignId] = useState<number | null>(null);

  const filteredCharacters = campaignId
    ? characters?.filter((character: Character) => {
        const characterName = character.firstName + ' ' + character.lastName;
        return (
          character.campaignId === campaignId &&
          characterName?.toLowerCase().includes(query.toLowerCase())
        );
      })
    : (characters?.filter((character: Character) => {
        const characterName = character.firstName + ' ' + character.lastName;
        return characterName?.toLowerCase().includes(query.toLowerCase());
      }) ?? []);

  const filterByQuery = (query: string) => {
    setQuery(query);
  };

  const filterByCampaign = (campaignId: number | null) => {
    setCampaignId(campaignId);
  };

  const resetList = () => {
    setQuery('');
  };

  return {
    characters: filteredCharacters,
    filterByQuery,
    filterByCampaign,
    resetList,
    isLoading,
    isPending,
  };
};

export default useCharacters;
