import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const MainLayout = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-secondary main-layout-large h-dvh w-dvw overflow-hidden">
      <Navbar />
      <Sidebar />
      <div className="flex justify-center overflow-y-auto px-8 py-8 lg:px-16">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
