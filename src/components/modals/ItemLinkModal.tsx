import Modal from './Modal';
import { ItemObject } from 'src/types/global';
import { Item } from 'src/types/item';
import Items from '../Items';
import { useNavigate, useOutletContext } from 'react-router-dom';
import useModalStore from 'src/stores/modalStore';
import BtnRect from '../buttons/BtnRect';
import { capitalCase } from 'change-case';

const ItemLinkModal = () => {
  const navigate = useNavigate();

  const { field, category } = useOutletContext() || {};

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
      <Items
        // title={'Link ' + capitalCase(category)}
        forcedMode="form"
        forcedCategory={category}
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

export default ItemLinkModal;
