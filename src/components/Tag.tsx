const Tag = ({
  label,
  className,
}: {
  id?: number;
  label: string;
  description?: string;
  className?: string;
  toolTip?: number;
  setToolTip?: (prevState: number) => void;
}) => {
  return (
    <div
      className={`${className} bg-primary relative cursor-pointer rounded border border-yellow-300 border-opacity-50 px-2 text-base`}
    >
      <p className="whitespace-nowrap text-base">{label}</p>
    </div>
  );
};

export default Tag;
