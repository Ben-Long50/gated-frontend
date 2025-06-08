import { useContext, useMemo, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import useCharactersQuery from './useCharactersQuery/useCharactersQuery';
import { Character } from 'src/types/character';
import useCharacterQueries from './useCharactersQuery/useCharacterQueries';

const useCharacters = () => {
  const { apiUrl } = useContext(AuthContext);

  const { data: characterIds, isLoading: idsLoading } =
    useCharactersQuery(apiUrl);

  const { characters, isLoading: charactersLoading } = useCharacterQueries(
    characterIds?.map((character) => character.id) || [],
  );

  const [query, setQuery] = useState('');
  const [campaignId, setCampaignId] = useState<number | null>(null);

  const filteredCharacters = useMemo(
    () =>
      campaignId
        ? characters?.filter((character: Character) => {
            const characterName =
              character?.firstName + ' ' + character?.lastName;
            return (
              character?.campaignId === campaignId &&
              characterName?.toLowerCase().includes(query.toLowerCase())
            );
          })
        : (characters?.filter((character: Character) => {
            const characterName =
              character?.firstName + ' ' + character?.lastName;
            return characterName?.toLowerCase().includes(query.toLowerCase());
          }) ?? []),
    [characters, campaignId, query],
  );

  const activeCharacter = useMemo(
    () => filteredCharacters?.find((character) => character?.active === true),
    [filteredCharacters],
  );

  const inactiveCharacters = useMemo(
    () =>
      filteredCharacters?.filter((character) => character?.active === false),
    [filteredCharacters],
  );

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
    characters: inactiveCharacters,
    activeCharacter,
    filterByQuery,
    filterByCampaign,
    resetList,
    isLoading: idsLoading || charactersLoading,
  };
};

export default useCharacters;
