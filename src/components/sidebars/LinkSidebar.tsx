import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutContext } from '../../contexts/LayoutContext';

const LinkSidebar = ({
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
    <NavLink
      className={({ isActive }) =>
        isActive
          ? 'text-accent group flex gap-4'
          : 'text-secondary group flex gap-4'
      }
      to={path}
      end
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
    </NavLink>
  );
};

export default LinkSidebar;
