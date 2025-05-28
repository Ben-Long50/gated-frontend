import Icon from '@mdi/react';
import { ReactNode } from 'react';

const BtnIcon = ({
  path,
  active,
  onClick,
  className,
  children,
}: {
  path: string;
  active: boolean;
  onClick: () => void;
  className?: string;
  children?: ReactNode;
}) => {
  return (
    <button
      className={`${className} ${active ? 'hover:text-accent' : 'opacity-30'} bg-tertiary text-secondary timing rounded-md p-1.5 text-center font-semibold shadow-md shadow-black`}
      onMouseOver={(e) => e.stopPropagation()}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (active) {
          onClick();
        }
      }}
      onMouseDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (active) {
          onClick();
        }
      }}
    >
      <Icon path={path} className="size-6 text-inherit" />
      {children}
    </button>
  );
};

export default BtnIcon;
