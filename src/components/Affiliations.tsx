import ArrowHeader2 from './ArrowHeader2';
import { Affiliation, Faction } from 'src/types/faction';
import AffiliationCard from './AffiliationCard';
import { Character } from 'src/types/character';

const Affiliations = ({
  affiliations,
  entity,
}: {
  affiliations: Affiliation[];
  entity: Faction | Character;
}) => {
  const sortedAffiliations = {
    factionAffiliations:
      affiliations?.filter(
        (affiliation: Affiliation) => affiliation?.factions.length > 0,
      ) || [],
    gangAffiliations: [],
    characterAffiliations:
      affiliations?.filter(
        (affiliation: Affiliation) => affiliation?.characters.length > 1,
      ) || [],
  };

  const entityName = entity.firstName
    ? entity.firstName + ' ' + entity.lastName
    : entity.name;

  if (affiliations.length === 0) {
    return (
      <div className="flex max-w-4xl flex-col items-center gap-8">
        <h3 className="text-center">
          {`${entityName} does not have any affiliations. Get to work and make some friends... or enemies.`}
        </h3>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-start gap-8">
      {sortedAffiliations?.factionAffiliations.length > 0 && (
        <>
          <ArrowHeader2 title="Faction Affiliations" />
          {sortedAffiliations?.factionAffiliations.map(
            (affiliation: Affiliation) => (
              <AffiliationCard key={affiliation.id} affiliation={affiliation} />
            ),
          )}
        </>
      )}
      {sortedAffiliations?.gangAffiliations.length > 0 && (
        <ArrowHeader2 title="Gang Affiliations" />
      )}
      {sortedAffiliations?.characterAffiliations.length > 0 && (
        <>
          <ArrowHeader2 title="Character Affiliations" />
          {sortedAffiliations?.characterAffiliations.map(
            (affiliation: Affiliation) => (
              <AffiliationCard key={affiliation.id} affiliation={affiliation} />
            ),
          )}
        </>
      )}
    </div>
  );
};

export default Affiliations;
