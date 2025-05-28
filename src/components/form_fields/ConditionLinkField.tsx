import { useForm } from '@tanstack/react-form';
import Conditions from '../Conditions';
import Modal from '../Modal';
import { Character } from 'src/types/character';
import { Condition } from 'src/types/condition';
import BtnRect from '../buttons/BtnRect';
import { useContext } from 'react';
import { AuthContext } from 'src/contexts/AuthContext';
import useCreateCharacterConditionMutation from 'src/hooks/useCreateCharacterConditionMutation/useCreateCharacterConditionMutation';

const ConditionLinkField = ({
  character,
  conditionModal,
  toggleConditionModal,
}: {
  character: Character;
  conditionModal: boolean;
  toggleConditionModal: () => void;
}) => {
  const { apiUrl } = useContext(AuthContext);

  const createCondition = useCreateCharacterConditionMutation(
    apiUrl,
    Number(character.id),
    toggleConditionModal,
  );

  const conditionLinkForm = useForm({
    defaultValues: {
      conditions:
        character.conditions ||
        ([] as { condition: Condition; stacks: number | null }[]),
    },
    onSubmit: async ({ value }) => {
      const data = value.conditions.map((condition) => ({
        conditionId: condition.condition.id,
        stacks: condition.stacks,
      }));
      await createCondition.mutate(data);
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
