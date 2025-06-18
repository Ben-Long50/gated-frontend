import {
  mdiFileDocumentOutline,
  mdiMinus,
  mdiPlus,
  mdiTrashCanOutline,
} from '@mdi/js';
import Icon from '@mdi/react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from 'src/contexts/AuthContext';
import useCharacterConditionStacksMutation from 'src/hooks/itemStatHooks/useCharacterConditionStacksMutation/useCharacterConditionStacksMutation';
import useItemConditionStacksMutation from 'src/hooks/itemStatHooks/useItemConditionStacksMutation/useItemConditionStacksMutation';
import useDeleteCharacterConditionMutation from 'src/hooks/useDeleteCharacterConditionMutation/useDeleteCharacterConditionMutation';
import useDeleteItemConditionMutation from 'src/hooks/useDeleteItemConditionMutation/useDeleteItemConditionMutation';
import useModalStore from 'src/stores/modalStore';
import { ConditionReference } from 'src/types/condition';
import RadialMenu from './RadialMenu';
import useRadialMenuStore from 'src/stores/radialMenuStore';

const ConditionRadialMenu = ({
  condition,
  containerRef,
}: {
  condition: ConditionReference;
  containerRef: ReactNode;
}) => {
  const { apiUrl } = useContext(AuthContext);
  const navigate = useNavigate();

  const setBackgroundPath = useModalStore((state) => state.setBackgroundPath);

  const setMenuOpen = useRadialMenuStore((state) => state.setMenuOpen);

  const openDescriptionModal = () => {
    setBackgroundPath(location.pathname);
    navigate(`conditions/${condition.id}`);
  };

  const editItemConditionStacks = useItemConditionStacksMutation(
    apiUrl,
    condition?.id,
    condition?.itemId,
  );

  const editCharacterConditionStacks = useCharacterConditionStacksMutation(
    apiUrl,
    condition?.id,
    condition?.characterId,
  );

  const deleteCharacterCondition = useDeleteCharacterConditionMutation(
    apiUrl,
    condition?.id,
    condition?.characterId,
  );

  const deleteItemCondition = useDeleteItemConditionMutation(
    apiUrl,
    condition?.id,
    condition?.itemId,
  );

  return (
    <RadialMenu
      elementId={condition.id}
      containerRef={containerRef}
      array={[
        {
          label: 'Current Stacks',
          element: (
            <div>
              <p className="w-full text-center font-semibold !text-inherit">
                {condition.stacks || 0}
              </p>
            </div>
          ),
        },
        {
          label: 'Add Stack',
          element: (
            <div
              onClick={() => {
                if (condition.itemId) {
                  editItemConditionStacks.mutate(1);
                } else if (condition.characterId) {
                  editCharacterConditionStacks.mutate(1);
                }
              }}
            >
              <Icon className="text-inherit" path={mdiPlus} />
            </div>
          ),
        },
        {
          label: 'Remove Condition',
          element: (
            <div
              onClick={() => {
                if (condition.itemId) {
                  deleteItemCondition.mutate();
                } else if (condition.characterId) {
                  deleteCharacterCondition.mutate();
                }
              }}
            >
              <Icon className="text-inherit" path={mdiTrashCanOutline} />
            </div>
          ),
        },
        {
          label: 'Description',
          element: (
            <div
              onClick={() => {
                openDescriptionModal();
                setMenuOpen(false);
              }}
            >
              <Icon className="text-inherit" path={mdiFileDocumentOutline} />
            </div>
          ),
        },
        {
          label: 'Remove Stack',
          element: (
            <div
              onClick={() => {
                if (condition.itemId) {
                  editItemConditionStacks.mutate(-1);
                } else if (condition.characterId) {
                  editCharacterConditionStacks.mutate(-1);
                }
              }}
            >
              <Icon className="text-inherit" path={mdiMinus} />
            </div>
          ),
        },
      ]}
    />
  );
};

export default ConditionRadialMenu;
