import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import useModalStore from 'src/stores/modalStore';

const RootPortal = ({ children }: { children?: ReactNode }) => {
  const portalRoot = document.getElementById('portal-root');
  const navigate = useNavigate();

  const backgroundPath = useModalStore((state) => state.backgroundPath);

  return createPortal(
    <div
      className={`backdrop-fade fixed inset-0 top-14 z-30 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-md sm:p-4 md:p-8`}
      onClick={() => {
        navigate(backgroundPath);
      }}
    >
      {children}
    </div>,
    portalRoot,
  );
};

export default RootPortal;
