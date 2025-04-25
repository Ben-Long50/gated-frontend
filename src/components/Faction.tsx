import { useContext, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Loading from './Loading';
import useFactionQuery from '../hooks/useFactionQuery/useFactionQuery';
import AffiliationBar from './AffiliationBar';
import ArrowHeader2 from './ArrowHeader2';
import NoblebloodIcon from './icons/NoblebloodIcon';
import FederalIcon from './icons/FederalIcon';
import BtnRect from './buttons/BtnRect';
import Divider from './Divider';
import { ThemeContext } from '../contexts/ThemeContext';
import { Affiliation } from 'src/types/faction';
import BtnAuth from './buttons/BtnAuth';
import AffiliationCard from './AffiliationCard';

const Faction = () => {
  const { apiUrl } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);
  const { factionId } = useParams();

  const {
    data: faction,
    isLoading,
    isPending,
  } = useFactionQuery(apiUrl, Number(factionId));

  const backgroundRef = useRef<HTMLDivElement>(null);
  const affiliationRef = useRef<HTMLDivElement>(null);

  const affiliations = faction
    ? {
        factionAffiliations:
          faction.affiliations.filter(
            (affiliation: Affiliation) => affiliation.factions.length > 1,
          ) || [],
        characterAffiliations:
          faction.affiliations.filter(
            (affiliation: Affiliation) => affiliation.characters.length > 0,
          ) || [],
      }
    : null;

  if (isLoading || isPending) return <Loading />;

  return (
    <>
      {faction.picture?.imageUrl && (
        <div className="absolute top-0 -z-10 mx-auto flex aspect-[10/3] min-h-[500px] max-w-9xl justify-center overflow-hidden">
          <img
            className="w-full object-cover object-center"
            src={`${faction.picture?.imageUrl}`}
            alt="Faction cover image"
          />
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#141417] to-transparent" />
        </div>
      )}
      <div className="flex w-full max-w-5xl flex-col gap-8">
        <div className="timing flex w-full items-center justify-between">
          <h1 className="text-shadow w-full text-center font-zen text-5xl text-shadow-blur-0 text-shadow-x-2 text-shadow-y-2 text-shadow-black">
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
          {affiliations?.factionAffiliations.length > 0 && (
            <>
              <ArrowHeader2 title="Faction Affiliations" />
              {affiliations?.factionAffiliations.map(
                (affiliation: Affiliation) => (
                  <AffiliationCard
                    key={affiliation.id}
                    affiliation={affiliation}
                    entityType="faction"
                    primaryEntity={faction}
                  />
                ),
              )}
            </>
          )}
          {affiliations?.characterAffiliations.length > 0 && (
            <>
              <ArrowHeader2 title="Character Affiliations" />
              {affiliations?.characterAffiliations.map(
                (affiliation: Affiliation) => (
                  <AffiliationCard
                    key={affiliation.id}
                    affiliation={affiliation}
                    entityType="character"
                    primaryEntity={faction}
                    path="affiliations"
                  />
                ),
              )}
            </>
          )}
        </div>

        <Link className="w-full" to={`update`}>
          <BtnRect
            ariaLabel="Update faction information"
            className="w-full sm:w-1/2 sm:justify-self-end"
            type="button"
          >
            Update faction info
          </BtnRect>
        </Link>
      </div>
    </>
  );
};

export default Faction;
