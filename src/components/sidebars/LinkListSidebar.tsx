import { mdiChevronDown } from '@mdi/js';
import Icon from '@mdi/react';
import { Children, isValidElement, ReactNode, useState } from 'react';
import useNavigationStore from 'src/stores/navbarStore';

const LinkListSidebar = ({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) => {
  const [detailsOpen, setDetailsOpen] = useState(false);

  const sidebar = useNavigationStore((state) => state.sidebar);

  function countChildren(children: ReactNode) {
    let count = 0;

    function recurse(childNodes: ReactNode) {
      Children.forEach(childNodes, (child) => {
        count++;
        if (isValidElement(child) && child.props.children) {
          recurse(child.props.children);
        }
      });
    }

    recurse(children);

    return count;
  }

  const count = countChildren(children);

  const height = count * 60;

  return (
    <div className={`timing relative flex flex-col clip-4`}>
      <button
        className="text-primary group z-10 flex items-center"
        onClick={(e) => {
          e.stopPropagation();
          setDetailsOpen(!detailsOpen);
        }}
      >
        {icon}
        {
          <div
            className={`${!sidebar && 'invisible -translate-x-full opacity-0'} timing flex w-full items-center justify-between`}
          >
            <p className="group-hover:text-accent timing whitespace-nowrap pl-4 text-inherit">
              {title}
            </p>
            <span
              className={`ml-auto transition duration-300 ${detailsOpen && '-rotate-180'}`}
            >
              <Icon
                path={mdiChevronDown}
                size={1.1}
                className={`text-primary group-hover:text-accent`}
              ></Icon>
            </span>
          </div>
        }
      </button>
      <div
        className={`timing flex flex-col gap-4`}
        style={
          detailsOpen && sidebar ? { maxHeight: height } : { maxHeight: 0 }
        }
      >
        {
          <div
            className={`${detailsOpen && 'mt-2'} timing ml-4 flex flex-col gap-4 border-l border-gray-400`}
          >
            {children}
          </div>
        }
      </div>
    </div>
  );
};

export default LinkListSidebar;
