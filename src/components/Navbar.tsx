import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import BtnNavbar from './buttons/BtnNavbar';
import { Link } from 'react-router-dom';
import { LayoutContext } from '../contexts/LayoutContext';
import Icon from '@mdi/react';
import { mdiMenu } from '@mdi/js';
import PyramidIcon from './icons/PyramidIcon';

const Navbar = ({ setNavbarHeight }) => {
  const { user } = useContext(AuthContext);
  const { layoutSize } = useContext(LayoutContext);

  const [menuVisibility, setMenuVisibility] = useState(false);

  const navbarRef = useRef(null);

  const height = '200px';

  useEffect(() => {
    if (navbarRef.current) {
      setNavbarHeight(navbarRef.current.offsetHeight);
    }
  }, []);

  return layoutSize === 'xsmall' || layoutSize === 'small' ? (
    <nav
      ref={navbarRef}
      className={`bg-primary sticky top-0 z-30 col-span-2 flex w-full flex-col items-center justify-start py-1 shadow-md shadow-black`}
    >
      <div className="flex w-full items-center justify-between px-4">
        <PyramidIcon className="size-10" />
        <button
          className="z-10"
          onClick={() => setMenuVisibility(!menuVisibility)}
        >
          <Icon path={mdiMenu} size={1.5} className="text-secondary" />
        </button>
      </div>
      <div
        className={`${!menuVisibility ? 'invisible opacity-0' : 'py-4 opacity-100'} timing bg-primary flex w-full flex-col items-start justify-items-end gap-4 overflow-hidden px-4`}
        style={menuVisibility ? { maxHeight: height } : { maxHeight: 0 }}
      >
        <Link className="w-full" to="codex">
          <BtnNavbar
            className="w-full text-left"
            onClick={() => setMenuVisibility(false)}
          >
            Codex
          </BtnNavbar>
        </Link>
        <hr className="m-0 w-full border-yellow-300 border-opacity-50" />
        <Link className="w-full" to="characters">
          <BtnNavbar
            className="bg-primary text-left"
            onClick={() => setMenuVisibility(false)}
          >
            Character
          </BtnNavbar>
        </Link>
        <hr className="m-0 w-full border-yellow-300 border-opacity-50" />
        <Link className="w-full" to="account">
          <div className="flex w-full items-center justify-start gap-4">
            <img
              className="size-10 rounded-full"
              src={user?.profilePicture}
              alt="Profile Picture"
            />
            <p className="text-xl">Account</p>
          </div>
        </Link>
      </div>
    </nav>
  ) : (
    <nav
      ref={navbarRef}
      className="bg-primary sticky top-0 z-30 col-span-2 flex items-center justify-between gap-4 py-2 pl-4 pr-6 shadow-md shadow-black"
    >
      <PyramidIcon className="size-10" />
      <div className="flex items-center justify-items-end gap-10">
        <Link to="codex">
          <BtnNavbar className="bg-primary">Codex</BtnNavbar>
        </Link>
        <Link to="characters">
          <BtnNavbar className="bg-primary">Character</BtnNavbar>
        </Link>
        <Link to="account">
          <img
            className="size-10 rounded-full"
            src={user?.profilePicture}
            alt="Profile Picture"
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
