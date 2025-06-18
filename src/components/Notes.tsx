import { format } from 'date-fns';
import Divider from './Divider';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { useContext, useState } from 'react';
import Loading from './Loading';
import useNotesQuery from '../hooks/useNotesQuery/useNotesQuery';
import useCharacterQuery from '../hooks/useCharacterQuery/useCharacterQuery';
import ArrowHeader3 from './ArrowHeader3';
import NotesForm from './NotesForm';
import useCampaignQuery from 'src/hooks/useCampaignQuery/useCampaignQuery';
import CharacterPictureRound from './CharacterPictureRound';

const Notes = () => {
  const { apiUrl, user } = useContext(AuthContext);
  const { campaignId, characterId } = useParams();
  const [editModeId, setEditModeId] = useState<number | null>(null);

  const { data: character, isLoading: characterLoading } = useCharacterQuery(
    Number(characterId),
  );

  const { data: campaign, isLoading: campaignLoading } = useCampaignQuery(
    apiUrl,
    Number(campaignId),
  );

  const {
    data: notes,
    isLoading: notesLoading,
    isError: notesError,
  } = useNotesQuery(apiUrl, Number(campaignId), Number(characterId));

  const isLoading = notesLoading || characterLoading || campaignLoading;
  const isError = notesError;

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    throw new Error('Failed to find session');
  }

  return (
    <div className="flex w-full max-w-5xl flex-col gap-8">
      <div className="flex items-center justify-center gap-8">
        <CharacterPictureRound character={character} />
        <h1 className="text-left">
          {character?.firstName + ' ' + character?.lastName + "'s Notes"}
        </h1>
      </div>
      {campaign?.sessions.map((session) => {
        const note = notes?.find((note) => note.sessionId === session.id);

        return editModeId === session.id ? (
          <NotesForm
            title="Edit"
            note={note}
            setEditModeId={setEditModeId}
            sessionId={session.id}
          />
        ) : (
          <div className="bg-primary shadow-color flex flex-col gap-2 rounded-lg p-4 shadow-lg sm:p-8">
            <div className="flex w-full items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <p className="whitespace-nowrap">
                  {'Session ' + session.sessionNumber}
                </p>
              </div>
              <p className="whitespace-nowrap">
                {format(session.createdAt, 'PP')}
              </p>
            </div>
            <ArrowHeader3 className="mt-2" title={session?.name} />
            <Divider />
            {note ? (
              <div
                id="quill-display"
                className="ql-editor whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: note.content?.html }}
              />
            ) : (
              <p>No notes created</p>
            )}
            {character?.userId === user?.id && (
              <button
                className="text-accent self-end hover:underline"
                onClick={() => setEditModeId(session.id)}
              >
                {note ? 'Edit Notes' : 'Create Notes'}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Notes;
