import LinkListSidebar from './LinkListSidebar';
import LinkSidebar from './LinkSidebar';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import CharacterIcon from '../icons/CharacterIcon';

const CampaignLinks = ({ setSidebarVisibility }) => {
  const { apiUrl } = useContext(AuthContext);

  return (
    <>
      <LinkListSidebar
        title={
          <>
            <CharacterIcon className="size-8" />
            <p className="text-inherit">Campaigns</p>
          </>
        }
      >
        <LinkSidebar
          title="Participant campaigns"
          path={`campaigns/participant`}
          setSidebarVisibility={setSidebarVisibility}
        />
        <LinkSidebar
          title="GM campaigns"
          path={`campaigns/gm`}
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
