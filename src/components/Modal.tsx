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
      {children}
    </RootPortal>
  );
};

export default Modal;
