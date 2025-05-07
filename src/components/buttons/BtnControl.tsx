import { ReactNode } from 'react';
import { UseMutationResult } from '@tanstack/react-query';

const BtnControl = ({
  title,
  icon,
  mutation,
  value,
}: {
  title: string;
  icon: ReactNode;
  mutation?: UseMutationResult | null;
  value?: number;
}) => {
  return (
    <button
      className={`${mutation === null ? 'border-gray-400 opacity-50' : 'hover:bg-tertiary hover:text-accent border-yellow-300 border-opacity-50 hover:border-opacity-100'} text-secondary timing grid w-full shrink-0 items-center justify-center gap-4 rounded-md border px-2 py-2 shadow-md shadow-zinc-950`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (mutation) {
          if (value) {
            mutation.mutate(value);
          } else {
            mutation.mutate(undefined);
          }
        }
      }}
    >
      <div className="mx-auto grid grid-cols-[1fr_4fr]">
        <div className="shrink-0">{icon}</div>
        <p className="timing !text-inherit">{title}</p>
      </div>
    </button>
  );
};

export default BtnControl;
