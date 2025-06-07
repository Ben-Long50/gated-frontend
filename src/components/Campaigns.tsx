import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Loading from './Loading';
import CampaignCard from './CampaignCard';
import { Campaign } from 'src/types/campaign';
import useCampaignsQuery from '../hooks/useCampaignsQuery/useCampaignsQuery';
import BtnRect from './buttons/BtnRect';
import { Link, useSearchParams } from 'react-router-dom';
import { User } from 'src/types/user';
import { capitalCase } from 'change-case';

const Campaigns = () => {
  const { apiUrl, user } = useContext(AuthContext);
  const [searchParams] = useSearchParams();

  const campaignType = searchParams.get('campaignType') || 'all';

  const { data: campaigns, isLoading, isPending } = useCampaignsQuery(apiUrl);

  let campaignList;

  switch (campaignType) {
    case 'owner':
      campaignList = campaigns?.filter(
        (campaign: Campaign) => campaign.ownerId === user?.id,
      );
      break;
    case 'player':
      campaignList = campaigns?.filter((campaign: Campaign) =>
        campaign.players.some((player: User) => player.id === user?.id),
      );
      break;
    case 'pending':
      campaignList = campaigns?.filter((campaign: Campaign) =>
        campaign.pendingPlayers.some((player: User) => player.id === user?.id),
      );
      break;
    default:
      campaignList = campaigns || [];
      break;
  }

  if (isLoading || isPending) return <Loading />;

  if (!campaigns || campaignList.length === 0) {
    return (
      <div className="flex w-full max-w-5xl flex-col items-center gap-8">
        <h1>{capitalCase(campaignType) + ' Campaigns'}</h1>
        <h3 className="text-center">
          No campaigns found. If you want to be the game master of an upcoming
          campaign, head to the campaign creation page. Otherwise wait for
          another user to invite you to their own campaign.
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
      <h1>{capitalCase(campaignType) + ' Campaigns'}</h1>
      <div className="flex w-full flex-col gap-8">
        {campaignList.map((campaign: Campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </div>
  );
};

export default Campaigns;
