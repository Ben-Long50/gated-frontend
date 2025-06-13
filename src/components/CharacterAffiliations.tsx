import Affiliations from './Affiliations';
import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from './Loading';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from 'src/contexts/ThemeContext';
import { useForm, useStore } from '@tanstack/react-form';
import InputSelectField from './InputSelectField';
import useAffiliationQueries from 'src/hooks/useAffiliationQueries/useAffiliationQueries';
import Icon from '@mdi/react';
import { mdiSync } from '@mdi/js';
import { Faction } from 'src/types/faction';
import { Character } from 'src/types/character';
import ArrowHeader3 from './ArrowHeader3';
import useCharacterQuery from 'src/hooks/useCharacterQuery/useCharacterQuery';
import BtnRect from './buttons/BtnRect';
import BtnAuth from './buttons/BtnAuth';

const CharacterAffiliations = () => {
  const navigate = useNavigate();
  const { accentPrimary } = useContext(ThemeContext);
  const { characterId } = useParams();

  const { data: character, isLoading: characterLoading } = useCharacterQuery(
    Number(characterId),
  );

  const { data: affiliations, isLoading: affiliationsLoading } =
    useAffiliationQueries(
      character?.affiliations.map((affiliation) => affiliation.id) || [],
    );

  const otherEntities = affiliations
    ?.flatMap((affiliation) => [
      ...(affiliation?.factions || []),
      ...(affiliation?.gangs || []),
      ...(affiliation?.characters || []),
    ])
    .filter((item) => item.id !== Number(characterId));

  const searchForm = useForm({
    defaultValues: {
      entity: '',
    },
    onSubmit: () => {
      searchForm.reset();
    },
  });

  const entity = useStore(searchForm.store, (state) => state.values.entity);

  const filteredAffiliations = entity
    ? affiliations?.filter(
        (affiliation) =>
          affiliation?.factions?.some(
            (faction: Faction) => faction.id === entity.id,
          ) ||
          affiliation?.characters?.some(
            (character: Character) => character.id === entity.id,
          ),
      )
    : affiliations;

  const isLoading = characterLoading || affiliationsLoading;

  if (isLoading) return <Loading />;

  return (
    <div className="flex w-full max-w-7xl flex-col items-center gap-8">
      <h1 className="text-center">{`${character?.firstName}'s Affiliations`}</h1>
      <ThemeContainer
        className={`ml-auto w-full`}
        chamfer="medium"
        borderColor={accentPrimary}
      >
        <form className="flex w-full flex-col gap-4 p-4">
          <div className="grid w-full items-center gap-4 max-sm:grid-flow-row sm:grid-flow-col sm:gap-8">
            <ArrowHeader3 title="Affiliation Options" />
            <BtnAuth onClick={() => navigate('create')}>
              Create Affiliation
            </BtnAuth>
          </div>
          <div className="flex w-full items-center gap-4">
            <searchForm.Field name="entity">
              {(field) => (
                <InputSelectField
                  field={field}
                  label="Select Entity"
                  options={otherEntities}
                />
              )}
            </searchForm.Field>
            <button
              className="text-accent bg-tertiary shadow-color group z-10 grid size-12 shrink-0 place-items-center rounded-md p-1.5 shadow-md hover:underline"
              onClick={(e) => {
                e.preventDefault();
                searchForm.reset();
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
      <Affiliations affiliations={filteredAffiliations} entity={character} />
    </div>
  );
};

export default CharacterAffiliations;
