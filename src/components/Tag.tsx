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
          id
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
        className={`${toolTip === id ? 'visible opacity-100' : 'invisible opacity-0'} bg-secondary timing scrollbar-secondary absolute right-0 top-0 z-10 max-h-full w-max min-w-72 max-w-xl overflow-y-auto rounded-md p-3 shadow-md shadow-zinc-950`}
      >
        <p className="text-secondary text-base">{description}</p>
      </div>
    </>
  );
};

export default Tag;
