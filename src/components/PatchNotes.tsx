import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Loading from './Loading';
import { Link } from 'react-router-dom';
import BtnRect from './buttons/BtnRect';
import usePatchNotesQuery from '../hooks/usePatchNotesQuery/usePatchNotesQuery';
import { format } from 'date-fns';

const PatchNotes = () => {
  const { apiUrl, user } = useContext(AuthContext);
  const [patchNoteIndex, setPatchNoteIndex] = useState(0);

  const { data: patchNotes, isLoading, isPending } = usePatchNotesQuery(apiUrl);

  if (isLoading || isPending) {
    return <Loading />;
  }

  return (
    <div className="flex w-full max-w-4xl flex-col gap-8">
      <div className="flex w-full items-center justify-between">
        <p>Version - {patchNotes[patchNoteIndex].version}</p>
        <p>{format(patchNotes[patchNoteIndex].createdAt, 'PP')}</p>
      </div>
      <div
        className="whitespace-pre-wrap"
        dangerouslySetInnerHTML={{
          __html: patchNotes[patchNoteIndex].content.html,
        }}
      />
      <div className="flex w-full justify-end gap-8">
        {patchNotes[patchNoteIndex - 1] && (
          <BtnRect
            className="w-28"
            onClick={() => setPatchNoteIndex((prevIndex) => prevIndex - 1)}
          >
            Prev
          </BtnRect>
        )}
        {patchNotes[patchNoteIndex + 1] && (
          <BtnRect
            className="w-28"
            onClick={() => setPatchNoteIndex((prevIndex) => prevIndex + 1)}
          >
            Next
          </BtnRect>
        )}
      </div>
      {(user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
        <div className="flex w-full items-center justify-end">
          <Link to={`patchNotes/${patchNotes[patchNoteIndex].id}/update`}>
            <button className="text-accent hover:underline">
              Edit patch notes
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default PatchNotes;
