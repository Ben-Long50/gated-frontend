import Modal from './Modal';
import { useNavigate, useOutletContext } from 'react-router-dom';
import BtnRect from '../buttons/BtnRect';
import useModalStore from 'src/stores/modalStore';
import Perks from '../Perks';

const PerkLinkModal = () => {
  const { field, attributeTree } = useOutletContext() || {};
  const navigate = useNavigate();

  const { backgroundPath } = useModalStore((state) => state.backgroundPath);

  return (
    <Modal>
      <Perks
        title="Link Perks"
        forcedMode="form"
        field={field}
        attributeTree={attributeTree}
      />
      ;
      <BtnRect
        type="button"
        ariaLabel="Close"
        className="w-full"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
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

export default PerkLinkModal;
