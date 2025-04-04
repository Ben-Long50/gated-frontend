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
      className={`${sidebarVisibility ? 'min-w-80 max-w-full' : 'min-w-0 max-w-[68px]'} bg-secondary timing sticky z-20 col-start-1 row-start-2 flex w-auto max-w-96 overflow-x-hidden border-r border-yellow-300 border-opacity-50`}
      style={{
        height: `calc(100dvh - ${navbarHeight}px)`,
        top: `${navbarHeight}px`,
      }}
      onMouseEnter={() => setSidebarVisibility(true)}
      onMouseLeave={() => setSidebarVisibility(false)}
    >
      <div className="scrollbar-secondary flex grow flex-col gap-4 overflow-y-auto overflow-x-hidden px-2 py-4">
        {children}
      </div>
      {/* <button
        className={`${!sidebarVisibility ? '-right-3 translate-x-full' : 'right-3'} timing accent-primary absolute bottom-3 z-10 flex size-14 shrink-0 items-center justify-center rounded-full text-2xl font-semibold shadow-md shadow-zinc-950 sm:pt-1`}
        onClick={() => setSidebarVisibility(!sidebarVisibility)}
      >
        {!sidebarVisibility ? (
          <Icon path={mdiMenuClose} size={1.75} />
        ) : (
          <Icon path={mdiMenuOpen} size={1.75} />
        )}
      </button> */}
    </nav>
  );
};

export default Sidebar;
