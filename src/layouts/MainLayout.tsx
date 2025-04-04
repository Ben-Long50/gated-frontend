import { useContext, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ThemeContext } from '../contexts/ThemeContext';
import { LayoutContext } from '../contexts/LayoutContext';
import Sidebar from '../components/sidebars/Sidebar';
import CodexLinks from '../components/sidebars/CodexLinks';
import CharacterLinks from '../components/sidebars/CharacterLinks';
import CampaignLinks from '../components/sidebars/CampaignLinks';

const MainLayout = () => {
  const { theme } = useContext(ThemeContext);
  const { layoutSize } = useContext(LayoutContext);
  const { pathname } = useLocation();

  const [sidebarVisibility, setSidebarVisibility] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);

  return (
    <div className={`${theme} main-layout-large relative min-h-dvh w-dvw`}>
      <Navbar
        setNavbarHeight={setNavbarHeight}
        setSidebarVisibility={setSidebarVisibility}
      />
      <Sidebar
        sidebarVisibility={sidebarVisibility}
        setSidebarVisibility={setSidebarVisibility}
        navbarHeight={navbarHeight}
      >
        {pathname.startsWith('/glam/codex') && (
          <CodexLinks
            sidebarVisibility={sidebarVisibility}
            setSidebarVisibility={setSidebarVisibility}
          />
        )}
        {pathname.startsWith('/glam/characters') && (
          <CharacterLinks
            sidebarVisibility={sidebarVisibility}
            setSidebarVisibility={setSidebarVisibility}
          />
        )}
        {pathname.startsWith('/glam/campaigns') && (
          <CampaignLinks
            sidebarVisibility={sidebarVisibility}
            setSidebarVisibility={setSidebarVisibility}
          />
        )}
      </Sidebar>
      <div
        id="portal-root"
        className={`timing relative z-10 col-start-1 col-end-3 row-start-2 ml-[68px] flex flex-col items-center overflow-y-auto px-2 py-4 max-xl:col-start-1 max-sm:pt-20 sm:p-8 lg:px-16`}
      >
        <Outlet context={{ navbarHeight }} />
      </div>
    </div>
  );
};

export default MainLayout;
