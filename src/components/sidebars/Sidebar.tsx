import {
  ReactNode,
  RefObject,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import LinkSidebar from './LinkSidebar';
import { LayoutContext } from '../../contexts/LayoutContext';
import { mdiCartOutline } from '@mdi/js';
import Icon from '@mdi/react';
import CharacterIcon from '../icons/CharacterIcon';
import CharacterPictureRound from '../CharacterPictureRound';
import useCharacters from 'src/hooks/useCharacters';
import { ThemeContext } from 'src/contexts/ThemeContext';

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
  const { mobile } = useContext(LayoutContext);
  const { accentPrimary } = useContext(ThemeContext);

  const sidebarRef = useRef(null);

  const { activeCharacter, isLoading } = useCharacters();

  const cartLength = useMemo(() => {
    return Object.values(activeCharacter?.characterCart || {})
      .filter(Array.isArray)
      .flat()
      .reduce((sum, item) => sum + item.quantity, 0);
  }, [activeCharacter]);

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
      className={`${navStyle} bg-secondary timing sticky z-20 col-start-1 row-start-2 flex w-auto overflow-x-hidden border-r`}
      style={{
        height: `calc(100dvh - ${navbarHeight}px)`,
        top: `${navbarHeight}px`,
        borderColor: accentPrimary,
      }}
      onMouseEnter={() => {
        if (!mobile) setSidebarVisibility(true);
      }}
      onMouseLeave={() => {
        if (!mobile) setSidebarVisibility(false);
      }}
    >
      <div className="scrollbar-secondary flex grow flex-col gap-4 overflow-y-auto overflow-x-hidden px-2 py-4">
        {isLoading ? (
          <CharacterIcon className="text-secondary size-12 p-1" />
        ) : (
          activeCharacter && (
            <LinkSidebar
              title={activeCharacter.firstName + ' ' + activeCharacter.lastName}
              icon={<CharacterPictureRound character={activeCharacter} />}
              path={`/glam/characters/${activeCharacter.id}`}
              sidebarVisibility={sidebarVisibility}
              setSidebarVisibility={setSidebarVisibility}
            />
          )
        )}
        {!isLoading && cartLength > 0 && (
          <LinkSidebar
            title={activeCharacter.firstName + "'s cart"}
            icon={
              <div className="relative">
                <Icon
                  className="bg-secondary group-hover:text-accent timing size-12 shrink-0 p-2"
                  path={mdiCartOutline}
                />
                <p
                  className="shadow-color absolute right-0 top-0 flex h-6 min-w-6 items-center justify-center rounded-full pt-0.5 text-center text-base font-semibold shadow-md dark:text-gray-950"
                  style={{ backgroundColor: accentPrimary }}
                >
                  {cartLength}
                </p>
              </div>
            }
            path={`/glam/characters/${activeCharacter.id}/cart`}
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
