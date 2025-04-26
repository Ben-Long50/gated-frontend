import useActiveCharacterQuery from '../../hooks/useActiveCharacterQuery/useActiveCharacterQuery';
import { ReactNode, RefObject, useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import LinkSidebar from './LinkSidebar';
import { LayoutContext } from '../../contexts/LayoutContext';
import { mdiCartOutline } from '@mdi/js';
import Icon from '@mdi/react';

const Sidebar = ({
  sidebarVisibility,
  setSidebarVisibility,
  navbarHeight,
  navbarRef,
  children,
}: {
  sidebarVisibility: boolean;
  setSidebarVisibility: (mode: boolean) => void;
  navbarHeight: number;
  navbarRef: RefObject;
  children: ReactNode;
}) => {
  const { apiUrl } = useContext(AuthContext);
  const { mobile } = useContext(LayoutContext);

  const sidebarRef = useRef(null);

  const {
    data: character,
    isPending,
    isLoading,
  } = useActiveCharacterQuery(apiUrl);

  useEffect(() => {
    const closeSidebar = (e: Event) => {
      if (
        mobile &&
        sidebarVisibility &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target) &&
        !navbarRef.current.contains(e.target)
      ) {
        setSidebarVisibility(false);
      }
    };

    document.addEventListener('click', closeSidebar);

    return () => {
      document.removeEventListener('click', closeSidebar);
    };
  }, [mobile, setSidebarVisibility, sidebarVisibility, sidebarRef]);

  const cartLength = Object.values(character?.characterCart || {})
    .filter((value) => Array.isArray(value))
    .flat().length;

  if (isPending || isLoading) return <span></span>;

  const navStyle = mobile
    ? sidebarVisibility
      ? 'w-75vw'
      : 'w-75vw -translate-x-full'
    : sidebarVisibility
      ? 'min-w-80 max-w-96'
      : 'min-w-0 max-w-[68px]';

  return (
    <nav
      ref={sidebarRef}
      className={`${navStyle} bg-secondary timing sticky z-20 col-start-1 row-start-2 flex w-auto overflow-x-hidden border-r border-yellow-300 border-opacity-50`}
      style={{
        height: `calc(100dvh - ${navbarHeight}px)`,
        top: `${navbarHeight}px`,
      }}
      onMouseEnter={() => {
        if (!mobile) setSidebarVisibility(true);
      }}
      onMouseLeave={() => {
        if (!mobile) setSidebarVisibility(false);
      }}
    >
      <div className="scrollbar-secondary flex grow flex-col gap-4 overflow-y-auto overflow-x-hidden px-2 py-4">
        {character && (
          <LinkSidebar
            title={character.firstName + ' ' + character.lastName}
            icon={
              <img
                className="bg-secondary z-10 size-12 shrink-0 rounded-full p-1"
                src={character.picture.imageUrl}
                alt={
                  character.firstName +
                  ' ' +
                  character.lastName +
                  "'s profile picture"
                }
              />
            }
            path={`/glam/characters/${character.id}`}
            sidebarVisibility={sidebarVisibility}
            setSidebarVisibility={setSidebarVisibility}
          />
        )}
        {cartLength > 0 && (
          <LinkSidebar
            title={character.firstName + "'s cart"}
            icon={
              <div className="relative">
                <Icon
                  className="bg-secondary group-hover:text-accent timing size-12 shrink-0 p-2"
                  path={mdiCartOutline}
                />
                <p className="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-yellow-300 pt-1 text-center text-base font-semibold dark:text-gray-950">
                  {cartLength}
                </p>
              </div>
            }
            path={`/glam/characters/${character.id}/cart`}
            sidebarVisibility={sidebarVisibility}
            setSidebarVisibility={setSidebarVisibility}
          />
        )}
        {children}
      </div>
    </nav>
  );
};

export default Sidebar;
