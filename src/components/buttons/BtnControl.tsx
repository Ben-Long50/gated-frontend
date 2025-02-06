import { ReactNode } from 'react';
import Loading from '../../components/Loading';
import { UseMutationResult } from '@tanstack/react-query';

const BtnControl = ({
  title,
  icon,
  mutation,
  value,
}: {
  title: string;
  icon: ReactNode;
  mutation: UseMutationResult;
  value?: number;
}) => {
  return (
    <button
      className="hover:bg-tertiary timing group flex w-full shrink-0 items-center justify-center gap-4 rounded-md border border-yellow-300 border-opacity-50 px-2 py-1"
      onClick={(e) => {
        if (mutation.isPending) return;
        e.preventDefault();
        e.stopPropagation();
        if (value) {
          mutation.mutate(value);
        } else {
          mutation.mutate(undefined);
        }
      }}
    >
      {mutation?.isPending ? (
        <div className="size-8 shrink-0">
          <Loading className="group-hover:text-accent" size={1.15} />
        </div>
      ) : (
        <div className="shrink-0">{icon}</div>
      )}
      <p className="timing group-hover:text-accent">{title}</p>
    </button>
  );
};

export default BtnControl;
