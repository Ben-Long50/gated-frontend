import { Keyword } from 'src/types/keyword';
import BtnRect from './buttons/BtnRect';
import Divider from './Divider';
import Modal from './Modal';
import { ConditionReference } from 'src/types/condition';

const DescriptionModal = ({
  keyword,
  condition,
  modalOpen,
  toggleModal,
}: {
  keyword?: { keyword: Keyword; value: number | null };
  condition?: ConditionReference;
  modalOpen: boolean;
  toggleModal: () => void;
}) => {
  const name = (() => {
    if (condition) {
      return condition.condition.name;
    } else if (keyword) {
      return keyword.keyword.name;
    }
    return;
  })();

  const description = (() => {
    if (condition) {
      return condition.condition.description;
    } else if (keyword) {
      return keyword.keyword.description;
    }
    return;
  })();

  const value = (() => {
    if (condition) {
      return condition.stacks;
    } else if (keyword) {
      return keyword.value;
    }
    return;
  })();

  return (
    <Modal modalOpen={modalOpen} toggleModal={toggleModal}>
      <div className="grid w-full grid-cols-3 place-items-center">
        <p></p>
        <h1>{name}</h1>
        {condition?.stacks && (
          <p className="text-tertiary place-self-end self-start">
            Stacks {value}
          </p>
        )}
      </div>

      <Divider />
      <p>
        {value ? description?.replace(/X/g, value?.toString()) : description}
      </p>
      <BtnRect
        className="w-full"
        type="button"
        ariaLabel="Close"
        onClick={() => toggleModal()}
      >
        Close
      </BtnRect>
    </Modal>
  );
};

export default DescriptionModal;
