import { useForm } from '@tanstack/react-form';
import Conditions from '../Conditions';
import Modal from '../Modal';
import { Character } from 'src/types/character';
import { Condition } from 'src/types/condition';
import BtnRect from '../buttons/BtnRect';
import { useContext, useEffect } from 'react';
import { AuthContext } from 'src/contexts/AuthContext';
import useCreateCharacterConditionMutation from 'src/hooks/useCreateCharacterConditionMutation/useCreateCharacterConditionMutation';
import { Item } from 'src/types/item';
import useCreateItemConditionMutation from 'src/hooks/useCreateItemConditionMutation/useCreateItemConditionMutation';
import { useParams } from 'react-router-dom';

const ConditionLinkField = ({
  character,
  item,
  conditionModal,
  toggleConditionModal,
}: {
  character?: Character;
  item?: Item;
  conditionModal: boolean;
  toggleConditionModal: () => void;
}) => {
  const { apiUrl } = useContext(AuthContext);
  const { characterId } = useParams();

  const createCharacterCondition = useCreateCharacterConditionMutation(
    apiUrl,
    Number(character?.id),
    toggleConditionModal,
  );

  const createItemCondition = useCreateItemConditionMutation(
    apiUrl,
    Number(item?.id),
    item?.itemTypes,
    Number(characterId),
    toggleConditionModal,
  );

  useEffect(() => {
    conditionLinkForm.reset();
  }, [character, item]);

  const conditionLinkForm = useForm({
    defaultValues: {
      conditions:
        character?.conditions ||
        item?.conditions ||
        ([] as { condition: Condition; stacks: number | null }[]),
    },
    onSubmit: async ({ value }) => {
      const data = value.conditions.map((condition) => ({
        conditionId: condition.condition.id,
        stacks: condition.stacks,
      }));
      if (item) {
        await createItemCondition.mutate(data);
      } else if (character) {
        await createCharacterCondition.mutate(data);
      }
    },
  });

  return (
    <Modal modalOpen={conditionModal} toggleModal={toggleConditionModal}>
      <conditionLinkForm.Field name="conditions">
        {(field) => (
          <Conditions title="Manage Conditions" mode="form" field={field} />
        )}
      </conditionLinkForm.Field>
      <BtnRect
        className="w-full"
        type="button"
        ariaLabel="Submit conditions"
        onClick={(e) => {
          e.preventDefault();
          conditionLinkForm.handleSubmit();
        }}
      >
        Submit
      </BtnRect>
    </Modal>
  );
};

export default ConditionLinkField;
