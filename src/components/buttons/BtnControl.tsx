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
  mutation?: UseMutationResult;
  value?: number;
}) => {
  return (
    <button
      className="hover:bg-tertiary text-secondary timing hover:text-accent grid w-full shrink-0 items-center justify-center gap-4 rounded-md border border-yellow-300 px-2 py-2 shadow-md shadow-zinc-950"
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
