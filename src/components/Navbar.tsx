import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { mdiPyramid } from '@mdi/js';
import Icon from '@mdi/react';
import { ThemeContext } from '../contexts/ThemeContext';

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const { accentPrimary } = useContext(ThemeContext);

  return (
    <nav className="z-20 col-span-2 flex items-center justify-between gap-4 px-4 py-2 shadow-md shadow-black">
      <Icon path={mdiPyramid} size={1.75} color={accentPrimary} />
      <img
        className="size-10"
        src={user?.profilePicture}
        alt="Profile Picture"
      />
    </nav>
  );
};

export default Navbar;
