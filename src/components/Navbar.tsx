import { RefObject, useContext, useEffect, useLayoutEffect } from 'react';
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
import { ThemeContext } from 'src/contexts/ThemeContext';
import useNavigationStore from 'src/stores/navbarStore';

const Navbar = ({
  navbarRef,
}: {
  navbarRef: RefObject<null | HTMLElement>;
}) => {
  const { user } = useContext(AuthContext);
  const { mobile } = useContext(LayoutContext);
  const { accentPrimary } = useContext(ThemeContext);

  const navbar = useNavigationStore((state) => state.navbar);
  const sidebar = useNavigationStore((state) => state.sidebar);
  const setNavbar = useNavigationStore((state) => state.setNavbar);
  const setSidebar = useNavigationStore((state) => state.setSidebar);
  const closeBars = useNavigationStore((state) => state.closeBars);
  const setNavbarHeight = useNavigationStore((state) => state.setNavbarHeight);

  useLayoutEffect(() => {
    if (navbarRef.current) {
      const rect = navbarRef.current.getBoundingClientRect();
      setNavbarHeight(rect.height);
    }
  }, [navbarRef]);

  return mobile ? (
    <nav
      ref={navbarRef}
      className={`bg-primary timing shadow-color fixed top-0 z-30 col-span-2 flex w-full flex-col items-center justify-start shadow-md`}
    >
      <div className="my-2 flex w-full items-center justify-between px-2">
        <button
          onClick={() => {
            setNavbar(false);
            setSidebar(!sidebar);
          }}
        >
          <Icon
            className="text-secondary size-10"
            path={sidebar ? mdiMenuOpen : mdiMenuClose}
          />
        </button>
        <div className="flex items-center justify-end gap-4">
          <Link
            className="relative"
            to={`account/${user?.id}/notifications`}
            onClick={() => {
              closeBars();
            }}
          >
            <Icon path={mdiBellOutline} className="text-secondary size-8" />
            {user?._count.receivedNotifications > 0 && (
              <div
                className="shadow-color absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full shadow-md"
                style={{ backgroundColor: accentPrimary }}
              >
                <p className="text-sm font-semibold !text-zinc-900 sm:pt-0.5">
                  {user?._count?.receivedNotifications}
                </p>
              </div>
            )}
          </Link>
          <button
            className={`${navbar && 'scale-y-150'} timing z-10`}
            onClick={() => {
              setSidebar(false);
              setNavbar(!navbar);
            }}
          >
            <Icon path={mdiMenu} size={1.5} className={`text-secondary`} />
          </button>
          <Link to={`account/${user.id}`} className="flex items-center">
            <button
              className="z-10"
              onClick={() => {
                setNavbar(false);
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
      <NavMenuMobile>
        <Link className="w-full p-2" to="campaigns">
          <BtnNavbar
            className="w-full text-left"
            onClick={() => {
              setNavbar(false);
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
              setNavbar(false);
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
              setNavbar(false);
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
      className="bg-primary shadow-color timing fixed top-0 z-30 flex w-full items-center justify-between gap-4 px-4 py-2 shadow-md"
    >
      <Link to="/glam/codex">
        <h2
          className="text-shadow-color text-shadow -mb-2 pt-0.5 font-zen !text-4xl italic text-shadow-x-1 text-shadow-y-1"
          style={{ color: accentPrimary }}
        >
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
            <div
              className="shadow-color absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full shadow-md"
              style={{ backgroundColor: accentPrimary }}
            >
              <p className="text-sm font-semibold !text-zinc-900 sm:pt-0.5">
                {user?._count?.receivedNotifications}
              </p>
            </div>
          )}
        </Link>
        <Link to={`account/${user?.id}`} className="z-10 shrink-0">
          <AccountPicture user={user} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
