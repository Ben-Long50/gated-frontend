import { Link } from 'react-router-dom';
import BtnNav from './BtnNav';
import Icon from '@mdi/react';
import {
  mdiAccountBoxOutline,
  mdiAccountBoxPlusOutline,
  mdiChevronDoubleLeft,
  mdiStarOutline,
  mdiStarPlusOutline,
} from '@mdi/js';

const Sidebar = ({ sidebarVisibility, setSidebarVisibility }) => {
  return (
    <nav
      className={`${!sidebarVisibility && '-translate-x-full'} timing bg-secondary relative z-10 col-start-1 row-start-2 flex w-full min-w-96 border-r border-yellow-300`}
    >
      <div className="flex grow flex-col gap-2 py-8 pl-4">
        <Link to="/character">
          <BtnNav>
            <Icon path={mdiAccountBoxOutline} size={1.25} />
            <h3 className="flex items-center pt-1 text-inherit">Characters</h3>
          </BtnNav>
        </Link>
        <Link to="/character/create">
          <BtnNav>
            <Icon path={mdiAccountBoxPlusOutline} size={1.25} />
            <h3 className="flex items-center pt-1 text-inherit">
              Create Character
            </h3>
          </BtnNav>
        </Link>
        <Link to="/perks">
          <BtnNav>
            <Icon path={mdiStarOutline} size={1.25} />
            <h3 className="flex items-center pt-1 text-inherit">Perks</h3>
          </BtnNav>
        </Link>
        <Link to="/perks/create">
          <BtnNav>
            <Icon path={mdiStarPlusOutline} size={1.25} />
            <h3 className="flex items-center pt-1 text-inherit">Create Perk</h3>
          </BtnNav>
        </Link>
      </div>

      <button
        className={`${!sidebarVisibility && 'translate-x-full'} hover:bg-primary text-tertiary timing`}
        onClick={() => setSidebarVisibility(!sidebarVisibility)}
      >
        <Icon
          className={`${!sidebarVisibility && 'rotate-180'} timing`}
          path={mdiChevronDoubleLeft}
          size={1}
        />
      </button>
    </nav>
  );
};

export default Sidebar;
