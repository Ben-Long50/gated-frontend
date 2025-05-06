import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  if (!modalOpen) return;

  return (
    <>
      <div
        className={`fixed inset-0 z-20 flex items-center justify-center px-2`}
        onClick={() => {
          if (modalOpen) {
            navigate(-1);
          }
        }}
      >
        {children}
      </div>
      <RootPortal modalOpen={modalOpen} toggleModal={toggleModal} />
    </>
  );
};

export default Modal;
