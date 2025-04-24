import { format } from 'date-fns';
import Divider from './Divider';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';
import useSessionQuery from '../hooks/useSessionQuery/useSessionQuery';
import Loading from './Loading';
import useNotesQuery from '../hooks/useNotesQuery/useNotesQuery';
import BtnRect from './buttons/BtnRect';
import useCharacterQuery from '../hooks/useCharacterQuery/useCharacterQuery';

const Notes = () => {
  const { apiUrl, user } = useContext(AuthContext);
  const { campaignId, sessionId, characterId } = useParams();

  const {
    data: character,
    isLoading: characterLoading,
    isPending: characterPending,
    isError: characterError,
  } = useCharacterQuery(apiUrl, Number(characterId));

  const {
    data: session,
    isLoading: sessionLoading,
    isPending: sessionPending,
    isError: sessionError,
  } = useSessionQuery(apiUrl, Number(campaignId), Number(sessionId));

  const {
    data: notes,
    isLoading: notesLoading,
    isPending: notesPending,
    isError: notesError,
  } = useNotesQuery(
    apiUrl,
    Number(campaignId),
    Number(sessionId),
    Number(characterId),
  );

  const isLoading = sessionLoading || notesLoading || characterLoading;
  const isPending = sessionPending || notesPending || characterPending;
  const isError = sessionError || notesError || characterError;

  if (isLoading || isPending) {
    return <Loading />;
  }

  if (isError) {
    throw new Error('Failed to find session');
  }

  if (!notes) {
    return character.userId === user.id ? (
      <div className="flex w-full max-w-5xl flex-col gap-4">
        <div className="flex w-full items-start justify-between gap-8">
          <p className="whitespace-nowrap">
            {'Session ' + session.sessionNumber}
          </p>
          <div className="flex items-center justify-center gap-8">
            <img
              className="size-16 rounded-full shadow-md shadow-black"
              src={character.picture.imageUrl}
              alt={`${character.firstName} ${character.lastName}'s picture`}
            />
            <h1 className="text-center">
              {character.firstName + ' ' + character.lastName + "'s Notes"}
            </h1>
          </div>
          <p className="whitespace-nowrap">{format(session.createdAt, 'PP')}</p>
        </div>
        <Divider />
        <h3 className="text-center">
          You have not created any notes for this session. Begin your notes by
          clicking the button below and come back to this page later to view and
          edit them.
        </h3>
        <Link className="mx-auto" to="create">
          <BtnRect ariaLabel="Navigate to create notes" type="button">
            Create Notes
          </BtnRect>
        </Link>
      </div>
    ) : (
      <div className="flex w-full max-w-5xl flex-col gap-4">
        <div className="flex w-full items-start justify-between gap-8">
          <p className="whitespace-nowrap">
            {'Session ' + session.sessionNumber}
          </p>
          <div className="flex items-center justify-center gap-8">
            <img
              className="size-16 rounded-full shadow-md shadow-black"
              src={character.picture.imageUrl}
              alt={`${character.firstName} ${character.lastName}'s picture`}
            />
            <h1 className="text-center">
              {character.firstName + ' ' + character.lastName + "'s Notes"}
            </h1>
          </div>
          <p className="whitespace-nowrap">{format(session.createdAt, 'PP')}</p>
        </div>
        <Divider />
        <h3 className="text-center">
          This character has not created any notes this session. If they write
          notes in the future, they will be shown here.
        </h3>
      </div>
    );
  }

  return (
    <div className="flex w-full max-w-5xl flex-col gap-4">
      <div className="flex w-full items-start justify-between gap-8">
        <p className="whitespace-nowrap">
          {'Session ' + session.sessionNumber}
        </p>
        <div className="flex items-center justify-center gap-8">
          <img
            className="size-16 rounded-full shadow-md shadow-black"
            src={character.picture.imageUrl}
            alt={`${character.firstName} ${character.lastName}'s picture`}
          />
          <h1 className="text-center">
            {character.firstName + ' ' + character.lastName + "'s Notes"}
          </h1>
        </div>
        <p className="whitespace-nowrap">{format(session.createdAt, 'PP')}</p>
      </div>
      <Divider />
      <div
        id="quill-display"
        className="ql-editor whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: notes.content?.html }}
      />
      {character.userId === user.id && (
        <Link className="self-end" to={`update`}>
          <button className="text-accent hover:underline">Edit Notes</button>
        </Link>
      )}
    </div>
  );
};

export default Notes;
