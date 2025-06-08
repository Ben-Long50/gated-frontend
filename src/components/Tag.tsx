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
import DescriptionModal from './DescriptionModal';

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

  const conditionName = condition?.stacks
    ? condition?.condition?.name.replace(/X/g, condition?.stacks?.toString())
    : condition?.condition?.name;

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
        className={`${className} bg-primary relative z-20 cursor-pointer rounded border border-yellow-300 border-opacity-50 px-2 text-base shadow-md shadow-black`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleDescription();
        }}
      >
        <p className="whitespace-nowrap text-base">{keywordName}</p>
        <DescriptionModal
          keyword={keyword}
          modalOpen={descriptionOpen}
          toggleModal={toggleDescription}
        />
      </div>
    );

  if (condition)
    return (
      <div
        className={`bg-primary relative rounded border border-red-400 border-opacity-50 px-2 text-base shadow-md shadow-black`}
      >
        <p className="whitespace-nowrap text-base">{conditionName}</p>

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
            <DescriptionModal
              condition={condition}
              modalOpen={descriptionOpen}
              toggleModal={toggleDescription}
            />
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
