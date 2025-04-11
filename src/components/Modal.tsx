import RootPortal from '../layouts/RootPortal';
import { ReactNode } from 'react';

const Modal = ({
  modalOpen,
  toggleModal,
  children,
}: {
  modalOpen: boolean;
  toggleModal: () => void;
  children: ReactNode;
}) => {
  if (!modalOpen) return;

  return (
    <>
      <div
        className={`absolute inset-0 z-20 flex items-center justify-center`}
        onClick={(e) => {
          e.stopPropagation();
          toggleModal();
        }}
      >
        {children}
      </div>
      <RootPortal modalOpen={modalOpen} toggleModal={toggleModal} />
    </>
  );
};

export default Modal;
