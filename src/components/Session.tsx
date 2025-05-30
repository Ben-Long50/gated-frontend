import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Loading from './Loading';
import { Link, useParams } from 'react-router-dom';
import useSessionQuery from '../hooks/useSessionQuery/useSessionQuery';
import { format } from 'date-fns';
import { Character } from 'src/types/character';
import ArrowHeader3 from './ArrowHeader3';
import Divider from './Divider';
import useCampaignQuery from '../hooks/useCampaignQuery/useCampaignQuery';
import BtnRect from './buttons/BtnRect';
import { LayoutContext } from '../contexts/LayoutContext';

const Session = () => {
  const { apiUrl, user } = useContext(AuthContext);
  const { mobile } = useContext(LayoutContext);
  const { campaignId, sessionId } = useParams();

  const {
    data: session,
    isLoading: sessionLoading,
    isPending: sessionPending,
    isError,
  } = useSessionQuery(apiUrl, Number(campaignId), Number(sessionId));

  const {
    data: campaign,
    isLoading: campaignLoading,
    isPending: campaignPending,
  } = useCampaignQuery(apiUrl, Number(campaignId));

  const isLoading = sessionLoading || campaignLoading;
  const isPending = sessionPending || campaignPending;

  const sessionPlayerCharacters =
    session?.characters.filter((character) => character.playerCharacter) || [];

  const sessionNonPlayerCharacters =
    session?.characters.filter((character) => !character.playerCharacter) || [];

  if (isLoading || isPending) {
    return <Loading />;
  }

  if (isError) {
    throw new Error('Failed to find session');
  }

  return (
    <>
      {session.picture?.imageUrl && (
        <div className="absolute top-0 -z-10 mx-auto flex aspect-[10/3] min-h-[500px] max-w-9xl justify-center overflow-hidden">
          <img
            className="w-full object-cover object-center"
            src={`${session.picture?.imageUrl}`}
            alt="Session cover image"
            style={{
              objectPosition: session.picture?.position
                ? `${session.picture?.position.x}% ${session.picture?.position.y}%`
                : '50% 50%',
              maskImage: 'linear-gradient(black 0%, transparent 100%',
            }}
          />
        </div>
      )}
      <div className="flex w-full max-w-5xl flex-col gap-4">
        {mobile ? (
          <div className="flex w-full flex-col items-start justify-between gap-4">
            <div className="flex w-full items-start justify-between gap-8">
              <p className="whitespace-nowrap">
                {'Session ' + session.sessionNumber}
              </p>

              <p className="whitespace-nowrap">
                {format(session.createdAt, 'PP')}
              </p>
            </div>
            <h1 className="text-shadow text-center font-zen text-5xl text-shadow-x-2 text-shadow-y-2 text-shadow-black">
              {session.name}
            </h1>
          </div>
        ) : (
          <div className="flex w-full items-start justify-between gap-8">
            <p className="whitespace-nowrap">
              {'Session ' + session.sessionNumber}
            </p>
            <h1 className="text-shadow text-center font-zen text-5xl text-shadow-x-2 text-shadow-y-2 text-shadow-black">
              {session.name}
            </h1>
            <p className="whitespace-nowrap">
              {format(session.createdAt, 'PP')}
            </p>
          </div>
        )}
        <Divider />
        {sessionPlayerCharacters.length > 0 && (
          <>
            {sessionPlayerCharacters.map((character: Character) => (
              <div
                key={character.id}
                className="flex w-full items-center justify-between"
              >
                <Link to={`characters/${character.id}`}>
                  <div className="flex items-center gap-4">
                    <img
                      className="size-14 rounded-full shadow-md shadow-black"
                      src={character.picture.imageUrl}
                      alt={`${character.firstName} ${character.lastName}'s picture`}
                    />
                    <ArrowHeader3
                      title={character.firstName + ' ' + character.lastName}
                    />
                  </div>
                </Link>
                <Link
                  key={character.id}
                  to={`characters/${character.id}/notes`}
                >
                  <BtnRect ariaLabel="Navigate to notes" type="button">
                    Notes
                  </BtnRect>
                </Link>
              </div>
            ))}
            <Divider />
          </>
        )}
        <div
          id="quill-display"
          className="ql-editor whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: session.briefing.html }}
        />
        {campaign && campaign.ownerId === user.id && (
          <Link className="self-end" to={`update`}>
            <button className="text-accent hover:underline">
              Edit Session
            </button>
          </Link>
        )}
      </div>
    </>
  );
};

export default Session;
