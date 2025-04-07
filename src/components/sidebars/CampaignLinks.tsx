import LinkListSidebar from './LinkListSidebar';
import LinkSidebar from './LinkSidebar';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import CampaignIcon from '../icons/CampaignIcon';

const CampaignLinks = ({
  sidebarVisibility,
  setSidebarVisibility,
}: {
  sidebarVisibility: boolean;
  setSidebarVisibility: (mode: boolean) => void;
}) => {
  const { apiUrl } = useContext(AuthContext);

  return (
    <>
      <LinkListSidebar
        sidebarVisibility={sidebarVisibility}
        icon={
          <CampaignIcon className="bg-secondary z-10 size-12 shrink-0 p-2" />
        }
        title="Campaigns"
      >
        <LinkSidebar
          title="Player campaigns"
          path={`campaigns/player`}
          setSidebarVisibility={setSidebarVisibility}
        />
        <LinkSidebar
          title="Owner campaigns"
          path={`campaigns/owner`}
          setSidebarVisibility={setSidebarVisibility}
        />
        <LinkSidebar
          title="Create campaign"
          path={`campaigns/create`}
          setSidebarVisibility={setSidebarVisibility}
        />
      </LinkListSidebar>
    </>
  );
};

export default CampaignLinks;
