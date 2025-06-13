import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Loading from './Loading';
import { Link } from 'react-router-dom';
import BtnRect from './buttons/BtnRect';
import usePatchNotesQuery from '../hooks/usePatchNotesQuery/usePatchNotesQuery';
import { format } from 'date-fns';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import BtnIcon from './buttons/BtnIcon';

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
      <div className="flex w-full justify-end gap-4">
        {patchNotes[index - 1] && (
          <BtnIcon
            active={true}
            path={mdiChevronLeft}
            onClick={() => setIndex((prevIndex) => prevIndex - 1)}
          />
        )}
        {patchNotes[index + 1] && (
          <BtnIcon
            active={true}
            path={mdiChevronRight}
            onClick={() => setIndex((prevIndex) => prevIndex + 1)}
          />
        )}
      </div>
      <div className="flex w-full items-center justify-between">
        <p>EDO - v{patchNotes[index]?.version}</p>
        <p>{format(patchNotes[index]?.createdAt, 'PP')}</p>
      </div>
      <div
        className="whitespace-pre-wrap"
        dangerouslySetInnerHTML={{
          __html: patchNotes[index]?.content.html,
        }}
      />
      <div className="flex w-full justify-end gap-4">
        {patchNotes[index - 1] && (
          <BtnIcon
            active={true}
            path={mdiChevronLeft}
            onClick={() => setIndex((prevIndex) => prevIndex - 1)}
          />
        )}
        {patchNotes[index + 1] && (
          <BtnIcon
            active={true}
            path={mdiChevronRight}
            onClick={() => setIndex((prevIndex) => prevIndex + 1)}
          />
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
