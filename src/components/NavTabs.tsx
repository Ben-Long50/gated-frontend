import { ReactNode, useContext } from 'react';
import { LayoutContext } from 'src/contexts/LayoutContext';
import { ThemeContext } from 'src/contexts/ThemeContext';
import useNavigationStore from 'src/stores/navbarStore';

const NavTabs = ({ children }: { children: ReactNode }) => {
  const { accentPrimary } = useContext(ThemeContext);
  const { mobile } = useContext(LayoutContext);

  const navbarHeight = useNavigationStore((state) => state.navbarHeight);

  return (
    <div
      className="bg-primary shadow-color sticky z-10 grid w-full grid-cols-2 items-center gap-8 rounded-lg border p-4 shadow-lg"
      style={{
        borderColor: accentPrimary,
        top: mobile ? `${navbarHeight + 16}px` : `${navbarHeight + 32}px`,
      }}
    >
      {children}
    </div>
  );
};

export default NavTabs;
