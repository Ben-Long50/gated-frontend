import LinkListSidebar from './LinkListSidebar';
import LinkSidebar from './LinkSidebar';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import CharacterIcon from '../icons/CharacterIcon';

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
        icon={<CharacterIcon className="size-8 shrink-0" />}
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
