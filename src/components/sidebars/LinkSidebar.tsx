import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutContext } from '../../contexts/LayoutContext';
import { mdiTriangleSmallUp } from '@mdi/js';
import Icon from '@mdi/react';

const LinkSidebar = ({ title, path, setSidebarVisibility }) => {
  const { layoutSize } = useContext(LayoutContext);

  return (
    <NavLink
      className={({ isActive }) =>
        isActive
          ? 'text-accent group flex gap-4'
          : 'text-secondary group flex gap-4'
      }
      to={path}
    >
      <Icon
        className="timing group-hover:text-accent text-inherit"
        path={mdiTriangleSmallUp}
        rotate={90}
        size={1}
      />
      <button
        className="w-full text-left text-inherit"
        onClick={() => {
          if (layoutSize !== 'large') {
            setSidebarVisibility(false);
          }
        }}
      >
        <div className="timing group-hover:text-accent text-lg tracking-wide text-inherit">
          {title}
        </div>
      </button>
    </NavLink>
  );
};

export default LinkSidebar;
