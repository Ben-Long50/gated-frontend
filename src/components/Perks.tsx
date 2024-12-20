import usePerksQuery from '../hooks/usePerksQuery/usePerksQuery';
import PerkList from './PerkList';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import usePerks from '../hooks/usePerks';

const Perks = () => {
  const { apiUrl, authToken } = useContext(AuthContext);
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
      <h1 className="mb-5 text-center">Perks</h1>
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
            className={`${activeFilter === 'generalPerks' ? 'accent-primary' : 'bg-primary text-secondary'} timing w-full rounded-l-md pt-1 text-lg font-semibold`}
            onClick={() => {
              perkFilter.handleFilter('generalPerks');
              setActivefilter('generalPerks');
            }}
          >
            G
          </button>
          <button
            className={`${activeFilter === 'cyberneticaPerks' ? 'accent-primary' : 'bg-primary text-secondary'} timing w-full pt-1 text-lg font-semibold`}
            onClick={() => {
              perkFilter.handleFilter('cyberneticaPerks');
              setActivefilter('cyberneticaPerks');
            }}
          >
            C
          </button>
          <button
            className={`${activeFilter === 'esotericaPerks' ? 'accent-primary' : 'bg-primary text-secondary'} timing w-full pt-1 text-lg font-semibold`}
            onClick={() => {
              perkFilter.handleFilter('esotericaPerks');
              setActivefilter('esotericaPerks');
            }}
          >
            E
          </button>
          <button
            className={`${activeFilter === 'peacePerks' ? 'accent-primary' : 'bg-primary text-secondary'} timing w-full pt-1 text-lg font-semibold`}
            onClick={() => {
              perkFilter.handleFilter('peacePerks');
              setActivefilter('peacePerks');
            }}
          >
            P
          </button>
          <button
            className={`${activeFilter === 'violencePerks' ? 'accent-primary' : 'bg-primary text-secondary'} timing w-full rounded-r-md pt-1 text-lg font-semibold`}
            onClick={() => {
              perkFilter.handleFilter('violencePerks');
              setActivefilter('violencePerks');
            }}
          >
            V
          </button>
        </div>
      </div>

      <PerkList perkTree={perkFilter.filteredTree} />
    </div>
  );
};

export default Perks;
