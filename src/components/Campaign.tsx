import { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Loading from './Loading';
import useCampaignQuery from '../hooks/useCampaignQuery/useCampaignQuery';
import { ThemeContext } from '../contexts/ThemeContext';
import Icon from '@mdi/react';
import { mdiCircle, mdiCrown, mdiTriangleDown } from '@mdi/js';
import ItemCardSmall from './ItemCardSmall';
import { format } from 'date-fns';
import LocationIcon from './icons/LocationIcon';
import { Session } from 'src/types/campaign';
import { User } from 'src/types/user';
import ArrowHeader2 from './ArrowHeader2';
import { Character } from 'src/types/character';
import CharacterCard from './CharacterCard';
import Divider from './Divider';
import NoblebloodIcon from './icons/NoblebloodIcon';
import FederalIcon from './icons/FederalIcon';
import ChurchIcon from './icons/ChurchIcon';
import BtnAuth from './buttons/BtnAuth';
import AccountPicture from './AccountPicture';
import ThemeContainer from './ThemeContainer';

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
      <div className="absolute left-0 right-0 top-0 -z-10 mx-auto flex aspect-[10/3] w-full max-w-9xl items-center overflow-hidden">
        <img src={`${campaign.picture?.imageUrl}`} alt="Campaign cover image" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#141417] to-transparent" />
        <div className="absolute right-6 top-6 flex flex-col items-center gap-4">
          <div className="relative">
            <img
              className="size-10 shrink-0 rounded-full"
              src={`${campaign.owner.profilePicture}`}
              alt="Owner"
            />
            <Icon
              path={mdiCrown}
              className="text-accent absolute -right-2 -top-2 size-5"
            />
          </div>

          <Icon path={mdiCircle} className="text-tertiary size-2" />
          {campaign.players.map((player: User) => (
            <AccountPicture key={player.id} user={player} />
          ))}
          {campaign.pendingPlayers.map((player: User) => (
            <AccountPicture
              key={player.id}
              className="opacity-50"
              user={player}
            />
          ))}
        </div>
      </div>
      <div className="flex w-full max-w-7xl flex-col items-center gap-8">
        <h1 className="text-shadow-sm text-center font-zen text-6xl font-normal text-shadow-x-xs text-shadow-y-xs text-shadow-zinc-950">
          {campaign.name}
        </h1>
        <div className="flex items-center gap-4">
          <LocationIcon className="text-accent size-8" />
          <h2 className="text-accent text-shadow-sm text-shadow-x-xs text-shadow-y-xs text-shadow-zinc-950">
            {campaign.location}
          </h2>
        </div>
        <div className="mt-40 grid w-full grid-cols-2 gap-8">
          <ThemeContainer borderColor={accentPrimary} chamfer="medium">
            <div className="bg-primary flex flex-col gap-4 p-4 clip-6">
              <ArrowHeader2 title="Sessions" />
              {campaign.sessions.map((session: Session) => (
                <Link
                  className="w-full"
                  key={session.id}
                  to={`sessions/${session.id}`}
                >
                  <ItemCardSmall
                    className="hover:bg-tertiary timing pointer-events-none"
                    heading={
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center gap-4">
                          <h3>{session.sessionNumber}</h3>
                          <Icon
                            path={mdiTriangleDown}
                            className="text-secondary size-2"
                            rotate={-90}
                          />
                          <h3>{session.name}</h3>
                        </div>

                        <p>{format(session.createdAt, 'PP')}</p>
                      </div>
                    }
                  />
                </Link>
              ))}
            </div>
          </ThemeContainer>
          <ThemeContainer borderColor={accentPrimary} chamfer="medium">
            <div className="bg-primary flex flex-col gap-4 p-4 clip-6">
              <ArrowHeader2 title="Factions" />
              {campaign.factions.map((faction: Faction) => (
                <Link
                  className="w-full"
                  key={faction.id}
                  to={`factions/${faction.id}`}
                >
                  <BtnAuth className="timing flex w-full items-center justify-between">
                    <div className="flex items-center gap-4 p-2">
                      {faction.factionType === 'federalReservists' && (
                        <FederalIcon className="text-secondary size-16" />
                      )}
                      {faction.factionType === 'noblebloods' && (
                        <NoblebloodIcon className="text-secondary size-16" />
                      )}
                      <ArrowHeader2 title={faction.name} />
                    </div>
                  </BtnAuth>
                </Link>
              ))}
            </div>
          </ThemeContainer>

          <Divider className="col-span-2" />
          <div className="col-span-2 flex flex-col items-start gap-4">
            <ArrowHeader2 title="Player Characters" />
            {campaign.characters.map((character: Character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Campaign;
