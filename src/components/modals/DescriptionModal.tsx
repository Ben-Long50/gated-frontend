import { useOutletContext } from 'react-router-dom';
import Divider from '../Divider';
import Modal from './Modal';
import Loading from '../Loading';

const DescriptionModal = () => {
  const { keyword, condition } = useOutletContext() || {};

  const item = keyword || condition;

  const name = (() => {
    if (condition) {
      return condition?.stacks
        ? condition?.condition?.name.replace(
            /X/g,
            condition?.stacks?.toString(),
          )
        : condition?.condition?.name;
    } else if (keyword) {
      return keyword?.value
        ? keyword?.keyword?.name.replace(/X/g, keyword?.value?.toString())
        : keyword?.keyword?.name;
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
    <Modal>
      {!item ? (
        <Loading />
      ) : (
        <>
          <div className="relative w-full">
            <h1 className="w-full text-center">{name}</h1>
            {condition?.stacks && (
              <p className="text-tertiary absolute left-0 top-0">
                Stacks {value}
              </p>
            )}
            {keyword?.value && (
              <p className="text-tertiary absolute left-0 top-0">
                Value {value}
              </p>
            )}
          </div>
          <Divider className="!-my-1" />
          <p>
            {value
              ? description?.replace(/X/g, value?.toString())
              : description}
          </p>
        </>
      )}
    </Modal>
  );
};

export default DescriptionModal;
