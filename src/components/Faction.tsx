import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Loading from './Loading';
import useFactionQuery from '../hooks/useFactionQuery/useFactionQuery';
import AffiliationBar from './AffiliationBar';

const Faction = () => {
  const { apiUrl } = useContext(AuthContext);
  const { factionId } = useParams();

  const {
    data: faction,
    isLoading,
    isPending,
  } = useFactionQuery(apiUrl, factionId);

  console.log(faction);

  if (isLoading || isPending) return <Loading />;

  return (
    <div className="w-full max-w-7xl">
      {faction.primaryAffiliations.map((affiliation: Affiliation) => (
        <AffiliationBar key={affiliation.id} value={affiliation.value} />
      ))}
    </div>
  );
};

export default Faction;
