import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Loading from './Loading';
import useCampaignQuery from '../hooks/useCampaignQuery/useCampaignQuery';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';

const Campaign = () => {
  const { apiUrl } = useContext(AuthContext);
  const { campaignId } = useParams();
  const { accentPrimary } = useContext(ThemeContext);

  const {
    data: campaign,
    isLoading,
    isPending,
  } = useCampaignQuery(apiUrl, campaignId);
  console.log(campaign);

  if (isLoading || isPending) return <Loading />;

  return (
    <>
      <div className="absolute left-0 right-0 top-0 -z-10 flex aspect-[10/3] w-full items-center overflow-hidden">
        <img src={`${campaign.picture?.imageUrl}`} alt="Campaign cover image" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#1a1a1d] to-transparent" />
      </div>
      <ThemeContainer
        className="rounded-br-4xl rounded-tl-4xl shadow-lg shadow-slate-950"
        chamfer="16"
        borderColor={accentPrimary}
      >
        <div className="bg-primary px-12 py-3 clip-4">
          <h1>{campaign.name}</h1>
        </div>
      </ThemeContainer>
      {campaign.sessions.map((session) => (
        <div key={session.id}>
          <h2>{session.name}</h2>
        </div>
      ))}
    </>
  );
};

export default Campaign;
