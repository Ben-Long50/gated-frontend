import { useContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { ThemeContext } from '../contexts/ThemeContext';

const MainLayout = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const [sidebarVisibility, setSidebarVisibility] = useState(true);

  return (
    <div className={`${theme} bg-secondary main-layout-large h-dvh w-dvw`}>
      <Navbar />
      <Sidebar
        sidebarVisibility={sidebarVisibility}
        setSidebarVisibility={setSidebarVisibility}
      />
      <div
        className={`timing col-end-3 ${sidebarVisibility ? 'col-start-2' : 'col-start-1'} row-start-2 flex flex-col items-center overflow-y-auto p-4 max-lg:col-start-1 sm:p-8 lg:px-16`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
