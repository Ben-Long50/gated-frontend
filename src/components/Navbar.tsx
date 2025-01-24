import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import BtnNavbar from './buttons/BtnNavbar';
import { Link } from 'react-router-dom';
import { LayoutContext } from '../contexts/LayoutContext';
import Icon from '@mdi/react';
import { mdiCartOutline, mdiMenu } from '@mdi/js';
import PyramidIcon from './icons/PyramidIcon';
import NavMenuMobile from './NavMenuMobile';
import CharacterIcon from './icons/CharacterIcon';
import NavMenuDesktop from './NavMenuDesktop';
import useSignoutMutation from '../hooks/useSignoutMutation/useSignoutMutation';
import useActiveCharacterQuery from '../hooks/useActiveCharacterQuery/useActiveCharacterQuery';
import Loading from './Loading';

const Navbar = ({ setNavbarHeight, setSidebarVisibility }) => {
  const { apiUrl, user } = useContext(AuthContext);
  const { layoutSize } = useContext(LayoutContext);

  const [navMenuVisibility, setNavMenuVisibility] = useState(false);
  const [accountMenuVisibility, setAccountMenuVisibility] = useState(false);
  const [characterImage, setCharacterImage] = useState('');

  const {
    data: character,
    isPending,
    isLoading,
  } = useActiveCharacterQuery(apiUrl);

  const cartLength = Object.values(character?.characterCart || {})
    .filter((value) => Array.isArray(value))
    .flat().length;

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
  }, [navbarRef]);

  useMemo(() => {
    if (character?.picture.imageUrl) {
      const splitUrl = character?.picture.imageUrl.split('upload/');

      setCharacterImage(
        splitUrl[0].concat('upload/w_40,c_scale/').concat(splitUrl[1]),
      );
    }
  }, [character]);

  useEffect(() => {
    if (window.cloudinary) {
      const cl = window.cloudinary.Cloudinary.new({
        cloud_name: import.meta.env.VITE_CLOUD_NAME,
      });

      cl.responsive();
    }
  }, [character]);

  if (isLoading || isPending) return <Loading />;

  return layoutSize === 'xsmall' || layoutSize === 'small' ? (
    <nav
      ref={navbarRef}
      className={`bg-primary fixed top-0 z-30 col-span-2 flex w-full flex-col items-center justify-start shadow-md shadow-black`}
    >
      <div className="my-2 flex w-full items-center justify-between px-2">
        <div className="flex items-center gap-4">
          {character ? (
            <div className="flex items-center gap-4">
              <Link
                className="group flex items-center gap-4 pt-1.5"
                to={`/glam/characters/${character.id}`}
              >
                <img
                  className="size-10 rounded-full"
                  src={characterImage}
                  alt={
                    character.firstName +
                    ' ' +
                    character.lastName +
                    "'s profile picture"
                  }
                />
                <h3 className="timing group-hover:text-accent">
                  {character.firstName + ' ' + character.lastName}
                </h3>
              </Link>
              {cartLength > 0 && (
                <Link
                  to={`/glam/characters/${character.id}/cart`}
                  className="group my-auto flex items-center"
                >
                  <Icon
                    className="text-secondary group-hover:text-accent timing"
                    path={mdiCartOutline}
                    size={1.35}
                  />
                  <p className="flex h-5 min-w-5 items-center justify-center rounded-full bg-yellow-300 text-center text-base font-semibold dark:text-gray-950">
                    {cartLength}
                  </p>
                </Link>
              )}
            </div>
          ) : (
            <Link to="/glam/codex">
              <PyramidIcon className="size-10" />
            </Link>
          )}
        </div>
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
        {(user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
          <Link className="w-full p-2" to="/glam/codex/patchNotes/create">
            <BtnNavbar
              className="w-full text-left"
              onClick={() => {
                setAccountMenuVisibility(false);
              }}
            >
              <div className="flex w-full items-center gap-2">
                <p className="text-inherit">Create patch note</p>
              </div>
            </BtnNavbar>
          </Link>
        )}
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
      <div className="items-cente flex gap-8">
        {character ? (
          <div className="flex items-center gap-4">
            <Link
              className="group flex items-center gap-4 pt-1.5"
              to={`/glam/characters/${character.id}`}
            >
              <img
                className="size-10 rounded-full"
                src={characterImage}
                alt={
                  character.firstName +
                  ' ' +
                  character.lastName +
                  "'s profile picture"
                }
              />
              <h3 className="timing group-hover:text-accent">
                {character.firstName + ' ' + character.lastName}
              </h3>
            </Link>
            {cartLength > 0 && (
              <Link
                to={`/glam/characters/${character.id}/cart`}
                className="group my-auto flex items-center"
              >
                <Icon
                  className="text-secondary group-hover:text-accent timing"
                  path={mdiCartOutline}
                  size={1.35}
                />
                <p className="flex h-5 min-w-5 items-center justify-center rounded-full bg-yellow-300 text-center text-base font-semibold dark:text-gray-950">
                  {cartLength}
                </p>
              </Link>
            )}
          </div>
        ) : (
          <Link to="/glam/codex">
            <PyramidIcon className="size-10" />
          </Link>
        )}
      </div>

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
          {user?.role === 'SUPERADMIN' && (
            <Link className="w-full" to="/glam/error">
              <BtnNavbar
                className="timing rounded p-2 hover:-translate-y-0.5 hover:shadow-md hover:shadow-zinc-950"
                onClick={() => {
                  setAccountMenuVisibility(false);
                }}
              >
                <div className="hover:text-accent flex w-full items-center gap-2 text-left">
                  <p className="hover:text-accent">Error reports</p>
                </div>
              </BtnNavbar>
            </Link>
          )}
          {(user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') && (
            <Link className="w-full" to="/glam/codex/patchNotes/create">
              <BtnNavbar
                className="timing rounded p-2 hover:-translate-y-0.5 hover:shadow-md hover:shadow-zinc-950"
                onClick={() => {
                  setAccountMenuVisibility(false);
                }}
              >
                <p className="hover:text-accent w-full text-left">
                  Create patch note
                </p>
              </BtnNavbar>
            </Link>
          )}

          <Link className="w-full" to="/error/report">
            <BtnNavbar
              className="timing rounded p-2 hover:-translate-y-0.5 hover:shadow-md hover:shadow-zinc-950"
              onClick={() => {
                setAccountMenuVisibility(false);
              }}
            >
              <div className="hover:text-accent flex w-full items-center gap-2 text-left">
                <p className="hover:text-accent">Error report</p>
                <p className="text-tertiary text-sm"> (do not abuse)</p>
              </div>
            </BtnNavbar>
          </Link>
          <BtnNavbar
            className="timing rounded p-2 hover:-translate-y-0.5 hover:shadow-md hover:shadow-zinc-950"
            onClick={() => {
              setAccountMenuVisibility(false);
              signout.mutate();
            }}
          >
            <div className="flex w-full items-center gap-2">
              <p className="hover:text-accent w-full text-left">Sign out</p>
            </div>
          </BtnNavbar>
        </NavMenuDesktop>
      </div>
    </nav>
  );
};

export default Navbar;
