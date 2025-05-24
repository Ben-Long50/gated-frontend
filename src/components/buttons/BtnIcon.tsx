import Icon from '@mdi/react';

const BtnIcon = ({
  path,
  active,
  onClick,
  className,
}: {
  path: string;
  active: boolean;
  onClick: () => void;
  className?: string;
}) => {
  return (
    <button
      className={`${className} ${active ? 'hover:text-accent' : 'opacity-30'} bg-tertiary text-secondary timing rounded-md p-1 text-center font-semibold shadow-md shadow-black`}
      onClick={(e) => {
        e.preventDefault();
        if (active) {
          onClick();
        }
      }}
    >
      <Icon path={path} className="size-6 text-inherit" />
    </button>
  );
};

export default BtnIcon;
