import { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../contexts/AuthContext';
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
      className="bg-primary sticky top-0 z-20 col-span-2 flex items-center justify-between gap-4 py-2 pl-4 pr-6 shadow-md shadow-black"
    >
      <h1 className="text-accent -mb-2 font-logo">GatED</h1>
      <img
        className="size-10 rounded-full"
        src={user?.profilePicture}
        alt="Profile Picture"
      />
    </nav>
  );
};

export default Navbar;
