import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import CharacterCard from './CharacterCard';
import BtnRect from './buttons/BtnRect';
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import Loading from './Loading';
import ThemeContainer from './ThemeContainer';
import useSetActiveCharacterMutation from '../hooks/useSetActiveCharacterMutation/useSetActiveCharacterMutation';
import { useForm } from '@tanstack/react-form';
import SelectField from './SelectField';
import { Character } from 'src/types/character';
import { ThemeContext } from '../contexts/ThemeContext';
import ArrowHeader2 from './ArrowHeader2';
import useCampaignQuery from '../hooks/useCampaignQuery/useCampaignQuery';

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

  const {
    data: campaign,
    isLoading,
    isPending,
  } = useCampaignQuery(apiUrl, campaignId);

  const playerCharacters =
    campaign?.characters.filter(
      (character: Character) => character.playerCharacter === true,
    ) || [];

  const nonPlayerCharacters =
    campaign?.characters.filter(
      (character: Character) => character.playerCharacter === false,
    ) || [];

  if (isLoading || isPending) {
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
