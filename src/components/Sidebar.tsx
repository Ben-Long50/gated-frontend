import { Link } from 'react-router-dom';
import BtnNav from './BtnNav';
import Icon from '@mdi/react';
import {
  mdiAccountBoxOutline,
  mdiAccountBoxPlusOutline,
  mdiMenuClose,
  mdiMenuOpen,
  mdiStarOutline,
  mdiStarPlusOutline,
} from '@mdi/js';
import { useContext } from 'react';
import { LayoutContext } from '../contexts/LayoutContext';

const Sidebar = ({ sidebarVisibility, setSidebarVisibility, navbarHeight }) => {
  const { layoutSize } = useContext(LayoutContext);

  return (
    <nav
      className={`${!sidebarVisibility && '-translate-x-full'} bg-secondary sticky z-10 col-start-1 row-start-2 flex max-w-96 border-r border-yellow-300 transition-transform duration-500 ease-in-out`}
      style={{
        height: `calc(100dvh - ${navbarHeight}px)`,
        top: `${navbarHeight}px`,
      }}
    >
      <div className="flex grow flex-col gap-2 px-4 py-8">
        <Link to="/characters">
          <BtnNav
            onClick={() => {
              if (layoutSize !== 'large') {
                setSidebarVisibility(false);
              }
            }}
          >
            <Icon path={mdiAccountBoxOutline} size={1.25} />
            <h3 className="flex items-center pt-1 text-inherit">Characters</h3>
          </BtnNav>
        </Link>
        <Link to="/characters/create">
          <BtnNav
            onClick={() => {
              if (layoutSize !== 'large') {
                setSidebarVisibility(false);
              }
            }}
          >
            <Icon path={mdiAccountBoxPlusOutline} size={1.25} />
            <h3 className="flex items-center pt-1 text-inherit">
              Create Character
            </h3>
          </BtnNav>
        </Link>
        <Link to="/perks">
          <BtnNav
            onClick={() => {
              if (layoutSize !== 'large') {
                setSidebarVisibility(false);
              }
            }}
          >
            <Icon path={mdiStarOutline} size={1.25} />
            <h3 className="flex items-center pt-1 text-inherit">Perks</h3>
          </BtnNav>
        </Link>
        <Link to="/perks/create">
          <BtnNav
            onClick={() => {
              if (layoutSize !== 'large') {
                setSidebarVisibility(false);
              }
            }}
          >
            <Icon path={mdiStarPlusOutline} size={1.25} />
            <h3 className="flex items-center pt-1 text-inherit">Create Perk</h3>
          </BtnNav>
        </Link>
        <Link to="/keywords">
          <BtnNav
            onClick={() => {
              if (layoutSize !== 'large') {
                setSidebarVisibility(false);
              }
            }}
          >
            <Icon path={mdiStarOutline} size={1.25} />
            <h3 className="flex items-center pt-1 text-inherit">Keywords</h3>
          </BtnNav>
        </Link>
        <Link to="/keywords/create">
          <BtnNav
            onClick={() => {
              if (layoutSize !== 'large') {
                setSidebarVisibility(false);
              }
            }}
          >
            <Icon path={mdiStarPlusOutline} size={1.25} />
            <h3 className="flex items-center pt-1 text-inherit">
              Create Keyword
            </h3>
          </BtnNav>
        </Link>
      </div>
      <button
        className={`${!sidebarVisibility ? '-right-3 translate-x-full' : 'right-3'} accent-primary absolute bottom-3 flex size-16 shrink-0 items-center justify-center rounded-full text-2xl font-semibold transition-all duration-500 ease-in-out sm:pt-1`}
        onClick={() => setSidebarVisibility(!sidebarVisibility)}
      >
        {!sidebarVisibility ? (
          <Icon path={mdiMenuClose} size={1.75} />
        ) : (
          <Icon path={mdiMenuOpen} size={1.75} />
        )}
      </button>
    </nav>
  );
};

export default Sidebar;
