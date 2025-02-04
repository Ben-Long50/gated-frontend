import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import useCharactersQuery from '../hooks/useCharactersQuery/useCharactersQuery';
import CharacterCard from './CharacterCard';
import BtnRect from './buttons/BtnRect';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import ThemeContainer from './ThemeContainer';
import useActiveCharacterQuery from '../hooks/useActiveCharacterQuery/useActiveCharacterQuery';
import useSetActiveCharacterMutation from '../hooks/useSetActiveCharacterMutation/useSetActiveCharacterMutation';
import { useForm } from '@tanstack/react-form';
import SelectField from './SelectField';
import { Character } from 'src/types/character';
import { ThemeContext } from '../contexts/ThemeContext';

const CharacterList = () => {
  const { apiUrl } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);

  const { data: characters, isLoading, isPending } = useCharactersQuery(apiUrl);
  const { data: activeCharacter } = useActiveCharacterQuery(apiUrl);

  const setActiveCharacter = useSetActiveCharacterMutation(apiUrl);

  const activeForm = useForm({
    defaultValues: {
      character: activeCharacter?.id ?? '',
    },
    onSubmit: ({ value }) => {
      setActiveCharacter.mutate(value.character);
      activeForm.reset();
    },
  });

  if (isLoading || isPending) {
    return <Loading />;
  }

  return (
    <div className="flex w-full max-w-5xl flex-col items-center gap-6">
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
        <>
          <h1 className="text-center">Characters</h1>
          <ThemeContainer
            className={`ml-auto w-full rounded-br-5xl rounded-tl-5xl shadow-lg shadow-zinc-950`}
            chamfer="24"
            borderColor={accentPrimary}
          >
            <form className="bg-primary flex w-full flex-col gap-4 p-4 clip-6">
              <div className="grid w-full grid-cols-2 items-center justify-between gap-4 sm:gap-8">
                <h3 className="pl-4">Active character</h3>
                <activeForm.Field name="character">
                  {(field) => (
                    <SelectField
                      field={field}
                      onChange={() => {
                        activeForm.handleSubmit();
                      }}
                    >
                      <option value=""></option>
                      {characters.map((character: Character) => (
                        <option key={character.id} value={character.id}>
                          {character.firstName + ' ' + character.lastName}
                        </option>
                      ))}
                    </SelectField>
                  )}
                </activeForm.Field>
              </div>
            </form>
          </ThemeContainer>
        </>
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
