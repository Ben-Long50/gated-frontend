import RootPortal from '../../layouts/RootPortal';
import { ReactNode } from 'react';

const Modal = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <RootPortal>
      <div
        className={`${className} scrollbar-primary-2 relative flex max-h-85dvh w-full max-w-5xl flex-col items-center gap-4 overflow-y-auto rounded-lg bg-zinc-925 p-4 shadow-lg shadow-black sm:gap-8 sm:p-8`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </RootPortal>
  );
};

export default Modal;
