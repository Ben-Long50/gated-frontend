import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import BtnNavbar from './buttons/BtnNavbar';
import { Link } from 'react-router-dom';
import { LayoutContext } from '../contexts/LayoutContext';
import Icon from '@mdi/react';
import { mdiMenu } from '@mdi/js';
import PyramidIcon from './icons/PyramidIcon';
import NavMenuMobile from './NavMenuMobile';
import CharacterIcon from './icons/CharacterIcon';
import NavMenuDesktop from './NavMenuDesktop';
import useSignoutMutation from '../hooks/useSignoutMutation/useSignoutMutation';

const Navbar = ({ setNavbarHeight, setSidebarVisibility }) => {
  const { apiUrl, user } = useContext(AuthContext);
  const { layoutSize } = useContext(LayoutContext);

  const [navMenuVisibility, setNavMenuVisibility] = useState(false);
  const [accountMenuVisibility, setAccountMenuVisibility] = useState(false);

  const signout = useSignoutMutation(apiUrl);

  const navbarRef = useRef(null);

  useEffect(() => {
    const closeMenus = (e) => {
      if (navbarRef.current && !navbarRef.current.contains(e.target)) {
        setNavMenuVisibility(false);
        setAccountMenuVisibility(false);
      }
    };

    document.addEventListener('click', closeMenus);

    return () => {
      document.removeEventListener('click', closeMenus);
    };
  }, []);

  useEffect(() => {
    if (navbarRef.current) {
      setNavbarHeight(navbarRef.current.offsetHeight);
    }
  }, []);

  return layoutSize === 'xsmall' || layoutSize === 'small' ? (
    <nav
      ref={navbarRef}
      className={`bg-primary fixed top-0 z-30 col-span-2 flex w-full flex-col items-center justify-start shadow-md shadow-black`}
    >
      <div className="my-2 flex w-full items-center justify-between px-2">
        <PyramidIcon className="size-10" />
        <div className="flex items-center justify-end gap-4">
          <button
            className={`${navMenuVisibility && 'scale-y-150'} timing z-10`}
            onClick={() => {
              setAccountMenuVisibility(false);
              setNavMenuVisibility(!navMenuVisibility);
            }}
          >
            <Icon path={mdiMenu} size={1.5} className={`text-secondary`} />
          </button>
          <button
            className="z-10"
            onClick={() => {
              setNavMenuVisibility(false);
              setAccountMenuVisibility(!accountMenuVisibility);
            }}
          >
            {user?.profilePicture ? (
              <img
                className="size-10 rounded-full"
                src={user?.profilePicture}
                alt="Profile Picture"
              />
            ) : (
              <CharacterIcon className="size-10" />
            )}
          </button>
        </div>
      </div>
      <NavMenuMobile menuVisibility={navMenuVisibility}>
        <Link className="w-full p-2" to="codex">
          <BtnNavbar
            className="w-full text-left"
            onClick={() => {
              setNavMenuVisibility(false);
              setSidebarVisibility(true);
            }}
          >
            Codex
          </BtnNavbar>
        </Link>
        <hr className="m-0 w-full border-yellow-300 border-opacity-50" />
        <Link className="w-full p-2" to="characters">
          <BtnNavbar
            className="bg-primary text-left"
            onClick={() => {
              setNavMenuVisibility(false);
              setSidebarVisibility(true);
            }}
          >
            Characters
          </BtnNavbar>
        </Link>
      </NavMenuMobile>
      <NavMenuMobile menuVisibility={accountMenuVisibility}>
        <Link className="w-full p-2" to="/error/report">
          <BtnNavbar
            className="w-full text-left"
            onClick={() => {
              setAccountMenuVisibility(false);
            }}
          >
            <div className="flex w-full items-center gap-2">
              <p className="text-inherit">Error report</p>
              <p className="text-tertiary text-sm"> (do not abuse)</p>
            </div>
          </BtnNavbar>
        </Link>
        <BtnNavbar
          className="hover:text-accent timing rounded p-2 hover:-translate-y-0.5 hover:shadow-md hover:shadow-zinc-950"
          onClick={() => {
            setAccountMenuVisibility(false);
            signout.mutate();
          }}
        >
          <div className="flex w-full items-center gap-2">
            <p className="text-inherit">Sign out</p>
          </div>
        </BtnNavbar>
      </NavMenuMobile>
    </nav>
  ) : (
    <nav
      ref={navbarRef}
      className="bg-primary sticky top-0 z-30 col-span-2 flex items-center justify-between gap-4 py-2 pl-4 pr-6 shadow-md shadow-black"
    >
      <PyramidIcon className="size-10" />
      <div className="relative flex items-center justify-items-end gap-10">
        <Link to="codex">
          <BtnNavbar className="bg-primary">Codex</BtnNavbar>
        </Link>
        <Link to="characters">
          <BtnNavbar className="bg-primary">Characters</BtnNavbar>
        </Link>

        <button
          className="z-10 shrink-0"
          onClick={() => {
            setNavMenuVisibility(false);
            setAccountMenuVisibility(!accountMenuVisibility);
          }}
        >
          {user?.profilePicture ? (
            <img
              className="size-10 shrink-0 rounded-full"
              src={user?.profilePicture}
              alt="Profile Picture"
            />
          ) : (
            <CharacterIcon className="size-10" />
          )}
        </button>
        <NavMenuDesktop menuVisibility={accountMenuVisibility}>
          <Link className="w-full" to="/error/report">
            <BtnNavbar
              className="hover:text-accent timing rounded p-2 hover:-translate-y-0.5 hover:shadow-md hover:shadow-zinc-950"
              onClick={() => {
                setAccountMenuVisibility(false);
              }}
            >
              <div className="flex w-full items-center gap-2">
                <p className="text-inherit">Error report</p>
                <p className="text-tertiary text-sm"> (do not abuse)</p>
              </div>
            </BtnNavbar>
          </Link>
          <BtnNavbar
            className="hover:text-accent timing rounded p-2 hover:-translate-y-0.5 hover:shadow-md hover:shadow-zinc-950"
            onClick={() => {
              setAccountMenuVisibility(false);
              signout.mutate();
            }}
          >
            <div className="flex w-full items-center gap-2">
              <p className="text-inherit">Sign out</p>
            </div>
          </BtnNavbar>
        </NavMenuDesktop>
      </div>
    </nav>
  );
};

export default Navbar;
