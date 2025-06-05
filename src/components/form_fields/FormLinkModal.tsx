import { ReactNode } from 'react';
import Modal from '../Modal';
import { FieldApi } from '@tanstack/react-form';
import { ItemObject } from 'src/types/global';
import { Item } from 'src/types/item';

const FormLinkModal = ({
  field,
  modalOpen,
  toggleModal,
  children,
}: {
  field: FieldApi;
  modalOpen: boolean;
  toggleModal: () => void;
  children: (args: { toggleFormLink: (item: Item) => void }) => ReactNode;
}) => {
  const toggleFormLink = (targetItem: Item) => {
    console.log(field.state.value);
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
    <Modal modalOpen={modalOpen} toggleModal={toggleModal}>
      {children({ toggleFormLink })}
    </Modal>
  );
};

export default FormLinkModal;
