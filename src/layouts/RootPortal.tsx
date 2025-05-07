import { mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';

const RootPortal = ({
  modalOpen,
  toggleModal,
  children,
}: {
  modalOpen: boolean;
  toggleModal: () => void;
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
        } else {
          navigate(-1);
        }
      }
    };

    if (modalOpen) {
      history.pushState(null, null, window.location.href);
    }

    window.addEventListener('popstate', handlePopstate);

    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, [modalOpen]);

  return createPortal(
    <div
      className={`backdrop-fade absolute inset-0 z-10 bg-black bg-opacity-80 sm:p-4 md:p-8`}
    >
      {children}
      <button
        aria-label="Close window"
        className="text-primary absolute right-4 top-0 z-30 p-2"
      >
        <Icon path={mdiClose} size={1.3} />
      </button>
    </div>,
    portalRoot,
  );
};

export default RootPortal;
