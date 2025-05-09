import { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Loading from './Loading';
import useCampaignQuery from '../hooks/useCampaignQuery/useCampaignQuery';
import { ThemeContext } from '../contexts/ThemeContext';
import Icon from '@mdi/react';
import { mdiCircle, mdiCrown } from '@mdi/js';
import { format } from 'date-fns';
import LocationIcon from './icons/LocationIcon';
import { Session } from 'src/types/campaign';
import { User } from 'src/types/user';
import ArrowHeader2 from './ArrowHeader2';
import { Character } from 'src/types/character';
import CharacterCard from './CharacterCard';
import Divider from './Divider';
import BtnAuth from './buttons/BtnAuth';
import AccountPicture from './AccountPicture';
import ThemeContainer from './ThemeContainer';
import { Faction } from 'src/types/faction';
import BtnRect from './buttons/BtnRect';
import useJoinCampaignMutation from '../hooks/useJoinCampaignMutation/useJoinCampaignMutation';
import { LayoutContext } from '../contexts/LayoutContext';
import ArrowHeader3 from './ArrowHeader3';

const Campaign = () => {
  const { apiUrl, user } = useContext(AuthContext);
  const { mobile } = useContext(LayoutContext);
  const { campaignId } = useParams();
  const { accentPrimary } = useContext(ThemeContext);

  const {
    data: campaign,
    isLoading,
    isPending,
    isError,
  } = useCampaignQuery(apiUrl, Number(campaignId));

  const playerCharacters =
    campaign?.characters.filter(
      (character: Character) => character.playerCharacter === true,
    ) || [];

  const nonPlayerCharacters =
    campaign?.characters.filter(
      (character: Character) => character.playerCharacter === false,
    ) || [];

  const joinCampaign = useJoinCampaignMutation(apiUrl, Number(campaignId));

  const pendingIds = campaign?.pendingPlayers.map((player: User) => player.id);

  if (isLoading || isPending) return <Loading />;

  if (isError) {
    throw new Error('Failed to load campaign info');
  }

  return (
    <>
      <div className="absolute top-0 -z-10 mx-auto flex aspect-[10/3] min-h-[500px] max-w-9xl justify-center overflow-hidden">
        <img
          className="w-full object-cover object-center"
          src={`${campaign.picture?.imageUrl}`}
          alt="Campaign cover image"
        />
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
        <h1 className="text-shadow text-center font-zen text-5xl text-shadow-x-2 text-shadow-y-2 text-shadow-black">
          {campaign.name}
        </h1>
        <div className="flex items-center gap-4">
          <LocationIcon className="text-accent size-8" />
          <h2 className="text-accent text-shadow text-shadow-x-2 text-shadow-y-2 text-shadow-zinc-950">
            {campaign.location}
          </h2>
        </div>
        {pendingIds?.includes(user?.id) && (
          <BtnRect
            type="button"
            ariaLabel="Join campaign"
            onClick={(e) => {
              e.preventDefault();
              joinCampaign.mutate();
            }}
          >
            {joinCampaign.isPending ? (
              <Loading
                className="group-hover:text-yellow-300 dark:text-gray-900"
                size={1.15}
              />
            ) : (
              'Join Campaign'
            )}
          </BtnRect>
        )}
        <div
          className={`${mobile ? 'flex flex-col gap-4' : 'mt-40 grid grid-cols-2 gap-8'} w-full`}
        >
          <ThemeContainer borderColor={accentPrimary} chamfer="medium">
            <div className="flex flex-col gap-4 p-4">
              <ArrowHeader2 title="Sessions" />
              {campaign.sessions.map((session: Session) => (
                <Link
                  className="w-full"
                  key={session.id}
                  to={`sessions/${session.id}`}
                >
                  <BtnAuth className="timing flex w-full items-center justify-between gap-4 !p-4 !px-6">
                    <ArrowHeader3 title={session.name} />
                    <p className="text-right">
                      {format(session.createdAt, 'PP')}
                    </p>
                  </BtnAuth>
                </Link>
              ))}
            </div>
          </ThemeContainer>
          <ThemeContainer borderColor={accentPrimary} chamfer="medium">
            <div className="flex flex-col gap-4 p-4">
              <ArrowHeader2 title="Factions" />
              {campaign.factions.map((faction: Faction) => (
                <Link
                  className="w-full"
                  key={faction.id}
                  to={`factions/${faction.id}`}
                >
                  <BtnAuth className="timing flex w-full items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      {faction.picture?.imageUrl && (
                        <img
                          className="size-16 rounded-full object-cover shadow shadow-black"
                          src={faction.picture?.imageUrl}
                          alt={faction.name + "'s picture"}
                        />
                      )}
                      <ArrowHeader2 title={faction.name} />
                    </div>
                  </BtnAuth>
                </Link>
              ))}
            </div>
          </ThemeContainer>

          <Divider className="col-span-2" />
          <div className="col-span-2 flex flex-col items-start gap-8">
            {playerCharacters.length > 0 && (
              <>
                <ArrowHeader2 title="Player Characters" />
                {playerCharacters.map((character: Character) => (
                  <CharacterCard
                    key={character.id}
                    character={character}
                    path={`characters`}
                  />
                ))}
              </>
            )}
            {playerCharacters.length > 0 && (
              <>
                <ArrowHeader2 title="Non-player Characters" />
                {nonPlayerCharacters.map((character: Character) => (
                  <CharacterCard
                    key={character.id}
                    character={character}
                    path={`characters`}
                  />
                ))}
              </>
            )}
          </div>
          <Link className="col-start-2" to={`update`}>
            <BtnRect
              className="w-full"
              type="button"
              ariaLabel="Update campaign"
            >
              Update Campaign
            </BtnRect>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Campaign;
