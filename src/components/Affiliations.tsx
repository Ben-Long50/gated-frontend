import useActiveCharacterQuery from '../hooks/useActiveCharacterQuery/useActiveCharacterQuery';
import ArrowHeader2 from './ArrowHeader2';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Loading from './Loading';
import { Affiliation } from 'src/types/faction';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import ArrowHeader3 from './ArrowHeader3';
import AffiliationBar from './AffiliationBar';
import AffiliationCard from './AffiliationCard';

const Affiliations = () => {
  const { apiUrl } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);

  const {
    data: character,
    isLoading,
    isPending,
  } = useActiveCharacterQuery(apiUrl);

  console.log(character?.affiliations);

  const affiliations = character
    ? {
        factionAffiliations:
          character.affiliations.filter(
            (affiliation: Affiliation) => affiliation.factions.length > 0,
          ) || [],
        gangAffiliations: [],
        characterAffiliations:
          character.affiliations.filter(
            (affiliation: Affiliation) => affiliation.characters.length > 1,
          ) || [],
      }
    : null;

  if (isLoading || isPending) return <Loading />;

  return (
    <div className="flex w-full max-w-5xl flex-col items-start gap-8">
      <h1 className="w-full text-center">Affiliations</h1>
      {affiliations?.factionAffiliations.length > 0 && (
        <>
          <ArrowHeader2 title="Faction Affiliations" />
          {affiliations?.factionAffiliations.map((affiliation: Affiliation) => (
            <AffiliationCard
              key={affiliation.id}
              affiliation={affiliation}
              primaryEntity={character}
              entityType="faction"
            />
          ))}
        </>
      )}
      {affiliations?.gangAffiliations.length > 0 && (
        <ArrowHeader2 title="Gang Affiliations" />
      )}
      {affiliations?.characterAffiliations.length > 0 && (
        <>
          <ArrowHeader2 title="Character Affiliations" />
          {affiliations?.characterAffiliations.map(
            (affiliation: Affiliation) => (
              <AffiliationCard
                key={affiliation.id}
                affiliation={affiliation}
                primaryEntity={character}
                entityType="character"
              />
            ),
          )}
        </>
      )}
    </div>
  );
};

export default Affiliations;
