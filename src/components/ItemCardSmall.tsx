import { mdiChevronDown } from '@mdi/js';
import Icon from '@mdi/react';
import { ReactNode, Ref, useContext, useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';

const ItemCardSmall = ({
  cardRef,
  className,
  expanded,
  heading,
  children,
}: {
  cardRef?: Ref;
  className?: string;
  expanded?: boolean;
  heading: ReactNode;
  children?: ReactNode;
}) => {
  const { accentPrimary } = useContext(ThemeContext);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailHeight, setDetailHeight] = useState(1000);

  const detailRef = useRef(null);

  useEffect(() => {
    if (detailRef.current) {
      setDetailHeight(detailRef.current.offsetHeight);
    }
  }, [detailRef.current]);

  return (
    <ThemeContainer
      chamfer="small"
      borderColor={detailsOpen || expanded ? accentPrimary : 'transparent'}
      className={`timing mb-auto w-full`}
      overflowHidden={true}
    >
      <div
        ref={cardRef}
        className={`${className} bg-secondary mb-auto w-full cursor-pointer p-4`}
        onClick={async (e) => {
          e.preventDefault();
          setDetailsOpen(!detailsOpen);
        }}
      >
        <summary
          className={`text-primary flex w-full items-center justify-between`}
        >
          {heading}
          {children && (
            <span className={`timing shrink-0 ${detailsOpen && '-rotate-180'}`}>
              <Icon
                path={mdiChevronDown}
                size={1.1}
                className={`text-secondary`}
              ></Icon>
            </span>
          )}
        </summary>
        {children && (
          <div
            className={`${detailsOpen || (expanded && 'pr-1 pt-4')} timing overflow-hidden`}
          >
            <motion.div
              ref={detailRef}
              className="flex flex-col gap-4"
              initial={{ marginTop: -detailHeight - 4 }}
              animate={{
                marginTop: detailsOpen || expanded ? 0 : -detailHeight - 4,
              }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </div>
        )}
      </div>
    </ThemeContainer>
  );
};

export default ItemCardSmall;
