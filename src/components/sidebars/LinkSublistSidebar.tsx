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
        className={`${icon && 'pb-2'} text-primary z-10 flex items-center gap-6 pl-4`}
        onClick={(e) => {
          e.stopPropagation();
          setDetailsOpen(!detailsOpen);
        }}
      >
        {icon}
        <p>{title}</p>
        <span
          className={`ml-auto transition duration-300 ${detailsOpen && '-rotate-180'}`}
        >
          <Icon
            path={mdiChevronDown}
            size={1.1}
            className={`text-primary`}
          ></Icon>
        </span>
      </button>
      <div
        className={`${detailsOpen ? 'pt-2' : ''} timing flex flex-col gap-4 pl-6`}
        style={detailsOpen ? { maxHeight: height } : { maxHeight: 0 }}
      >
        {children}
      </div>
    </div>
  );
};

export default LinkSublistSidebar;
