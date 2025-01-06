import ThemeContainer from '../../components/ThemeContainer';
import { mdiChevronDown } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useState } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

const LinkListSidebar = ({ title, children, numberOfEntries }) => {
  const { accentPrimary } = useContext(ThemeContext);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [hover, setHover] = useState(false);

  const height = (numberOfEntries + 1 || children.length) * 44 + 16;

  return (
    <ThemeContainer
      className={`timing w-full rounded-br-4xl rounded-tl-4xl ${detailsOpen && 'shadow-list z-10 shadow-slate-950'}`}
      chamfer="16"
      borderColor={hover ? accentPrimary : 'transparent'}
    >
      <div
        className="bg-secondary relative flex flex-col pr-3 clip-4"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <button
          className="text-primary z-10 flex items-center gap-6 p-2 pl-4"
          onClick={(e) => {
            e.stopPropagation();
            setDetailsOpen(!detailsOpen);
          }}
        >
          {title}
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
          className={`${detailsOpen ? 'pb-4 pt-2' : ''} timing flex flex-col gap-4 pl-6`}
          style={detailsOpen ? { maxHeight: height } : { maxHeight: 0 }}
        >
          {children}
        </div>
      </div>
    </ThemeContainer>
  );
};

export default LinkListSidebar;
