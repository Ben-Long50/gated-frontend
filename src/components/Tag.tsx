import { ConditionReference } from 'src/types/condition';
import { Keyword } from 'src/types/keyword';
import RadialMenu from './RadialMenu';
import Icon from '@mdi/react';
import {
  mdiFileDocument,
  mdiFileDocumentOutline,
  mdiMinus,
  mdiPlus,
  mdiTrashCanOutline,
} from '@mdi/js';
import useItemConditionStacksMutation from 'src/hooks/itemStatHooks/useItemConditionStacksMutation/useItemConditionStacksMutation';
import { useContext, useState } from 'react';
import { AuthContext } from 'src/contexts/AuthContext';
import useCharacterConditionStacksMutation from 'src/hooks/itemStatHooks/useCharacterConditionStacksMutation/useCharacterConditionStacksMutation';
import useDeleteCharacterConditionMutation from 'src/hooks/useDeleteCharacterConditionMutation/useDeleteCharacterConditionMutation';
import useDeleteItemConditionMutation from 'src/hooks/useDeleteItemConditionMutation/useDeleteItemConditionMutation';
import Modal from './Modal';
import BtnRect from './buttons/BtnRect';
import Divider from './Divider';

const Tag = ({
  keyword,
  condition,
  className,
}: {
  keyword?: { keyword: Keyword; value: number | null };
  condition?: ConditionReference;
  className?: string;
}) => {
  const { apiUrl } = useContext(AuthContext);
  const [descriptionOpen, setDescriptionOpen] = useState(false);

  const toggleDescription = () => {
    setDescriptionOpen(!descriptionOpen);
  };

  const keywordName = keyword?.value
    ? keyword?.keyword?.name.replace(/X/g, keyword?.value?.toString())
    : keyword?.keyword?.name;

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

  if (keyword)
    return (
      <div
        className={`bg-primary relative rounded border border-yellow-300 border-opacity-50 px-2 text-base shadow-md shadow-black`}
      >
        <p className="whitespace-nowrap text-base">{keywordName}</p>
      </div>
    );

  if (condition)
    return (
      <div
        className={`bg-primary relative rounded border border-red-400 border-opacity-50 px-2 text-base shadow-md shadow-black`}
      >
        <div className="flex items-center gap-1">
          <p className="whitespace-nowrap text-base">
            {condition.condition.name}
          </p>
          {condition.stacks && condition.stacks > 0 && (
            <p className="min-w-5 text-right text-base">{condition.stacks}</p>
          )}
        </div>

        <RadialMenu
          className={`${className} absolute right-0 top-0`}
          size="small"
        >
          <div>
            <p className="w-full text-center font-semibold !text-inherit">
              {condition.stacks || 0}
            </p>
          </div>
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
          <div onClick={() => toggleDescription()}>
            <Icon className="text-inherit" path={mdiFileDocumentOutline} />
            <Modal modalOpen={descriptionOpen} toggleModal={toggleDescription}>
              <div className="grid w-full grid-cols-3 place-items-center">
                <p></p>
                <h1>{condition.condition.name}</h1>
                <p className="text-tertiary place-self-end self-start">
                  Stacks {condition.stacks}
                </p>
              </div>

              <Divider />
              <p>
                {condition.stacks
                  ? condition.condition.description.replace(
                      /X/g,
                      condition.stacks?.toString(),
                    )
                  : condition.condition.description}
              </p>
              <BtnRect
                className="w-full"
                type="button"
                ariaLabel="Close"
                onClick={() => toggleDescription()}
              >
                Close
              </BtnRect>
            </Modal>
          </div>
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
        </RadialMenu>
      </div>
    );

  return;
};

export default Tag;
