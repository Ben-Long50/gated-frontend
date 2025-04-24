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
      className="hover:bg-tertiary timing group flex w-full shrink-0 items-center justify-center gap-4 rounded-md border border-yellow-300 px-2 py-1 shadow-md shadow-zinc-950"
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
      <div className="shrink-0">{icon}</div>
      <p className="timing group-hover:text-accent">{title}</p>
    </button>
  );
};

export default BtnControl;
