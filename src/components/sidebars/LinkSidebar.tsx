import { ReactNode, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutContext } from '../../contexts/LayoutContext';

const LinkSidebar = ({
  title,
  icon,
  path,
  sidebarVisibility,
  setSidebarVisibility,
  onClick,
}: {
  title: string;
  icon: ReactNode;
  path: string;
  sidebarVisibility: boolean;
  setSidebarVisibility: (mode: boolean) => void;
  onClick?: () => void;
}) => {
  const { layoutSize } = useContext(LayoutContext);

  return (
    <NavLink
      className={({ isActive }) =>
        isActive ? 'text-accent group flex' : 'text-secondary group flex'
      }
      to={path}
      end
    >
      {icon}
      {
        <button
          className={`${!sidebarVisibility && 'invisible -translate-x-full opacity-0'} timing w-full pl-4 text-left text-inherit`}
          onClick={() => {
            if (layoutSize !== 'large') {
              setSidebarVisibility(false);
              if (onClick) {
                onClick();
              }
            }
          }}
        >
          <div className="timing group-hover:text-accent whitespace-nowrap text-xl tracking-wide text-inherit">
            {title}
          </div>
        </button>
      }
    </NavLink>
  );
};

export default LinkSidebar;
