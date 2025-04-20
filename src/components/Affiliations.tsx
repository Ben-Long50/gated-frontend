import useActiveCharacterQuery from '../hooks/useActiveCharacterQuery/useActiveCharacterQuery';
import ArrowHeader2 from './ArrowHeader2';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Loading from './Loading';

const Affiliations = () => {
  const { apiUrl } = useContext(AuthContext);
  const {
    data: character,
    isLoading,
    isPending,
  } = useActiveCharacterQuery(apiUrl);

  console.log(character?.affiliations);

  if (isLoading || isPending) return <Loading />;

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
