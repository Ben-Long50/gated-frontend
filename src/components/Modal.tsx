import RootPortal from '../layouts/RootPortal';
import { ReactNode } from 'react';

const Modal = ({
  modalOpen,
  toggleModal,
  children,
}: {
  modalOpen: boolean;
  toggleModal?: () => void;
  children: ReactNode;
}) => {
  if (!modalOpen) return;

  return (
    <RootPortal modalOpen={modalOpen} toggleModal={toggleModal}>
      <div
        className="bg-primary scrollbar-primary-2 relative flex max-h-85dvh w-full max-w-5xl flex-col items-center gap-4 overflow-y-auto rounded-lg p-4 shadow-lg shadow-black sm:gap-8 sm:p-8"
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
