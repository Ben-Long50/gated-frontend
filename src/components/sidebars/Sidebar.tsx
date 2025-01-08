import Icon from '@mdi/react';
import { mdiMenuClose, mdiMenuOpen } from '@mdi/js';

const Sidebar = ({
  sidebarVisibility,
  setSidebarVisibility,
  navbarHeight,
  children,
}) => {
  return (
    <nav
      className={`z-20 ${!sidebarVisibility && '-translate-x-full'} bg-secondary timing sticky z-10 col-start-1 row-start-2 flex max-w-96 border-r border-yellow-300 border-opacity-50`}
      style={{
        height: `calc(100dvh - ${navbarHeight}px)`,
        top: `${navbarHeight}px`,
      }}
    >
      <div className="scrollbar-secondary flex grow flex-col gap-2 overflow-y-auto px-4 py-8">
        {children}
      </div>
      <button
        className={`${!sidebarVisibility ? '-right-3 translate-x-full' : 'right-3'} timing accent-primary absolute bottom-3 z-10 flex size-14 shrink-0 items-center justify-center rounded-full text-2xl font-semibold shadow-md shadow-zinc-950 sm:pt-1`}
        onClick={() => setSidebarVisibility(!sidebarVisibility)}
      >
        {!sidebarVisibility ? (
          <Icon path={mdiMenuClose} size={1.75} />
        ) : (
          <Icon path={mdiMenuOpen} size={1.75} />
        )}
      </button>
    </nav>
  );
};

export default Sidebar;
