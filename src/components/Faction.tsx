import { useContext, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Loading from './Loading';
import useFactionQuery from '../hooks/useFactionQuery/useFactionQuery';
import ArrowHeader2 from './ArrowHeader2';
import BtnRect from './buttons/BtnRect';
import Divider from './Divider';
import { Affiliation } from 'src/types/faction';
import BtnAuth from './buttons/BtnAuth';
import AffiliationCard from './AffiliationCard';
import CoverPicture from './CoverPicture';
import useAffiliationQueries from 'src/hooks/useAffiliationQueries/useAffiliationQueries';
import Campaign from './Campaign';

const Faction = () => {
  const { apiUrl, user } = useContext(AuthContext);
  const { factionId } = useParams();

  const {
    data: faction,
    isLoading: factionLoading,
    isPending,
  } = useFactionQuery(apiUrl, Number(factionId));

  const { data: affiliations, isLoading: affiliationsLoading } =
    useAffiliationQueries(
      faction?.affiliations.map((affiliation: Affiliation) => affiliation.id) ||
        [],
    );

  const backgroundRef = useRef<HTMLDivElement>(null);
  const affiliationRef = useRef<HTMLDivElement>(null);

  const sortedAffiliations = {
    factionAffiliations:
      affiliations?.filter(
        (affiliation: Affiliation) => affiliation?.factions.length > 1,
      ) || [],
    characterAffiliations:
      affiliations?.filter(
        (affiliation: Affiliation) => affiliation?.characters.length > 0,
      ) || [],
  };

  const isLoading = factionLoading || affiliationsLoading;

  if (isLoading || isPending) return <Loading />;

  return (
    <>
      {faction.picture?.imageUrl && <CoverPicture picture={faction.picture} />}
      <div className="flex w-full max-w-5xl flex-col gap-8">
        <div className="timing flex w-full items-center justify-between">
          <h1 className="w-full text-center font-zen text-4xl md:text-5xl">
            {faction.name}
          </h1>
        </div>
        <div className="grid grid-cols-2 gap-4 self-start">
          <BtnAuth
            className="px-8"
            onClick={() => {
              backgroundRef.current?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Background
          </BtnAuth>
          <BtnAuth
            className="px-8"
            onClick={() => {
              affiliationRef.current?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Affiliations
          </BtnAuth>
        </div>
        <Divider />
        {faction.background?.html && (
          <>
            <div
              ref={backgroundRef}
              id="quill-display"
              className="ql-editor whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: faction.background.html }}
            />
            <Divider />
          </>
        )}
        <div className="flex flex-col gap-8" ref={affiliationRef}>
          {sortedAffiliations?.factionAffiliations.length > 0 && (
            <>
              <ArrowHeader2 title="Faction Affiliations" />
              {sortedAffiliations?.factionAffiliations.map(
                (affiliation: Affiliation) => (
                  <AffiliationCard
                    key={affiliation.id}
                    affiliation={affiliation}
                  />
                ),
              )}
            </>
          )}
          {sortedAffiliations?.characterAffiliations.length > 0 && (
            <>
              <ArrowHeader2 title="Character Affiliations" />
              {sortedAffiliations?.characterAffiliations.map(
                (affiliation: Affiliation) => (
                  <AffiliationCard
                    key={affiliation.id}
                    affiliation={affiliation}
                  />
                ),
              )}
            </>
          )}
        </div>
        {user?.id === faction.campaign.ownerId && (
          <Link className="w-full" to={`update`}>
            <BtnRect
              ariaLabel="Update faction information"
              className="w-full sm:w-1/2 sm:justify-self-end"
              type="button"
            >
              Update faction info
            </BtnRect>
          </Link>
        )}
      </div>
    </>
  );
};

export default Faction;
