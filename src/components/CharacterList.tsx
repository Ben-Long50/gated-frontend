import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import useCharactersQuery from '../hooks/useCharactersQuery/useCharactersQuery';
import CharacterCard from './CharacterCard';

const CharacterList = () => {
  const { apiUrl, authToken } = useContext(AuthContext);

  const {
    data: characters,
    isLoading,
    isPending,
  } = useCharactersQuery(apiUrl, authToken);

  if (isLoading || isPending) {
    return <span></span>;
  }

  return (
    <div className="flex w-full max-w-5xl flex-col items-center gap-3">
      <h1 className="text-center lg:mb-5">Characters</h1>
      <div className="grid grid-flow-row gap-10">
        {characters?.map((character) => {
          return <CharacterCard key={character.id} character={character} />;
        })}
      </div>
    </div>
  );
};

export default CharacterList;
