import { useContext } from 'react';
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
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import ArrowHeader3 from './ArrowHeader3';
import { Affiliation } from 'src/types/faction';

const Faction = () => {
  const { apiUrl } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);
  const { factionId } = useParams();

  const {
    data: faction,
    isLoading,
    isPending,
  } = useFactionQuery(apiUrl, factionId);

  const affiliations = faction
    ? {
        factionAffiliations:
          faction.primaryAffiliations.filter(
            (affiliation: Affiliation) => affiliation.secondaryFaction,
          ) || [],
        characterAffiliations:
          faction.primaryAffiliations.filter(
            (affiliation: Affiliation) => affiliation.secondaryCharacter,
          ) || [],
      }
    : null;

  console.log(affiliations);

  if (isLoading || isPending) return <Loading />;

  return (
    <>
      <div className="absolute left-0 right-0 top-0 -z-10 mx-auto flex aspect-[10/3] w-full max-w-9xl items-center overflow-hidden">
        <img src={`${faction.picture?.imageUrl}`} alt="Faction cover image" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#141417] to-transparent" />
      </div>

      <div className="flex w-full max-w-5xl flex-col gap-8">
        <div className="timing flex w-full items-center justify-between">
          <div className="flex w-full items-center justify-center gap-8">
            {faction.factionType === 'federalReservists' && (
              <FederalIcon className="text-secondary size-14" />
            )}
            {faction.factionType === 'noblebloods' && (
              <NoblebloodIcon className="text-secondary size-14" />
            )}
            <h1>{faction.name}</h1>
          </div>
        </div>
        <Divider />
        {faction.background?.html && (
          <>
            <div
              id="quill-display"
              className="ql-editor whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: faction.background.html }}
            />
            <Divider />
          </>
        )}
        {affiliations?.factionAffiliations.length > 0 && (
          <>
            <ArrowHeader2 title="Faction Affiliations" />
            {affiliations?.factionAffiliations.map(
              (affiliation: Affiliation) => (
                <ThemeContainer
                  borderColor={accentPrimary}
                  chamfer="medium"
                  key={affiliation.id}
                >
                  <div className="bg-secondary flex w-full flex-col items-start gap-4 p-4 clip-6">
                    <ArrowHeader3 title={affiliation.secondaryFaction?.name} />
                    <AffiliationBar
                      className="px-4"
                      value={affiliation.value}
                    />
                  </div>
                </ThemeContainer>
              ),
            )}
          </>
        )}
        {affiliations?.characterAffiliations.length > 0 && (
          <>
            <ArrowHeader2 title="Character Affiliations" />
            {affiliations?.characterAffiliations.map(
              (affiliation: Affiliation) => (
                <ThemeContainer
                  borderColor={accentPrimary}
                  chamfer="medium"
                  key={affiliation.id}
                >
                  <div className="bg-secondary flex w-full flex-col items-start gap-4 p-4 clip-6">
                    <ArrowHeader3
                      title={
                        affiliation.secondaryCharacter?.firstName +
                        affiliation.secondaryCharacter?.lastName
                      }
                    />
                    <AffiliationBar
                      className="px-4"
                      value={affiliation.value}
                    />
                  </div>
                </ThemeContainer>
              ),
            )}
          </>
        )}
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
