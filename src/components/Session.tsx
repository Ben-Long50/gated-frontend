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
import CoverPicture from './CoverPicture';
import { capitalCase } from 'change-case';
import CharacterPictureRound from './CharacterPictureRound';

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

  if (isLoading || isPending) {
    return <Loading />;
  }

  if (isError) {
    throw new Error('Failed to find session');
  }

  return (
    <>
      {session.picture?.imageUrl && <CoverPicture picture={session.picture} />}
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
            <h1 className="w-full text-center font-zen text-4xl sm:text-5xl">
              {session.name}
            </h1>
          </div>
        ) : (
          <div>
            <div className="flex w-full items-start justify-between gap-8">
              <p className="whitespace-nowrap">
                {'Session ' + session.sessionNumber}
              </p>

              <p className="whitespace-nowrap">
                {format(session.createdAt, 'PP')}
              </p>
            </div>
            <h1 className="text-shadow-color text-shadow text-center font-zen text-5xl text-shadow-x-2 text-shadow-y-2">
              {capitalCase(session.name)}
            </h1>
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
                    <CharacterPictureRound character={character} />
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
