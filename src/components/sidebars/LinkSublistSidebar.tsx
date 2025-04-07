import { mdiChevronDown } from '@mdi/js';
import Icon from '@mdi/react';
import { Children, isValidElement, ReactNode, useState } from 'react';

const LinkSublistSidebar = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
}) => {
  const [detailsOpen, setDetailsOpen] = useState(false);

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
  const height = countChildren(children) * 44 + 4;

  return (
    <div className={`timing relative flex flex-col pr-2 clip-4`}>
      <button
        className={`text-primary group z-10 flex items-center gap-6 pl-4`}
        onClick={(e) => {
          e.stopPropagation();
          setDetailsOpen(!detailsOpen);
        }}
      >
        {icon}
        <p className="group-hover:text-accent timing whitespace-nowrap">
          {title}
        </p>
        <span
          className={`ml-auto transition duration-300 ${detailsOpen && '-rotate-180'}`}
        >
          <Icon
            path={mdiChevronDown}
            size={1.1}
            className={`text-primary group-hover:text-accent timing`}
          ></Icon>
        </span>
      </button>
      <div
        className={`timing ${detailsOpen && 'mt-4'} ml-6 flex flex-col gap-4 border-l border-gray-400`}
        style={detailsOpen ? { maxHeight: height } : { maxHeight: 0 }}
      >
        {children}
      </div>
    </div>
  );
};

export default LinkSublistSidebar;
