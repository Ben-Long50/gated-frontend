import { Keyword } from 'src/types/keyword';

const Tag = ({
  keyword,
  className,
  label,
}: {
  keyword?: { keyword: Keyword; value: number | null };
  className?: string;
  label?: string;
}) => {
  const keywordName = keyword?.value
    ? keyword?.keyword?.name.replace(/X/g, keyword?.value?.toString())
    : keyword?.keyword?.name;

  return (
    <div
      className={`${className} bg-primary relative cursor-pointer rounded border border-yellow-300 border-opacity-50 px-2 text-base`}
    >
      <p className="whitespace-nowrap text-base">{keywordName || label}</p>
    </div>
  );
};

export default Tag;
