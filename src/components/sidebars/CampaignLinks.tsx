import LinkListSidebar from './LinkListSidebar';
import SubLinkSidebar from './SubLinkSidebar';
import { useContext, useState } from 'react';
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

const CampaignLinks = ({
  sidebarVisibility,
  setSidebarVisibility,
}: {
  sidebarVisibility: boolean;
  setSidebarVisibility: (mode: boolean) => void;
}) => {
  const { apiUrl, user } = useContext(AuthContext);
  const { campaignId } = useParams();
  const [modalOpen, setModalOpen] = useState(false);

  const {
    data: campaign,
    isLoading,
    isPending,
  } = useCampaignQuery(apiUrl, Number(campaignId));

  const toggleModal = () => {
    setModalOpen((prev) => !prev);
  };

  if (isLoading || isPending) return <Loading />;

  return (
    <>
      {!campaignId && (
        <>
          <LinkListSidebar
            sidebarVisibility={sidebarVisibility}
            icon={
              <CampaignIcon className="bg-secondary z-10 size-12 shrink-0 p-2" />
            }
            title="Campaigns"
          >
            <SubLinkSidebar
              title="Player campaigns"
              path={`campaigns/player`}
              setSidebarVisibility={setSidebarVisibility}
            />
            <SubLinkSidebar
              title="Pending campaigns"
              path={`campaigns/pending`}
              setSidebarVisibility={setSidebarVisibility}
            />
            <SubLinkSidebar
              title="Owner campaigns"
              path={`campaigns/owner`}
              setSidebarVisibility={setSidebarVisibility}
            />
            <SubLinkSidebar
              title="Create campaign"
              path={`campaigns/create`}
              setSidebarVisibility={setSidebarVisibility}
            />
          </LinkListSidebar>
          <LinkSidebar
            title="Roll Simulator"
            icon={
              <DieIcon className="bg-secondary z-10 size-12 shrink-0 p-1" />
            }
            path="campaigns/rollSimulator"
            sidebarVisibility={sidebarVisibility}
            setSidebarVisibility={setSidebarVisibility}
          />
        </>
      )}
      {campaignId && (
        <>
          <LinkSidebar
            title={campaign?.name}
            icon={
              <img
                className="bg-secondary z-10 size-12 shrink-0 rounded-full object-cover p-1"
                src={campaign?.picture.imageUrl}
                alt={campaign?.name + ' ' + "'s cover picture"}
              />
            }
            path={`/glam/campaigns/${campaign?.id}`}
            sidebarVisibility={sidebarVisibility}
            setSidebarVisibility={setSidebarVisibility}
          />
          <LinkListSidebar
            sidebarVisibility={sidebarVisibility}
            icon={
              <SessionIcon className="bg-secondary z-10 size-12 shrink-0 p-2" />
            }
            title="Sessions"
          >
            {campaign?.sessions.map((session: Session) => (
              <SubLinkSidebar
                key={session.id}
                title={`${session.sessionNumber} — ${session.name}`}
                path={`campaigns/${campaignId}/sessions/${session.id}`}
                setSidebarVisibility={setSidebarVisibility}
              />
            ))}
            {campaign?.ownerId === user.id && (
              <SubLinkSidebar
                title={`Create a new session`}
                path={`campaigns/${campaignId}/sessions/create`}
                setSidebarVisibility={setSidebarVisibility}
              />
            )}
          </LinkListSidebar>
          <LinkListSidebar
            sidebarVisibility={sidebarVisibility}
            icon={
              <CharacterIcon className="bg-secondary z-10 size-12 shrink-0 p-2" />
            }
            title="Campaign Characters"
          >
            <SubLinkSidebar
              title="Player Characters"
              path={`campaigns/${campaignId}/characters?list=playerCharacters`}
              setSidebarVisibility={setSidebarVisibility}
            />
            <SubLinkSidebar
              title="Non-player Characters"
              path={`campaigns/${campaignId}/characters?list=nonPlayerCharacters`}
              setSidebarVisibility={setSidebarVisibility}
            />
          </LinkListSidebar>
          <LinkSidebar
            title="Roll Simulator"
            icon={
              <DieIcon className="bg-secondary z-10 size-12 shrink-0 p-1" />
            }
            path={`campaigns/${campaignId}/rollSimulator`}
            sidebarVisibility={sidebarVisibility}
            setSidebarVisibility={setSidebarVisibility}
          />
        </>
      )}
    </>
  );
};

export default CampaignLinks;
