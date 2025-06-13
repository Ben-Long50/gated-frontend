import { useForm } from '@tanstack/react-form';
import Conditions from '../Conditions';
import Modal from './Modal';
import { Condition } from 'src/types/condition';
import BtnRect from '../buttons/BtnRect';
import { useContext, useEffect } from 'react';
import { AuthContext } from 'src/contexts/AuthContext';
import useCreateCharacterConditionMutation from 'src/hooks/useCreateCharacterConditionMutation/useCreateCharacterConditionMutation';
import useCreateItemConditionMutation from 'src/hooks/useCreateItemConditionMutation/useCreateItemConditionMutation';
import { useNavigate, useParams } from 'react-router-dom';
import useCharacter from 'src/hooks/useCharacter';
import useItemQuery from 'src/hooks/useItemQuery/useItemQuery';
import useModalStore from 'src/stores/modalStore';

const ConditionModal = () => {
  const { apiUrl } = useContext(AuthContext);
  const { characterId, itemId } = useParams();
  const navigate = useNavigate();

  const backgroundPath = useModalStore((state) => state.backgroundPath);

  const { filteredCharacter: character } = useCharacter(Number(characterId));

  const { data: item } = useItemQuery(Number(itemId));

  const createCharacterCondition = useCreateCharacterConditionMutation(
    apiUrl,
    Number(character?.id),
  );

  const createItemCondition = useCreateItemConditionMutation(
    apiUrl,
    Number(item?.id),
    Number(characterId),
  );

  useEffect(() => {
    conditionLinkForm.reset();
  }, [character, item]);

  const conditionLinkForm = useForm({
    defaultValues: {
      conditions:
        item?.conditions ||
        character?.conditions ||
        ([] as { condition: Condition; stacks: number | null }[]),
    },
    onSubmit: async ({ value }) => {
      const data = value.conditions.map((condition) => ({
        conditionId: condition.condition.id,
        stacks: condition.stacks,
      }));
      if (item) {
        await createItemCondition.mutate(data);
      } else {
        await createCharacterCondition.mutate(data);
      }
      if (!backgroundPath) {
        navigate('..', { replace: true });
      } else {
        navigate(backgroundPath, { replace: true });
        navigate(-1);
      }
    },
  });

  return (
    <Modal className="h-full">
      <conditionLinkForm.Field name="conditions">
        {(field) => (
          <Conditions
            title={character?.firstName + "'s Conditions"}
            forcedMode="form"
            field={field}
          />
        )}
      </conditionLinkForm.Field>
      <BtnRect
        className="w-full"
        type="button"
        ariaLabel="Submit conditions"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          conditionLinkForm.handleSubmit();
        }}
      >
        Submit
      </BtnRect>
    </Modal>
  );
};

export default ConditionModal;
