import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Loading from './Loading';
import CampaignCard from './CampaignCard';
import { Campaign } from 'src/types/campaign';
import useCampaignsQuery from '../hooks/useCampaignsQuery/useCampaignsQuery';
import BtnRect from './buttons/BtnRect';
import { Link } from 'react-router-dom';

const Campaigns = ({ title }: { title: string }) => {
  const { apiUrl } = useContext(AuthContext);
  const {
    data: campaigns,
    isLoading,
    isPending,
  } = useCampaignsQuery(apiUrl, title);

  if (isLoading || isPending) return <Loading />;

  if (campaigns.length === 0) {
    return (
      <div className="flex w-full max-w-5xl flex-col items-center gap-8">
        <h1>{title + ' Campaigns'}</h1>
        <h3 className="text-center">
          You have no {title.toLowerCase()} campaigns. If you want to be the
          game master of an upcoming campaign, head to the campaign creation
          page. Otherwise wait for another user to invite you to their own
          campaign.
        </h3>
        <Link to="/glam/campaigns/create">
          <BtnRect ariaLabel="navigate to create campaign" type="button">
            Create Campaign
          </BtnRect>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex w-full max-w-6xl flex-col items-center gap-6 sm:gap-8">
      <h1>{title + ' Campaigns'}</h1>
      <div className="flex w-full flex-col gap-8">
        {campaigns.map((campaign: Campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </div>
  );
};

export default Campaigns;
