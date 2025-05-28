import { Condition } from 'src/types/condition';
import { Keyword } from 'src/types/keyword';

const Tag = ({
  keyword,
  condition,
  className,
  label,
}: {
  keyword?: { keyword: Keyword; value: number | null };
  condition?: { condition: Condition; stacks: number | null };
  className?: string;
  label?: string;
}) => {
  const keywordName = keyword?.value
    ? keyword?.keyword?.name.replace(/X/g, keyword?.value?.toString())
    : keyword?.keyword?.name;

  const conditionName = condition?.stacks
    ? condition?.condition?.name + ' ' + condition?.stacks?.toString()
    : condition?.condition?.name;

  return (
    <div
      className={`${className} ${condition && 'border-red-400'} ${keyword && 'border-yellow-300'} bg-primary relative cursor-pointer rounded border border-opacity-50 px-2 text-base shadow-md shadow-black`}
    >
      <p className="whitespace-nowrap text-base">
        {keywordName || conditionName || label}
      </p>
    </div>
  );
};

export default Tag;
