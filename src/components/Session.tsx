import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Loading from './Loading';
import { useParams } from 'react-router-dom';
import useSessionQuery from '../hooks/useSessionQuery/useSessionQuery';
import { format } from 'date-fns';

const Session = () => {
  const { apiUrl } = useContext(AuthContext);
  const { campaignId, sessionId } = useParams();

  const {
    data: session,
    isLoading,
    isPending,
  } = useSessionQuery(apiUrl, campaignId, sessionId);

  if (isLoading || isPending) {
    return <Loading />;
  }

  return (
    <div className="flex w-full max-w-4xl flex-col gap-4">
      <div className="flex w-full items-start justify-between">
        <p>{'Session ' + session.sessionNumber}</p>
        <h1>{session.name}</h1>
        <p>{format(session.createdAt, 'PP')}</p>
      </div>
      <hr className="my-4 w-full border border-yellow-300 border-opacity-50" />
      <div
        id="quill-display"
        className="ql-editor whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: session.briefing.html }}
      />
    </div>
  );
};

export default Session;
