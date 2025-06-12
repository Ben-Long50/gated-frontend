import Modal from './Modal';
import { ItemObject } from 'src/types/global';
import { Item } from 'src/types/item';
import { useNavigate, useOutletContext } from 'react-router-dom';
import useModalStore from 'src/stores/modalStore';
import BtnRect from '../buttons/BtnRect';
import Actions from '../Actions';

const ActionLinkModal = () => {
  const navigate = useNavigate();

  const { field } = useOutletContext() || {};

  const backgroundPath = useModalStore((state) => state.backgroundPath);

  const toggleFormLink = (targetItem: Item) => {
    if (!field.state.value.some((item: Item) => item.id === targetItem.id)) {
      field.handleChange([...field.state.value, targetItem]);
    } else {
      field.handleChange(
        field.state.value.filter(
          (item: ItemObject) => item.id !== targetItem.id,
        ),
      );
    }
  };

  return (
    <Modal>
      <Actions
        title="Link Actions"
        forcedMode="form"
        field={field}
        toggleFormLink={toggleFormLink}
      />
      <BtnRect
        type="button"
        ariaLabel="Confirm preferences"
        className="w-full"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          navigate(backgroundPath);
        }}
      >
        Close
      </BtnRect>
    </Modal>
  );
};

export default ActionLinkModal;
