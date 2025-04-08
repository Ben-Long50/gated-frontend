import useActiveCharacterQuery from '../../hooks/useActiveCharacterQuery/useActiveCharacterQuery';
import { ReactNode, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import LinkSidebar from './LinkSidebar';
import { LayoutContext } from '../../contexts/LayoutContext';

const Sidebar = ({
  sidebarVisibility,
  setSidebarVisibility,
  navbarHeight,
  children,
}: {
  sidebarVisibility: boolean;
  setSidebarVisibility: (mode: boolean) => void;
  navbarHeight: number;
  children: ReactNode;
}) => {
  const { apiUrl } = useContext(AuthContext);
  const { mobile } = useContext(LayoutContext);

  const {
    data: character,
    isPending,
    isLoading,
  } = useActiveCharacterQuery(apiUrl);

  if (isPending || isLoading) return <span></span>;

  const navStyle = mobile
    ? sidebarVisibility
      ? 'max-w-75dvw w-full'
      : 'max-w-75dvw w-full -translate-x-full'
    : sidebarVisibility
      ? 'min-w-80 max-w-96'
      : 'min-w-0 max-w-[68px]';

  return (
    <nav
      className={`${navStyle} bg-secondary timing sticky z-20 col-start-1 row-start-2 flex w-auto overflow-x-hidden border-r border-yellow-300 border-opacity-50`}
      style={{
        height: `calc(100dvh - ${navbarHeight}px)`,
        top: `${navbarHeight}px`,
      }}
      onMouseEnter={() => setSidebarVisibility(true)}
      onMouseLeave={() => setSidebarVisibility(false)}
    >
      <div className="scrollbar-secondary flex grow flex-col gap-4 overflow-y-auto overflow-x-hidden px-2 py-4">
        {character && (
          <LinkSidebar
            title={character.firstName + ' ' + character.lastName}
            icon={
              <img
                className="bg-secondary z-10 size-12 rounded-full p-1"
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
        {children}
      </div>
    </nav>
  );
};

export default Sidebar;
