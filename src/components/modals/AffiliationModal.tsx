import Modal from './Modal';
import BtnRect from '../buttons/BtnRect';
import { Outlet, useNavigate } from 'react-router-dom';
import useModalStore from 'src/stores/modalStore';

const AffiliationModal = () => {
  const navigate = useNavigate();

  const backgroundPath = useModalStore((state) => state.backgroundPath);

  return (
    <Modal className="h-full">
      <Outlet />
      <BtnRect
        className="w-full"
        type="button"
        ariaLabel="Submit conditions"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          if (!backgroundPath) {
            navigate('..', { replace: true });
          } else {
            navigate(backgroundPath, { replace: true });
            navigate(-1);
          }
        }}
      >
        Close
      </BtnRect>
    </Modal>
  );
};

export default AffiliationModal;
