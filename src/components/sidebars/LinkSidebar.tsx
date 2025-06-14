import { ReactNode, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutContext } from '../../contexts/LayoutContext';
import useNavigationStore from 'src/stores/navbarStore';

const LinkSidebar = ({
  title,
  icon,
  path,
  onClick,
}: {
  title: string;
  icon: ReactNode;
  path: string;
  onClick?: () => void;
}) => {
  const { mobile } = useContext(LayoutContext);

  const sidebar = useNavigationStore((state) => state.sidebar);
  const setSidebar = useNavigationStore((state) => state.setSidebar);

  return (
    <NavLink
      className={({ isActive }) =>
        isActive ? 'text-accent group flex' : 'text-secondary group flex'
      }
      to={path}
      onClick={() => {
        if (mobile) {
          setSidebar(false);
        }
        if (onClick) {
          onClick();
        }
      }}
      end
    >
      {icon}
      {
        <button
          className={`${!sidebar && 'invisible -translate-x-full opacity-0'} timing overflow-hidden pl-4 text-left text-inherit`}
        >
          <div className="timing group-hover:text-accent max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-xl tracking-wide text-inherit">
            {title}
          </div>
        </button>
      }
    </NavLink>
  );
};

export default LinkSidebar;
