import { Link } from 'react-router-dom';
import BtnNav from './BtnNav';
import { useState } from 'react';
import Icon from '@mdi/react';
import { mdiChevronDoubleLeft } from '@mdi/js';

const Sidebar = () => {
  const [visibility, setVisibility] = useState(true);

  return (
    <nav
      className={`${!visibility && '-translate-x-full'} timing bg-secondary relative z-10 col-start-1 row-start-2 flex w-full min-w-96 border-r border-yellow-300 py-8 pl-4`}
    >
      <div className="flex grow flex-col gap-2">
        <Link to="/character">
          <BtnNav>Characters</BtnNav>
        </Link>
        <Link to="/perks">
          <BtnNav>Perks</BtnNav>
        </Link>
        <Link to="/perks/create">
          <BtnNav>Create Perk</BtnNav>
        </Link>
      </div>

      <button
        className={`${!visibility && 'translate-x-full'} text-tertiary timing z-20 clip-4`}
        onClick={() => setVisibility(!visibility)}
      >
        <Icon
          className={`${!visibility && 'rotate-180'} timing`}
          path={mdiChevronDoubleLeft}
          size={1}
        />
      </button>
    </nav>
  );
};

export default Sidebar;
