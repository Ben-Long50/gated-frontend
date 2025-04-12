import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Loading from './Loading';
import { Link, useParams } from 'react-router-dom';
import useCharacterQuery from '../hooks/useCharacterQuery/useCharacterQuery';
import BtnRect from './buttons/BtnRect';

const Resume = ({ title }: { title: string }) => {
  const { apiUrl } = useContext(AuthContext);
  const { characterId } = useParams();

  const {
    data: character,
    isLoading,
    isPending,
  } = useCharacterQuery(apiUrl, characterId);

  let content;

  switch (title) {
    case 'Backstory':
      content = character?.backstory?.html;
      break;
    case 'First Taste':
      content = character?.firstTaste?.html;
      break;
    case 'Bad Medicine':
      content = character?.badMedicine?.html;
      break;
    default:
      content = null;
      break;
  }

  if (isLoading || isPending) {
    return <Loading />;
  }

  return (
    <div className="flex w-full max-w-4xl flex-col gap-4">
      <h1 className="text-center">
        {character.firstName + ' ' + character.lastName + "'s " + title}
      </h1>
      <hr className="my-4 w-full border border-yellow-300 border-opacity-50" />
      {content ? (
        <>
          <div
            id="quill-display"
            className="ql-editor whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <Link className="self-end" to="../resume/update">
            <button
              className="text-accent hover:underline"
              ariaLabel={'Create ' + title}
            >
              Update {title}
            </button>
          </Link>
        </>
      ) : (
        <div className="flex flex-col items-center gap-8">
          <h3 className="text-center">
            You have not created a {title.toLowerCase()} for{' '}
            {character.firstName + ' ' + character.lastName}. Click the button
            below to create one.
          </h3>
          <Link to="../resume/update">
            <BtnRect type="button" ariaLabel={'Create ' + title}>
              Update {title}
            </BtnRect>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Resume;
