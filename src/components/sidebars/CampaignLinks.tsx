import LinkListSidebar from './LinkListSidebar';
import SubLinkSidebar from './SubLinkSidebar';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import CampaignIcon from '../icons/CampaignIcon';
import LinkSidebar from './LinkSidebar';
import DieIcon from '../icons/DieIcon';
import { useParams } from 'react-router-dom';
import CharacterIcon from '../icons/CharacterIcon';
import useCampaignQuery from '../../hooks/useCampaignQuery/useCampaignQuery';
import Loading from '../Loading';
import { Session } from 'src/types/campaign';
import SessionIcon from '../icons/SessionIcon';
import AffiliationIcon from '../icons/AffiliationIcon';
import NoteIcon from '../icons/NoteIcon';
import useCampaignCharactersQuery from 'src/hooks/useCampaignCharactersQuery/useCampaignCharactersQuery';

const CampaignLinks = () => {
  const { apiUrl, user } = useContext(AuthContext);
  const { campaignId } = useParams();

  const { data: campaign, isLoading: campaignLoading } = useCampaignQuery(
    apiUrl,
    Number(campaignId),
  );

  const { playerCharacters, isLoading: charactersLoading } =
    useCampaignCharactersQuery(
      campaign?.characters.map((character) => character.id) || [],
    );

  return (
    <>
      {!campaignId ? (
        <>
          <LinkListSidebar
            icon={
              <CampaignIcon className="timing group-hover:text-accent bg-secondary z-10 size-12 shrink-0 p-2 text-inherit" />
            }
            title="Campaigns"
          >
            <SubLinkSidebar
              title="Player campaigns"
              path={`campaigns?campaignType=player`}
            />
            <SubLinkSidebar
              title="Pending campaigns"
              path={`campaigns?campaignType=pending`}
            />
            <SubLinkSidebar
              title="Owner campaigns"
              path={`campaigns?campaignType=owner`}
            />
            <SubLinkSidebar title="Create campaign" path={`campaigns/create`} />
          </LinkListSidebar>
          <LinkSidebar
            title="Roll Simulator"
            icon={
              <DieIcon className="timing group-hover:text-accent bg-secondary z-10 size-12 shrink-0 p-2 text-inherit" />
            }
            path="campaigns/rollSimulator"
          />
        </>
      ) : (
        <>
          <LinkSidebar
            title={campaign?.name}
            icon={
              campaignLoading ? (
                <Loading size={2} className="text-secondary size-12 p-1" />
              ) : (
                <img
                  className="bg-secondary z-10 size-12 shrink-0 rounded-full object-cover p-1"
                  src={campaign?.picture.imageUrl}
                  alt={campaign?.name + ' ' + "'s cover picture"}
                />
              )
            }
            path={`/glam/campaigns/${campaign?.id}`}
          />
          <LinkListSidebar
            icon={
              <SessionIcon className="timing group-hover:text-accent bg-secondary z-10 size-12 shrink-0 p-2 text-inherit" />
            }
            title="Sessions"
          >
            {campaign?.sessions.map((session: Session) => (
              <SubLinkSidebar
                key={session.id}
                title={`${session.sessionNumber} — ${session.name}`}
                path={`campaigns/${campaignId}/sessions/${session.id}`}
              />
            ))}
            {campaign?.ownerId === user.id && (
              <SubLinkSidebar
                title={`Create a new session`}
                path={`campaigns/${campaignId}/sessions/create`}
              />
            )}
          </LinkListSidebar>
          <LinkListSidebar
            icon={
              <CharacterIcon className="timing group-hover:text-accent bg-secondary z-10 size-12 shrink-0 p-2 text-inherit" />
            }
            title="Campaign Characters"
          >
            <SubLinkSidebar
              title="Player Characters"
              path={`campaigns/${campaignId}/characters?list=playerCharacters`}
            />
            <SubLinkSidebar
              title="Non-player Characters"
              path={`campaigns/${campaignId}/characters?list=nonPlayerCharacters`}
            />
          </LinkListSidebar>
          <LinkListSidebar
            icon={
              <NoteIcon className="timing group-hover:text-accent bg-secondary z-10 size-12 shrink-0 p-2 text-inherit" />
            }
            title="Notes"
          >
            {playerCharacters.map((character) => (
              <SubLinkSidebar
                title={`${character?.firstName}'s Notes`}
                path={`campaigns/${campaignId}/characters/${character.id}/notes`}
              />
            ))}
          </LinkListSidebar>
          <LinkSidebar
            title="Affiliations"
            icon={
              <AffiliationIcon className="timing group-hover:text-accent bg-secondary z-10 size-12 shrink-0 p-2 text-inherit" />
            }
            path={`campaigns/${campaignId}/affiliations`}
          />
          <LinkSidebar
            title="Roll Simulator"
            icon={
              <DieIcon className="timing group-hover:text-accent bg-secondary z-10 size-12 shrink-0 p-2 text-inherit" />
            }
            path={`campaigns/${campaignId}/rollSimulator`}
          />
        </>
      )}
    </>
  );
};

export default CampaignLinks;
