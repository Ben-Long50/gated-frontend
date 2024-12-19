import { useContext } from 'react';
import PerkCard from './PerkCard';
import { AuthContext } from '../contexts/AuthContext';
import usePerksQuery from '../hooks/usePerksQuery/usePerksQuery';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';

const PerkList = () => {
  const { apiUrl, authToken } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);

  const perks = usePerksQuery(apiUrl, authToken);

  console.log(perks.data);

  if (perks.isLoading || perks.isPending) {
    return <span></span>;
  }

  return (
    <ThemeContainer
      chamfer="32"
      borderColor={accentPrimary}
      className="mb-auto w-full"
    >
      <div className="bg-primary flex flex-col gap-4 p-6 clip-8">
        {perks.data.map((perk) => {
          return <PerkCard key={perk.name} perk={perk} />;
        })}
      </div>
    </ThemeContainer>
  );
};

export default PerkList;
