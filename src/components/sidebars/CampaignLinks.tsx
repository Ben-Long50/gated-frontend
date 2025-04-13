import LinkListSidebar from './LinkListSidebar';
import SubLinkSidebar from './SubLinkSidebar';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import CampaignIcon from '../icons/CampaignIcon';
import LinkSidebar from './LinkSidebar';
import DieIcon from '../icons/DieIcon';
import RollSimulator from '../RollSimulator';

const CampaignLinks = ({
  sidebarVisibility,
  setSidebarVisibility,
}: {
  sidebarVisibility: boolean;
  setSidebarVisibility: (mode: boolean) => void;
}) => {
  const { apiUrl } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen((prev) => !prev);
  };

  return (
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
        icon={<DieIcon className="bg-secondary z-10 size-12 shrink-0 p-1" />}
        path="campaigns/rollSimulator"
        sidebarVisibility={sidebarVisibility}
        setSidebarVisibility={setSidebarVisibility}
      />
    </>
  );
};

export default CampaignLinks;
