import { useContext } from 'react';
import BtnNav from './BtnNav';
import { AuthContext } from '../contexts/AuthContext';
import LogoTitle from './LogoTitle';

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <nav className="z-20 col-span-2 grid grid-cols-5 items-center gap-4 px-4 py-2 shadow-md shadow-black"></nav>
  );
};

export default Navbar;
