import Modal from './Modal';
import { useNavigate, useOutletContext } from 'react-router-dom';
import Keywords from '../Keywords';
import BtnRect from '../buttons/BtnRect';
import useModalStore from 'src/stores/modalStore';

const KeywordLinkModal = () => {
  const { field } = useOutletContext() || {};
  const navigate = useNavigate();

  const { backgroundPath } = useModalStore((state) => state.backgroundPath);

  return (
    <Modal>
      <Keywords title="Link Traits" forcedMode="form" field={field} />
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

export default KeywordLinkModal;
