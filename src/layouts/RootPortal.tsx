import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';

const RootPortal = ({
  modalOpen,
  toggleModal,
  children,
}: {
  modalOpen: boolean;
  toggleModal?: () => void;
  children?: ReactNode;
}) => {
  const portalRoot = document.getElementById('portal-root');
  const navigate = useNavigate();

  useEffect(() => {
    const handlePopstate = (e) => {
      if (modalOpen) {
        e.preventDefault();
        if (toggleModal) {
          toggleModal();
        }
        navigate(-1);
      }
    };

    if (modalOpen) {
      navigate(window.location.pathname, { replace: false });
    }

    window.addEventListener('popstate', handlePopstate);

    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, [modalOpen]);

  return createPortal(
    <div
      className={`backdrop-fade fixed inset-0 top-14 z-20 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-md sm:p-4 md:p-8`}
      onClick={(e) => {
        if (modalOpen) {
          e.preventDefault();
          if (toggleModal) {
            toggleModal();
          }
          navigate(-2);
        }
      }}
    >
      {children}
    </div>,
    portalRoot,
  );
};

export default RootPortal;
