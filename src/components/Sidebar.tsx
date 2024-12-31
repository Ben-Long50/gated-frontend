import { Link } from 'react-router-dom';
import BtnNav from './BtnNav';
import Icon from '@mdi/react';
import {
  mdiAccountBoxOutline,
  mdiAccountBoxPlusOutline,
  mdiKey,
  mdiKeyPlus,
  mdiMenuClose,
  mdiMenuOpen,
  mdiPistol,
  mdiStarOutline,
  mdiStarPlusOutline,
} from '@mdi/js';
import { useContext } from 'react';
import { LayoutContext } from '../contexts/LayoutContext';
import ArmorIcon from './icons/ArmorIcon';
import CyberIcon from './icons/CyberIcon';

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
        <Link to="/weapons">
          <BtnNav
            onClick={() => {
              if (layoutSize !== 'large') {
                setSidebarVisibility(false);
              }
            }}
          >
            <Icon path={mdiPistol} size={1.25} />
            <h3 className="flex items-center pt-1 text-inherit">Weapons</h3>
          </BtnNav>
        </Link>
        <Link to="/weapons/create">
          <BtnNav
            onClick={() => {
              if (layoutSize !== 'large') {
                setSidebarVisibility(false);
              }
            }}
          >
            <Icon path={mdiPistol} size={1.25} />
            <h3 className="flex items-center pt-1 text-inherit">
              Create Weapon
            </h3>
          </BtnNav>
        </Link>
        <Link to="/armor">
          <BtnNav
            onClick={() => {
              if (layoutSize !== 'large') {
                setSidebarVisibility(false);
              }
            }}
          >
            <ArmorIcon className="size-8" />
            <h3 className="flex items-center pt-1 text-inherit">Armor</h3>
          </BtnNav>
        </Link>
        <Link to="/armor/create">
          <BtnNav
            onClick={() => {
              if (layoutSize !== 'large') {
                setSidebarVisibility(false);
              }
            }}
          >
            <ArmorIcon className="size-8" />
            <h3 className="flex items-center pt-1 text-inherit">
              Create Armor
            </h3>
          </BtnNav>
        </Link>
        <Link to="/cybernetics">
          <BtnNav
            onClick={() => {
              if (layoutSize !== 'large') {
                setSidebarVisibility(false);
              }
            }}
          >
            <CyberIcon className="size-8" />
            <h3 className="flex items-center pt-1 text-inherit">Cybernetics</h3>
          </BtnNav>
        </Link>
        <Link to="/cybernetics/create">
          <BtnNav
            onClick={() => {
              if (layoutSize !== 'large') {
                setSidebarVisibility(false);
              }
            }}
          >
            <CyberIcon className="size-8" />
            <h3 className="flex items-center pt-1 text-inherit">
              Create Cybernetic
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
            <Icon path={mdiKey} size={1.25} />
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
            <Icon path={mdiKeyPlus} size={1.25} />
            <h3 className="flex items-center pt-1 text-inherit">
              Create Keyword
            </h3>
          </BtnNav>
        </Link>
      </div>
      <button
        className={`${!sidebarVisibility ? '-right-3 translate-x-full' : 'right-3'} accent-primary absolute bottom-3 flex size-14 shrink-0 items-center justify-center rounded-full text-2xl font-semibold shadow-md shadow-zinc-950 transition-all duration-500 ease-in-out sm:pt-1`}
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
