import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import CharacterCard from './CharacterCard';
import BtnRect from './buttons/BtnRect';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import ThemeContainer from './ThemeContainer';
import useSetActiveCharacterMutation from '../hooks/useSetActiveCharacterMutation/useSetActiveCharacterMutation';
import { useForm } from '@tanstack/react-form';
import { Character } from 'src/types/character';
import { ThemeContext } from '../contexts/ThemeContext';
import ArrowHeader2 from './ArrowHeader2';
import InputSelectField from './InputSelectField';
import useCampaignsQuery from 'src/hooks/useCampaignsQuery/useCampaignsQuery';
import useCharacters from 'src/hooks/useCharacters';
import InputField from './InputField';
import Icon from '@mdi/react';
import { mdiSync } from '@mdi/js';
import { Campaign } from 'src/types/campaign';

const CharacterList = () => {
  const { apiUrl } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);

  const {
    characters,
    activeCharacter,
    filterByCampaign,
    filterByQuery,
    isLoading,
  } = useCharacters();

  const { data: campaigns } = useCampaignsQuery(apiUrl);

  const setActiveCharacter = useSetActiveCharacterMutation(
    apiUrl,
    activeCharacter?.id,
  );

  const activeForm = useForm({
    defaultValues: {
      character:
        activeCharacter ||
        ({ id: 0, firstName: '', lastName: '' } as Character),
      campaign: null as Campaign | null,
      query: '' as string,
    },
    onSubmit: ({ value }) => {
      setActiveCharacter.mutate(value.character.id);
      activeForm.reset();
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex w-full max-w-7xl flex-col items-center gap-8">
      <h1 className="text-center">Characters</h1>
      <ThemeContainer
        className={`ml-auto w-full`}
        chamfer="medium"
        borderColor={accentPrimary}
      >
        <form className="flex w-full flex-col gap-4 p-4">
          <div className="grid w-full items-center gap-4 max-sm:grid-flow-row sm:grid-flow-col sm:gap-8">
            <ArrowHeader2 title="Character Options" />
            <div className="flex w-full items-center justify-end gap-4">
              {setActiveCharacter.isPending && (
                <Loading size={2} className="text-secondary" />
              )}
              <activeForm.Field name="character">
                {(field) => (
                  <InputSelectField
                    field={field}
                    label="Active Character"
                    options={characters}
                    onChange={() => {
                      activeForm.handleSubmit();
                    }}
                  />
                )}
              </activeForm.Field>
            </div>
          </div>
          <activeForm.Field name="campaign">
            {(field) => (
              <InputSelectField
                field={field}
                label="Filter By Campaign"
                options={campaigns || []}
                onChange={() => filterByCampaign(field.state.value.id)}
              />
            )}
          </activeForm.Field>
          <div className="flex w-full items-center gap-4">
            <activeForm.Field name="query">
              {(field) => (
                <InputField
                  field={field}
                  className="w-full"
                  label="Search Characters"
                  onChange={() => filterByQuery(field.state.value)}
                />
              )}
            </activeForm.Field>
            <button
              className="text-accent bg-tertiary group z-10 grid size-12 shrink-0 place-items-center rounded-md p-1.5 shadow-md shadow-black hover:underline"
              onClick={(e) => {
                e.preventDefault();
                activeForm.reset();
                filterByCampaign(null);
                filterByQuery('');
              }}
            >
              <Icon
                path={mdiSync}
                className="text-secondary group-hover:text-accent timing"
              />
            </button>
          </div>
        </form>
      </ThemeContainer>
      {activeCharacter && (
        <CharacterCard
          key={activeCharacter.id}
          characterId={activeCharacter.id}
        />
      )}
      {!characters || characters?.length === 0 ? (
        <div className="flex w-full flex-col items-center justify-center gap-8">
          <h1 className="text-center">No Characters Found</h1>
          <Link to="create">
            <BtnRect ariaLabel="Create character" type="button">
              Character creator
            </BtnRect>
          </Link>
        </div>
      ) : (
        <div className="grid w-full grid-flow-row gap-10">
          {characters?.map((character: Character) => (
            <CharacterCard key={character.id} characterId={character.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CharacterList;
