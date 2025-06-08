import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import CharacterCard from './CharacterCard';
import { useParams, useSearchParams } from 'react-router-dom';
import Loading from './Loading';
import { Character } from 'src/types/character';
import useCampaignQuery from '../hooks/useCampaignQuery/useCampaignQuery';
import useCampaignCharactersQuery from 'src/hooks/useCampaignCharactersQuery/useCampaignCharactersQuery';
import useCharacters from 'src/hooks/useCharacters';

const CampaignCharacterList = () => {
  const { apiUrl, user } = useContext(AuthContext);
  const { campaignId } = useParams();
  const [searchParams] = useSearchParams();

  const [characters, setCharacters] = useState(
    searchParams.get('list') || 'playerCharacters',
  );

  useEffect(() => {
    const param = searchParams.get('list');
    if (param) {
      setCharacters(param);
    }
  }, [searchParams]);

  const { data: campaign, isLoading: campaignLoading } = useCampaignQuery(
    apiUrl,
    Number(campaignId),
  );

  const {
    playerCharacters,
    nonPlayerCharacters,
    isLoading: charactersLoading,
  } = useCampaignCharactersQuery(
    apiUrl,
    campaign?.characters.map((character) => character.id) || [],
  );

  const isLoading = campaignLoading || charactersLoading;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex w-full max-w-7xl flex-col items-center gap-6">
      <h1 className="text-center">
        {characters === 'playerCharacters'
          ? 'Player Characters'
          : 'Non-player Characters'}
      </h1>
      <div className="grid w-full grid-flow-row gap-10">
        {characters === 'playerCharacters' &&
          playerCharacters?.map((character: Character) => {
            return <CharacterCard key={character.id} character={character} />;
          })}
        {characters === 'nonPlayerCharacters' &&
          nonPlayerCharacters?.map((character: Character) => {
            return <CharacterCard key={character.id} character={character} />;
          })}
      </div>
    </div>
  );
};

export default CampaignCharacterList;
