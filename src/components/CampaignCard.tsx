import { useContext } from 'react';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import { LayoutContext } from '../contexts/LayoutContext';
import BtnRect from './buttons/BtnRect';
import { Link } from 'react-router-dom';
import { Campaign } from 'src/types/campaign';
import Icon from '@mdi/react';
import { mdiTriangleDown } from '@mdi/js';
import LocationIcon from './icons/LocationIcon';
import AccountPicture from './AccountPicture';
import { User } from 'src/types/user';

const CampaignCard = ({ campaign }: { campaign: Campaign }) => {
  const { accentPrimary } = useContext(ThemeContext);
  const { layoutSize } = useContext(LayoutContext);

  return (
    <ThemeContainer
      className="w-full rounded-br-5xl rounded-tl-5xl shadow-lg shadow-slate-950"
      chamfer="large"
      borderColor={accentPrimary}
    >
      <div
        className="bg-primary flex flex-col items-center gap-8 p-6 clip-8 md:flex-row"
        style={{
          backgroundImage: `url(${campaign.picture?.imageUrl})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="z-10 flex h-full w-full flex-col justify-between gap-4 md:gap-6">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-4">
              <Icon
                className="text-primary"
                path={mdiTriangleDown}
                size={0.5}
                rotate={-90}
              />
              <h2>{campaign.name}</h2>
              {campaign.pendingPlayers.length > 0 && <p>(Pending)</p>}
            </div>
            <div className="flex items-center gap-4">
              <LocationIcon className="text-accent size-8" />
              <h3 className="text-accent">{campaign.location}</h3>
            </div>
          </div>
          <div className="grid grid-cols-[1fr_1fr]">
            <div className="flex flex-col gap-4">
              <h3>Players</h3>
              {campaign.players.map((player: User) => (
                <div key={player.id} className="flex items-center gap-4">
                  <AccountPicture className="opacity-50" user={player} />{' '}
                  <p>{player.firstName + ' ' + player.lastName}</p>
                </div>
              ))}
              {campaign.pendingPlayers.map((player: User) => (
                <div key={player.id} className="flex items-center gap-4">
                  <AccountPicture className="opacity-50" user={player} />{' '}
                  <p className="opacity-50">
                    {player.firstName + ' ' + player.lastName}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex w-full flex-col items-end justify-between gap-8">
              <div className="flex flex-col items-end gap-4">
                <h3>Game Master</h3>
                <div className="flex items-center gap-4">
                  <AccountPicture user={campaign.owner} />
                  <p>
                    {campaign.owner.firstName + ' ' + campaign.owner.lastName}
                  </p>
                </div>
              </div>
              <Link
                className="ml-auto mt-auto self-end"
                to={`/glam/campaigns/${campaign.id}`}
              >
                <BtnRect>Campaign Info</BtnRect>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ThemeContainer>
  );
};

export default CampaignCard;
