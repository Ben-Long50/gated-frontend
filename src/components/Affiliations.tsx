import { useParams } from 'react-router-dom';
import ArrowHeader2 from './ArrowHeader2';

const Affiliations = () => {
  const { characterId } = useParams();

  return (
    <div className="flex w-full max-w-7xl flex-col items-center gap-8">
      <h1>Affiliations</h1>
      <ArrowHeader2 title="Faction Affiliations" />
      <ArrowHeader2 title="Gang Affiliations" />
      <ArrowHeader2 title="Character Affiliations" />
    </div>
  );
};

export default Affiliations;
