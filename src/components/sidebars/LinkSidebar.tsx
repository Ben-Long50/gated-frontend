import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LayoutContext } from '../../contexts/LayoutContext';
import { mdiTriangleSmallUp } from '@mdi/js';
import Icon from '@mdi/react';

const LinkSidebar = ({ title, path, setSidebarVisibility }) => {
  const { layoutSize } = useContext(LayoutContext);

  return (
    <Link className="group flex gap-4 clip-4" to={path}>
      <Icon
        className="text-secondary timing group-hover:text-accent"
        path={mdiTriangleSmallUp}
        rotate={90}
        size={1}
      />
      <button
        className="w-full text-left"
        onClick={() => {
          if (layoutSize !== 'large') {
            setSidebarVisibility(false);
          }
        }}
      >
        <p className="text-secondary timing group-hover:text-accent">{title}</p>
      </button>
    </Link>
  );
};

export default LinkSidebar;
