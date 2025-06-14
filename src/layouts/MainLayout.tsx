import { useContext, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ThemeContext } from '../contexts/ThemeContext';
import { LayoutContext } from '../contexts/LayoutContext';
import Sidebar from '../components/sidebars/Sidebar';
import CodexLinks from '../components/sidebars/CodexLinks';
import CharacterLinks from '../components/sidebars/CharacterLinks';
import CampaignLinks from '../components/sidebars/CampaignLinks';
import AccountLinks from '../components/sidebars/AccountLinks';
import useNavigationStore from 'src/stores/navbarStore';

const MainLayout = () => {
  const { theme, accentPrimary } = useContext(ThemeContext);
  const { mobile } = useContext(LayoutContext);
  const { pathname } = useLocation();

  const navbar = useNavigationStore((state) => state.navbar);
  const setNavbar = useNavigationStore((state) => state.setNavbar);
  const sidebar = useNavigationStore((state) => state.sidebar);
  const setSidebar = useNavigationStore((state) => state.setSidebar);

  const [navbarHeight, setNavbarHeight] = useState(0);

  const navbarRef = useRef(null);

  return (
    <div
      className={`${theme} main-layout-large relative min-h-dvh w-dvw`}
      style={{ '--accent-primary': accentPrimary } as React.CSSProperties}
    >
      <Navbar setNavbarHeight={setNavbarHeight} navbarRef={navbarRef} />
      <Sidebar navbarHeight={navbarHeight}>
        {pathname.startsWith('/glam/codex') && <CodexLinks />}
        {pathname.startsWith('/glam/characters') && <CharacterLinks />}
        {pathname.startsWith('/glam/campaigns') && <CampaignLinks />}
        {pathname.startsWith('/glam/account') && <AccountLinks />}
      </Sidebar>
      <div
        id="portal-root"
        className={`${!mobile && 'ml-[68px]'} timing relative z-10 col-start-1 col-end-3 row-start-2 flex flex-col items-center overflow-y-auto px-2 py-4 max-xl:col-start-1 max-sm:pt-20 sm:p-8 lg:px-16`}
      >
        {mobile && (
          <div
            className={`${navbar || sidebar ? 'visible h-full bg-black bg-opacity-50 backdrop-blur-md' : 'invisible bg-transparent bg-opacity-0 backdrop-blur-0'} timing absolute top-0 z-20 w-dvw`}
            onClick={(e) => {
              e.stopPropagation();
              setNavbar(false);
              setSidebar(false);
            }}
          />
        )}
        <Outlet context={{ navbarHeight }} />
      </div>
    </div>
  );
};

export default MainLayout;
