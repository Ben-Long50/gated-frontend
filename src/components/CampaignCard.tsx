import { useContext } from 'react';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import BtnRect from './buttons/BtnRect';
import { Link } from 'react-router-dom';
import { Campaign } from 'src/types/campaign';
import LocationIcon from './icons/LocationIcon';
import AccountPicture from './AccountPicture';
import { User } from 'src/types/user';
import ArrowHeader2 from './ArrowHeader2';

const CampaignCard = ({ campaign }: { campaign: Campaign }) => {
  const { accentPrimary } = useContext(ThemeContext);

  return (
    <ThemeContainer
      className="w-full"
      chamfer="large"
      borderColor={accentPrimary}
      bgImageUrl={campaign.picture}
      overflowHidden={true}
    >
      <div className="flex flex-col items-center gap-8 p-6 md:flex-row">
        <div className="absolute inset-0 bg-white bg-opacity-70 dark:bg-black dark:opacity-80" />
        <div className="z-10 flex h-full w-full flex-col justify-between gap-4 md:gap-6">
          <div className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-4">
              <ArrowHeader2 className="text-left" title={campaign.name} />
              {campaign.pendingPlayers.length > 0 && <p>(Pending)</p>}
            </div>
            <div className="flex items-center gap-4">
              <LocationIcon className="text-accent size-6 shrink-0 sm:size-8" />
              <h3 className="!text-accent text-right">{campaign.location}</h3>
            </div>
          </div>
          <div className="grid grid-cols-[1fr_1fr]">
            <div className="flex flex-col gap-4">
              <h3>Players</h3>
              {campaign.players.map((player: User) => (
                <div key={player.id} className="flex items-center gap-4">
                  <AccountPicture user={player} />
                  <p className="font-semibold">{player.username}</p>
                </div>
              ))}
              {campaign.pendingPlayers.map((player: User) => (
                <div key={player.id} className="flex items-center gap-4">
                  <AccountPicture className="opacity-50" user={player} />
                  <p className="font-semibold opacity-50">{player.username}</p>
                </div>
              ))}
            </div>
            <div className="flex w-full flex-col items-end justify-between gap-8">
              <div className="flex flex-col items-end gap-4">
                <h3>Game Master</h3>
                <div className="flex items-center gap-4">
                  <AccountPicture user={campaign.owner} />
                  <p className="font-semibold">{campaign.owner.username}</p>
                </div>
              </div>
              <Link
                className="ml-auto mt-auto self-end"
                to={`/glam/campaigns/${campaign.id}`}
              >
                <BtnRect
                  ariaLabel="navigate to campaign information"
                  type="button"
                >
                  Campaign Info
                </BtnRect>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ThemeContainer>
  );
};

export default CampaignCard;
