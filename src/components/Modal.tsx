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
        className={`flex h-full w-full items-center justify-center bg-black bg-opacity-50`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
      <RootPortal modalOpen={modalOpen} toggleModal={toggleModal} />
    </>
  );
};

export default Modal;
