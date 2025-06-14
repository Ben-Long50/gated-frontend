import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LayoutContext } from '../../contexts/LayoutContext';
import useNavigationStore from 'src/stores/navbarStore';

const SubLinkSidebar = ({ title, path }: { title: string; path: string }) => {
  const { layoutSize } = useContext(LayoutContext);

  const setSidebar = useNavigationStore((state) => state.setSidebar);

  return (
    <Link
      className="text-secondary group flex gap-4"
      to={path}
      state={{ title }}
    >
      <button
        className="w-full pl-4 text-left text-inherit"
        onClick={() => {
          if (layoutSize !== 'large') {
            setSidebar(false);
          }
        }}
      >
        <div className="timing group-hover:text-accent whitespace-nowrap text-xl tracking-wide text-inherit">
          {title}
        </div>
      </button>
    </Link>
  );
};

export default SubLinkSidebar;
