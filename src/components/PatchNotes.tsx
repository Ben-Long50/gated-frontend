import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Loading from './Loading';
import { Link } from 'react-router-dom';
import BtnRect from './buttons/BtnRect';
import usePatchNotesQuery from '../hooks/usePatchNotesQuery/usePatchNotesQuery';
import { format } from 'date-fns';

const PatchNotes = () => {
  const { apiUrl, user } = useContext(AuthContext);
  const [index, setIndex] = useState(0);

  const { data: patchNotes, isLoading, isPending } = usePatchNotesQuery(apiUrl);

  if (isLoading || isPending) {
    return <Loading />;
  }

  if (patchNotes.length === 0) return <span></span>;

  return (
    <div className="flex w-full max-w-4xl flex-col gap-8">
      <div className="flex w-full items-center justify-between">
        <p>Patch notes: EDO version - {patchNotes[index]?.version}</p>
        <p>{format(patchNotes[index]?.createdAt, 'PP')}</p>
      </div>
      <h1 className="text-center">
        {patchNotes[index]?.title[0].toUpperCase() +
          patchNotes[index]?.title.slice(1)}
      </h1>
      <div
        className="whitespace-pre-wrap"
        dangerouslySetInnerHTML={{
          __html: patchNotes[index]?.content.html,
        }}
      />
      <div className="flex w-full justify-end gap-8">
        {patchNotes[index - 1] && (
          <BtnRect
            className="w-28"
            onClick={() => setIndex((prevIndex) => prevIndex - 1)}
          >
            Prev
          </BtnRect>
        )}
        {patchNotes[index + 1] && (
          <BtnRect
            className="w-28"
            onClick={() => setIndex((prevIndex) => prevIndex + 1)}
          >
            Next
          </BtnRect>
        )}
      </div>
      {(user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
        <div className="flex w-full items-center justify-end">
          <Link to={`patchNotes/${patchNotes[index]?.id}/update`}>
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
