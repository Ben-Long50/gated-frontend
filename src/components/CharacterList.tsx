import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import useCharactersQuery from '../hooks/useCharactersQuery/useCharactersQuery';
import CharacterCard from './CharacterCard';
import BtnRect from './buttons/BtnRect';
import { Link } from 'react-router-dom';
import Loading from './Loading';

const CharacterList = () => {
  const { apiUrl } = useContext(AuthContext);

  const { data: characters, isLoading, isPending } = useCharactersQuery(apiUrl);

  if (isLoading || isPending) {
    return <Loading />;
  }

  return (
    <div className="flex w-full max-w-5xl flex-col items-center gap-3">
      {!characters || characters?.length === 0 ? (
        <div className="flex w-full flex-col items-center justify-center gap-8">
          <h1 className="text-center">
            You haven't created any characters yet. Try it out
          </h1>
          <Link to="create">
            <BtnRect>Character creator</BtnRect>
          </Link>
        </div>
      ) : (
        <h1 className="text-center lg:mb-5">Characters</h1>
      )}
      <div className="grid grid-flow-row gap-10">
        {characters?.map((character) => {
          return <CharacterCard key={character.id} character={character} />;
        })}
      </div>
    </div>
  );
};

export default CharacterList;
