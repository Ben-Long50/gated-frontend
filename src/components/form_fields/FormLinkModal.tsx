import { ReactNode } from 'react';
import Modal from '../Modal';
import { FieldApi } from '@tanstack/react-form';
import { ItemObject } from 'src/types/global';

const FormLinkModal = ({
  field,
  modalOpen,
  toggleModal,
  children,
}: {
  field: FieldApi;
  modalOpen: boolean;
  toggleModal: () => void;
  children: (args: { toggleFormLink: (item: ItemObject) => void }) => ReactNode;
}) => {
  const toggleFormLink = (targetItem: ItemObject) => {
    if (
      !field.state.value.some((item: ItemObject) => item.id === targetItem.id)
    ) {
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
      <div
        className="bg-secondary scrollbar-primary max-h-75dvh w-full max-w-6xl overflow-y-auto rounded-lg p-4 shadow-lg shadow-black sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {children({ toggleFormLink })}
      </div>
    </Modal>
  );
};

export default FormLinkModal;
