import {
  RefObject,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { AuthContext } from '../contexts/AuthContext';
import BtnNavbar from './buttons/BtnNavbar';
import { Link } from 'react-router-dom';
import { LayoutContext } from '../contexts/LayoutContext';
import Icon from '@mdi/react';
import { mdiBellOutline, mdiMenu, mdiMenuClose, mdiMenuOpen } from '@mdi/js';
import NavMenuMobile from './NavMenuMobile';
import CharacterIcon from './icons/CharacterIcon';
import AccountPicture from './AccountPicture';
import Divider from './Divider';

const Navbar = ({
  setNavbarHeight,
  sidebarVisibility,
  setSidebarVisibility,
  navbarRef,
}: {
  setNavbarHeight: (height: number) => void;
  sidebarVisibility: boolean;
  setSidebarVisibility: (mode: boolean) => void;
  navbarRef: RefObject;
}) => {
  const { user } = useContext(AuthContext);
  const { mobile } = useContext(LayoutContext);

  const [navMenuVisibility, setNavMenuVisibility] = useState(false);
  const [accountMenuVisibility, setAccountMenuVisibility] = useState(false);

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

  useLayoutEffect(() => {
    if (navbarRef.current) {
      const rect = navbarRef.current.getBoundingClientRect();
      setNavbarHeight(rect.height);
    }
  }, [navbarRef]);

  return mobile ? (
    <nav
      ref={navbarRef}
      className={`bg-primary fixed top-0 z-30 col-span-2 flex w-full flex-col items-center justify-start shadow-md shadow-black`}
    >
      <div className="my-2 flex w-full items-center justify-between px-2">
        <button onClick={() => setSidebarVisibility(!sidebarVisibility)}>
          {!sidebarVisibility ? (
            <Icon className="text-secondary size-10" path={mdiMenuClose} />
          ) : (
            <Icon className="text-secondary size-10" path={mdiMenuOpen} />
          )}
        </button>
        <div className="flex items-center justify-end gap-4">
          <Link className="relative" to={`account/${user?.id}/notifications`}>
            <Icon path={mdiBellOutline} className="text-secondary size-8" />
            {user?._count.receivedNotifications > 0 && (
              <div className="absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full bg-yellow-300 shadow-md shadow-black">
                <p className="text-sm font-semibold !text-zinc-900 sm:pt-0.5">
                  {user?._count?.receivedNotifications}
                </p>
              </div>
            )}
          </Link>
          <button
            className={`${navMenuVisibility && 'scale-y-150'} timing z-10`}
            onClick={() => {
              setAccountMenuVisibility(false);
              setNavMenuVisibility(!navMenuVisibility);
            }}
          >
            <Icon path={mdiMenu} size={1.5} className={`text-secondary`} />
          </button>
          <Link to={`account/${user.id}`} className="flex items-center">
            <button
              className="z-10"
              onClick={() => {
                setSidebarVisibility(true);
              }}
            >
              {user?.profilePicture ? (
                <img
                  className="size-10 rounded-full"
                  src={user?.profilePicture}
                  alt="Profile Picture"
                />
              ) : (
                <CharacterIcon className="text-secondary size-10" />
              )}
            </button>
          </Link>
        </div>
      </div>
      <NavMenuMobile menuVisibility={navMenuVisibility}>
        <Link className="w-full p-2" to="campaigns">
          <BtnNavbar
            className="w-full text-left"
            onClick={() => {
              setNavMenuVisibility(false);
              setSidebarVisibility(true);
            }}
          >
            Campaigns
          </BtnNavbar>
        </Link>
        <Divider />
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
        <Divider />
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
    </nav>
  ) : (
    <nav
      ref={navbarRef}
      className="bg-primary sticky top-0 z-30 col-span-2 flex items-center justify-between gap-4 py-2 pl-4 pr-6 shadow-md shadow-black"
    >
      <Link to="/glam/codex">
        <h2 className="text-accent text-shadow -mb-2 pt-0.5 font-zen !text-4xl italic text-shadow-x-1 text-shadow-y-1 text-shadow-black">
          EDO
        </h2>
      </Link>
      <div className="relative flex items-center justify-items-end gap-10">
        <Link to="campaigns">
          <BtnNavbar className="bg-primary">Campaigns</BtnNavbar>
        </Link>
        <Link to="codex">
          <BtnNavbar className="bg-primary">Codex</BtnNavbar>
        </Link>
        <Link to="characters">
          <BtnNavbar className="bg-primary">Characters</BtnNavbar>
        </Link>
        <Link className="relative" to={`account/${user?.id}/notifications`}>
          <Icon path={mdiBellOutline} className="text-secondary size-8" />
          {user?._count.receivedNotifications > 0 && (
            <div className="absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full bg-yellow-300 shadow-md shadow-black">
              <p className="text-sm font-semibold !text-zinc-900 sm:pt-0.5">
                {user?._count?.receivedNotifications}
              </p>
            </div>
          )}
        </Link>
        <Link
          to={`account/${user?.id}`}
          className="z-10 shrink-0"
          onClick={() => {
            setNavMenuVisibility(false);
            setAccountMenuVisibility(!accountMenuVisibility);
          }}
        >
          <AccountPicture user={user} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
