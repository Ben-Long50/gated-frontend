import { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { mdiPyramid } from '@mdi/js';
import Icon from '@mdi/react';
import { ThemeContext } from '../contexts/ThemeContext';

const Navbar = ({ setNavbarHeight }) => {
  const { user } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);

  const navbarRef = useRef(null);

  useEffect(() => {
    if (navbarRef.current) {
      setNavbarHeight(navbarRef.current.offsetHeight);
    }
  }, [navbarRef.current]);

  return (
    <nav
      ref={navbarRef}
      className="bg-primary sticky top-0 z-20 col-span-2 flex items-center justify-between gap-4 px-4 py-2 shadow-md shadow-black"
    >
      <h1 className="text-accent -mb-2 font-logo">GatED</h1>
      <img
        className="size-10"
        src={user?.profilePicture}
        alt="Profile Picture"
      />
    </nav>
  );
};

export default Navbar;
