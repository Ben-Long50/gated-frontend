import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Loading from './Loading';
import { Link, useLocation, useParams } from 'react-router-dom';
import BtnRect from './buttons/BtnRect';
import BtnAuth from './buttons/BtnAuth';
import { LayoutContext } from '../contexts/LayoutContext';
import useCharacter from 'src/hooks/useCharacter';
import Divider from './Divider';

const Resume = () => {
  const { user } = useContext(AuthContext);
  const { mobile } = useContext(LayoutContext);
  const { characterId } = useParams();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const state = query.get('state');
  const [resume, setResume] = useState(state || 'Backstory');

  const {
    filteredCharacter: character,
    isLoading,
    isPending,
  } = useCharacter(Number(characterId));

  let content;

  switch (resume) {
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
    <div className="flex w-full max-w-5xl flex-col gap-4">
      <h1 className="text-center">
        {character?.firstName + ' ' + character?.lastName + "'s Resume"}
      </h1>
      <div
        className={`${mobile ? 'grid-rows-3 gap-2' : 'grid-cols-3 gap-8'} grid`}
      >
        <BtnAuth onClick={() => setResume('Backstory')}>Backstory</BtnAuth>
        <BtnAuth onClick={() => setResume('First Taste')}>First Taste</BtnAuth>
        <BtnAuth onClick={() => setResume('Bad Medicine')}>
          Bad Medicine
        </BtnAuth>
      </div>
      <Divider />
      <h1 className="text-center">{resume}</h1>
      {content ? (
        <>
          <div
            id="quill-display"
            className="ql-editor whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          {character?.userId === user?.id && (
            <Link className="self-end" to="../resume/update">
              <button className="text-accent hover:underline">
                Update {resume}
              </button>
            </Link>
          )}
        </>
      ) : character?.userId === user?.id ? (
        <div className="flex flex-col items-center gap-8">
          <h3 className="text-center">
            You have not created a {resume.toLowerCase()} resume entry for{' '}
            {character?.firstName + ' ' + character?.lastName}. Click the button
            below to create one.
          </h3>
          <Link to="../resume/update">
            <BtnRect type="button" ariaLabel={'Create ' + resume}>
              Update {resume}
            </BtnRect>
          </Link>
        </div>
      ) : (
        <h3 className="text-center">
          A {resume.toLowerCase()} resume entry for{' '}
          {character?.firstName + ' ' + character?.lastName} has not been
          created.
        </h3>
      )}
    </div>
  );
};

export default Resume;
