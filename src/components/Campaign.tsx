import { useContext, useState } from 'react';
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
import ArrowHeader3 from './ArrowHeader3';
import CoverPicture from './CoverPicture';
import { capitalCase } from 'change-case';
import { LayoutContext } from 'src/contexts/LayoutContext';
import useCharacterQueries from 'src/hooks/useCharactersQuery/useCharacterQueries';

const Campaign = () => {
  const { apiUrl, user } = useContext(AuthContext);
  const { mobile } = useContext(LayoutContext);
  const { campaignId } = useParams();
  const { accentPrimary } = useContext(ThemeContext);
  const [tab, setTab] = useState('sessions');

  const { data: campaign, isLoading: campaignLoading } = useCampaignQuery(
    apiUrl,
    Number(campaignId),
  );

  const {
    playerCharacters,
    nonPlayerCharacters,
    isLoading: charactersLoading,
  } = useCharacterQueries(
    campaign?.characters.map((character) => character.id) || [],
  );

  const joinCampaign = useJoinCampaignMutation(apiUrl, Number(campaignId));

  const pendingIds = campaign?.pendingPlayers.map((player: User) => player.id);

  const isLoading = campaignLoading || charactersLoading;

  if (isLoading) return <Loading />;

  if (!campaign) {
    throw new Error('Failed to find campaign');
  }

  return (
    <>
      {campaign.picture?.imageUrl && (
        <CoverPicture picture={campaign.picture}>
          {!mobile && (
            <div className="absolute right-6 top-6 flex flex-col items-center gap-4">
              <div className="relative">
                <AccountPicture key={campaign.owner.id} user={campaign.owner} />
                <Icon
                  path={mdiCrown}
                  className="absolute -right-2 -top-2 size-5 text-yellow-400"
                />
              </div>

              <Icon path={mdiCircle} className="text-secondary size-2" />
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
          )}
        </CoverPicture>
      )}
      <div className="flex w-full max-w-7xl flex-col items-center gap-8">
        <h1 className="w-full text-center font-zen text-4xl sm:text-5xl">
          {capitalCase(campaign.name)}
        </h1>
        <div className="flex w-full items-center justify-center gap-4">
          <LocationIcon className="text-accent size-8" />
          <h2 className="!text-accent text-left">{campaign.location}</h2>
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
                className="group-hover:text-accent dark:text-gray-900"
                size={1.15}
              />
            ) : (
              'Join Campaign'
            )}
          </BtnRect>
        )}
        {mobile && (
          <div className="flex items-center gap-4">
            <div className="relative">
              <AccountPicture key={campaign.owner.id} user={campaign.owner} />
              <Icon
                path={mdiCrown}
                className="absolute -right-2 -top-2 size-5 text-yellow-400"
              />
            </div>

            <Icon path={mdiCircle} className="text-secondary size-2" />
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
        )}
        <div className={`mt-14 flex w-full flex-col gap-4 sm:mt-28`}>
          <ThemeContainer borderColor={accentPrimary} chamfer="medium">
            <div className="flex flex-col gap-4 p-4 sm:p-8">
              <div className="grid grid-cols-2 gap-4">
                <BtnAuth
                  active={tab === 'sessions'}
                  onClick={() => setTab('sessions')}
                >
                  Sessions
                </BtnAuth>
                <BtnAuth
                  active={tab === 'factions'}
                  onClick={() => setTab('factions')}
                >
                  Factions
                </BtnAuth>
              </div>
              <Divider />
              {tab === 'sessions' && (
                <>
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
                </>
              )}
              {tab === 'factions' && (
                <>
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
                              className="shadow-color size-16 rounded-full object-cover shadow"
                              src={faction.picture?.imageUrl}
                              alt={faction.name + "'s picture"}
                            />
                          )}
                          <ArrowHeader3 title={faction.name} />
                        </div>
                      </BtnAuth>
                    </Link>
                  ))}
                </>
              )}
            </div>
          </ThemeContainer>
          <Divider className="col-span-2" />
          {[...playerCharacters, ...nonPlayerCharacters].length > 0 && (
            <>
              <div className="col-span-2 flex flex-col items-start gap-8">
                {playerCharacters?.length > 0 && (
                  <>
                    <ArrowHeader2 title="Player Characters" />
                    {playerCharacters?.map((character: Character, index) => (
                      <CharacterCard key={index} id={character.id} />
                    ))}
                  </>
                )}
                {nonPlayerCharacters?.length > 0 && (
                  <>
                    <ArrowHeader2 title="Non-player Characters" />
                    {nonPlayerCharacters?.map((character: Character, index) => (
                      <CharacterCard key={index} id={character.id} />
                    ))}
                  </>
                )}
              </div>
            </>
          )}
          {campaign.ownerId === user?.id && (
            <>
              <Divider />
              <Link className="col-start-2" to={`update`}>
                <BtnRect
                  className="w-full"
                  type="button"
                  ariaLabel="Update campaign"
                >
                  Update Campaign
                </BtnRect>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Campaign;
