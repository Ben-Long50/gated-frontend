import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import useOwnerCampaignsQuery from '../hooks/useOwnerCampaignsQuery/useOwnerCampaignsQuery';
import Loading from './Loading';
import CampaignCard from './CampaignCard';
import { Campaign } from 'src/types/campaign';

const Campaigns = ({ title }: { title: string }) => {
  const { apiUrl } = useContext(AuthContext);
  const {
    data: campaigns,
    isLoading,
    isPending,
  } = useOwnerCampaignsQuery(apiUrl);

  if (isLoading || isPending) return <Loading />;

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
