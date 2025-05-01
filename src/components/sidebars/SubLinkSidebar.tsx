import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LayoutContext } from '../../contexts/LayoutContext';

const SubLinkSidebar = ({
  title,
  path,
  setSidebarVisibility,
}: {
  title: string;
  path: string;
  setSidebarVisibility: (mode: boolean) => void;
}) => {
  const { layoutSize } = useContext(LayoutContext);

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
            setSidebarVisibility(false);
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
