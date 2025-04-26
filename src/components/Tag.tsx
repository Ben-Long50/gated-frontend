import ArrowHeader4 from './ArrowHeader4';
import Divider from './Divider';

const Tag = ({
  id,
  label,
  description,
  className,
  toolTip,
  setToolTip,
}: {
  id?: number;
  label: string;
  description?: string;
  className?: string;
  toolTip?: number;
  setToolTip?: (prevState: number) => void;
}) => {
  return (
    <>
      <div
        className={`${className} bg-primary relative cursor-pointer rounded border border-yellow-300 border-opacity-50 px-2 text-base`}
        onClick={
          setToolTip
            ? (e) => {
                e.stopPropagation();
                setToolTip(id);
              }
            : undefined
        }
      >
        <p className="whitespace-nowrap text-base">{label}</p>
      </div>

      <div
        className={`${toolTip === id ? 'visible opacity-100' : 'invisible opacity-0'} bg-secondary timing scrollbar-secondary absolute right-2 top-2 z-20 max-h-full min-w-72 max-w-1/2 overflow-y-auto rounded-md p-3 shadow-md shadow-zinc-950`}
      >
        <ArrowHeader4 title={label} />
        <Divider />
        <p className="text-secondary text-base">{description}</p>
      </div>
    </>
  );
};

export default Tag;
