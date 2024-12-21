import { useContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { ThemeContext } from '../contexts/ThemeContext';
import { LayoutContext } from '../contexts/LayoutContext';

const MainLayout = () => {
  const { theme } = useContext(ThemeContext);
  const { layoutSize } = useContext(LayoutContext);

  const [sidebarVisibility, setSidebarVisibility] = useState(
    layoutSize === 'large' ? true : false,
  );
  const [navbarHeight, setNavbarHeight] = useState(0);

  return (
    <div className={`${theme} bg-secondary main-layout-large min-h-dvh w-dvw`}>
      <Navbar setNavbarHeight={setNavbarHeight} />
      <Sidebar
        sidebarVisibility={sidebarVisibility}
        setSidebarVisibility={setSidebarVisibility}
        navbarHeight={navbarHeight}
      />
      <div
        className={`timing col-end-3 ${sidebarVisibility ? 'col-start-2' : 'col-start-1'} row-start-2 flex flex-col items-center overflow-y-auto p-4 max-xl:col-start-1 sm:p-8 lg:px-16`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
