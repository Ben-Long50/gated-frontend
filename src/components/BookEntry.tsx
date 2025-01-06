import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Loading from './Loading';
import useBookEntryQuery from '../hooks/useBookEntryQuery/useBookEntryQuery';
import { Link, useParams } from 'react-router-dom';

const BookEntry = () => {
  const { apiUrl, authToken } = useContext(AuthContext);
  const { bookEntryTitle } = useParams();

  const {
    data: bookEntry,
    isLoading,
    isPending,
  } = useBookEntryQuery(apiUrl, authToken, bookEntryTitle);

  console.log(bookEntry);

  if (isLoading || isPending) {
    return <Loading />;
  }

  return (
    <div className='p-2" flex max-w-4xl flex-col gap-4'>
      <div dangerouslySetInnerHTML={{ __html: bookEntry.content }} />
      <div className="flex w-full items-center justify-end">
        <Link to="update">
          <button className="text-accent hover:underline">Edit entry</button>
        </Link>
      </div>
    </div>
  );
};

export default BookEntry;
