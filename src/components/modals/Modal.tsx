import RootPortal from '../../layouts/RootPortal';
import { ReactNode } from 'react';
import BtnIcon from '../buttons/BtnIcon';
import { mdiClose } from '@mdi/js';
import { useNavigate } from 'react-router-dom';
import useModalStore from 'src/stores/modalStore';

const Modal = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const navigate = useNavigate();
  const backgroundPath = useModalStore((state) => state.backgroundPath);
  return (
    <RootPortal>
      <div
        className={`${className} scrollbar-primary-2 relative flex max-h-85dvh w-full max-w-5xl flex-col items-center gap-4 overflow-y-auto rounded-lg bg-zinc-925 p-4 shadow-lg shadow-black sm:gap-8 sm:p-8`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <BtnIcon
          active={true}
          onClick={() => {
            if (!backgroundPath) {
              navigate('..', { replace: true });
            } else {
              navigate(backgroundPath, { replace: true });
              navigate(-1);
            }
          }}
          path={mdiClose}
          className="absolute right-2 top-2"
        />
        {children}
      </div>
    </RootPortal>
  );
};

export default Modal;
