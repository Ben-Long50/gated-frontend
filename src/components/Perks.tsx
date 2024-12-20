import usePerksQuery from '../hooks/usePerksQuery/usePerksQuery';
import PerkList from './PerkList';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import usePerks from '../hooks/usePerks';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';

const Perks = () => {
  const { apiUrl, authToken } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);
  const [activeFilter, setActivefilter] = useState('');

  const perks = usePerksQuery(apiUrl, authToken);
  const perkFilter = usePerks();

  useEffect(() => {
    if (perks.data) {
      perkFilter.sortPerks(perks.data);
    }
  }, [perks.data]);

  if (perks.isPending) {
    return <span></span>;
  }

  return (
    <div className="flex w-full max-w-4xl flex-col items-center gap-3">
      <h1 className="text-center lg:mb-5">Perks</h1>
      <div className="flex w-full flex-col items-center justify-between gap-2 lg:flex-row lg:px-8">
        <p>Filter by attribute</p>

        <div className="grid grid-cols-6 gap-0.5">
          <button
            className="text-tertiary px-2 hover:underline"
            onClick={() => {
              perkFilter.sortPerks(perks.data);
              setActivefilter('');
            }}
          >
            reset
          </button>
          <button
            className={`${activeFilter === 'generalPerks' ? 'accent-primary' : 'bg-primary text-secondary'} timing w-full rounded-l-md text-lg font-semibold lg:pt-1`}
            onClick={() => {
              perkFilter.handleFilter('generalPerks');
              setActivefilter('generalPerks');
            }}
          >
            G
          </button>
          <button
            className={`${activeFilter === 'cyberneticaPerks' ? 'accent-primary' : 'bg-primary text-secondary'} timing w-full text-lg font-semibold lg:pt-1`}
            onClick={() => {
              perkFilter.handleFilter('cyberneticaPerks');
              setActivefilter('cyberneticaPerks');
            }}
          >
            C
          </button>
          <button
            className={`${activeFilter === 'esotericaPerks' ? 'accent-primary' : 'bg-primary text-secondary'} timing w-full text-lg font-semibold lg:pt-1`}
            onClick={() => {
              perkFilter.handleFilter('esotericaPerks');
              setActivefilter('esotericaPerks');
            }}
          >
            E
          </button>
          <button
            className={`${activeFilter === 'peacePerks' ? 'accent-primary' : 'bg-primary text-secondary'} timing w-full text-lg font-semibold lg:pt-1`}
            onClick={() => {
              perkFilter.handleFilter('peacePerks');
              setActivefilter('peacePerks');
            }}
          >
            P
          </button>
          <button
            className={`${activeFilter === 'violencePerks' ? 'accent-primary' : 'bg-primary text-secondary'} timing w-full rounded-r-md text-lg font-semibold lg:pt-1`}
            onClick={() => {
              perkFilter.handleFilter('violencePerks');
              setActivefilter('violencePerks');
            }}
          >
            V
          </button>
        </div>
      </div>
      <ThemeContainer
        chamfer="32"
        className="w-full"
        borderColor={accentPrimary}
      >
        <div className="bg-primary w-full p-6 clip-8">
          <PerkList perkTree={perkFilter.filteredTree} />
        </div>
      </ThemeContainer>
    </div>
  );
};

export default Perks;
