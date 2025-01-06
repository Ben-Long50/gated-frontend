import { useContext, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ThemeContext } from '../contexts/ThemeContext';
import { LayoutContext } from '../contexts/LayoutContext';
import Sidebar from '../components/sidebars/Sidebar';
import CodexLinks from '../components/sidebars/CodexLinks';
import CharacterLinks from '../components/sidebars/CharacterLinks';

const MainLayout = () => {
  const { theme } = useContext(ThemeContext);
  const { layoutSize } = useContext(LayoutContext);
  const { pathname } = useLocation();

  const [sidebarVisibility, setSidebarVisibility] = useState(
    layoutSize === 'large' ? true : false,
  );
  const [navbarHeight, setNavbarHeight] = useState(0);

  return (
    <div
      className={`${theme} bg-secondary main-layout-large relative min-h-dvh w-dvw bg-opacity-85`}
    >
      <Navbar setNavbarHeight={setNavbarHeight} />
      <Sidebar
        sidebarVisibility={sidebarVisibility}
        setSidebarVisibility={setSidebarVisibility}
        navbarHeight={navbarHeight}
      >
        {pathname.startsWith('/glam/codex') && (
          <CodexLinks setSidebarVisibility={setSidebarVisibility} />
        )}
        {pathname.startsWith('/glam/characters') && (
          <CharacterLinks setSidebarVisibility={setSidebarVisibility} />
        )}
      </Sidebar>
      <div
        className={`timing col-end-3 ${sidebarVisibility ? 'col-start-2' : 'col-start-1'} z-10 row-start-2 flex flex-col items-center overflow-y-auto px-2 py-4 max-xl:col-start-1 sm:p-8 lg:px-16`}
      >
        <Outlet name="main" context={{ navbarHeight }} />
      </div>
    </div>
  );
};

export default MainLayout;
