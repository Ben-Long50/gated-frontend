import { ReactNode, useContext } from 'react';
import { LayoutContext } from '../contexts/LayoutContext';

const StatCard = ({
  label,
  stat,
  children,
}: {
  label?: string;
  stat: number | string;
  children: ReactNode;
}) => {
  const { layoutSize } = useContext(LayoutContext);

  return (
    <div className="bg-tertiary flex w-full flex-col items-center gap-1 rounded-lg p-2 shadow-md shadow-zinc-950">
      {layoutSize !== 'small' && layoutSize !== 'xsmall' && label && (
        <p>{label}</p>
      )}
      <div className="flex items-center gap-2">
        <div className="shrink-0">{children}</div>
        <p className="whitespace-nowrap font-semibold">{stat}</p>
      </div>
    </div>
  );
};

export default StatCard;
