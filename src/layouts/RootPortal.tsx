import { mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

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

  useEffect(() => {
    const handlePopstate = (e) => {
      if (modalOpen) {
        e.preventDefault();
        toggleModal();
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
      className={`backdrop-fade absolute inset-0 z-20 overflow-auto bg-zinc-950 bg-opacity-70 sm:p-4 md:p-8`}
      onClick={toggleModal}
    >
      {children}
      <button
        aria-label="Close window"
        className="text-primary absolute right-0 top-0 z-30 p-2"
        onClick={toggleModal}
      >
        <Icon path={mdiClose} size={1.3} />
      </button>
    </div>,
    portalRoot,
  );
};

export default RootPortal;
