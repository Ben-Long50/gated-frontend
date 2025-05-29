import { ConditionReference } from 'src/types/condition';
import { Keyword } from 'src/types/keyword';
import RadialMenu from './RadialMenu';
import Icon from '@mdi/react';
import { mdiMinus, mdiPlus } from '@mdi/js';
import useItemConditionStacksMutation from 'src/hooks/itemStatHooks/useItemConditionStacksMutation/useItemConditionStacksMutation';
import { useContext } from 'react';
import { AuthContext } from 'src/contexts/AuthContext';
import useCharacterConditionStacksMutation from 'src/hooks/itemStatHooks/useCharacterConditionStacksMutation/useCharacterConditionStacksMutation';

const Tag = ({
  keyword,
  condition,
  className,
  label,
}: {
  keyword?: { keyword: Keyword; value: number | null };
  condition?: ConditionReference;
  className?: string;
  label?: string;
}) => {
  const { apiUrl } = useContext(AuthContext);
  const keywordName = keyword?.value
    ? keyword?.keyword?.name.replace(/X/g, keyword?.value?.toString())
    : keyword?.keyword?.name;

  const conditionName = condition?.stacks
    ? condition?.condition?.name + ' ' + condition?.stacks?.toString()
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

  console.log(condition);

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
        <p className="whitespace-nowrap text-base">{conditionName}</p>

        <RadialMenu
          className={`${className} absolute right-0 top-0`}
          radius={45}
        >
          <div
            onClick={() => {
              if (condition.itemId) {
                editItemConditionStacks.mutate(1);
              } else if (condition.characterId) {
                editCharacterConditionStacks.mutate(1);
              }
            }}
          >
            <Icon className="size-7 text-inherit" path={mdiPlus} />
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
            <Icon className="size-7 text-inherit" path={mdiMinus} />
          </div>
        </RadialMenu>
      </div>
    );
};

export default Tag;
