import {
  mdiChevronDown,
  mdiChevronUp,
  mdiCircle,
  mdiClose,
  mdiRectangle,
} from '@mdi/js';
import Icon from '@mdi/react';
import { ReactNode } from 'react';

const StatBar = ({
  title,
  total,
  current,
  reserve,
  divider,
  color,
  mode,
  children,
  mutation,
  cardWidth,
}: {
  title?: string;
  total?: number;
  reserve?: number;
  current: number;
  divider?: number;
  color: string;
  mode?: string;
  children: ReactNode;
  mutation?: (value: number) => void;
  cardWidth: number;
}) => {
  const small = cardWidth < 500;

  return (
    <>
      {title && <h4>{title}</h4>}
      {children}
      <div className="col-span-2 flex w-full items-center justify-between gap-2">
        <div
          className={`${small ? 'gap-1' : 'gap-2'} flex flex-wrap items-center justify-self-start`}
        >
          {Array.from({
            length: divider
              ? total > current
                ? total / divider
                : current / divider
              : total > current
                ? total
                : current,
          }).map((_, index) =>
            index < current ? (
              small ? (
                <div key={index} className="relative">
                  <Icon path={mdiCircle} size={0.5} color={color} />
                  {index > total - 1 && (
                    <Icon
                      path={mdiClose}
                      className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2 text-red-600"
                      size={1}
                    />
                  )}
                </div>
              ) : (
                <div key={index} className="relative">
                  <Icon
                    className="-my-2 scale-x-150 scale-y-75"
                    path={mdiRectangle}
                    size={1}
                    color={color}
                  />

                  {index > total - 1 && (
                    <Icon
                      path={mdiClose}
                      className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2 text-red-600"
                      size={1.5}
                    />
                  )}
                </div>
              )
            ) : small ? (
              <div key={index} className="relative">
                <Icon className="text-gray-500" path={mdiCircle} size={0.5} />
                {index > total - 1 && (
                  <Icon
                    path={mdiClose}
                    className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2 text-red-600"
                    size={1}
                  />
                )}
              </div>
            ) : (
              <div key={index} className="relative">
                <Icon
                  className="-my-2 scale-x-150 scale-y-75 text-gray-500"
                  path={mdiRectangle}
                  size={1}
                />
                {index > total - 1 && (
                  <Icon
                    path={mdiClose}
                    className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2 text-red-600"
                    size={1}
                  />
                )}
              </div>
            ),
          )}
        </div>
        {mode !== 'edit' && (
          <div
            className={`text-tertiary flex items-center gap-2 justify-self-end whitespace-nowrap text-xl`}
          >
            <p className={`${current > total && 'text-error'}`}>{current}</p>
            {typeof reserve === 'number' ? (
              <p>/ {reserve}</p>
            ) : (
              total && <p>/ {total}</p>
            )}
            {mode === 'adjustable' && (
              <div className="flex flex-col">
                <button
                  className="text-tertiary hover:text-accent"
                  onClick={mutation ? () => mutation(1) : undefined}
                >
                  <Icon path={mdiChevronUp} size={1} />
                </button>
                <button
                  className="text-tertiary hover:text-accent"
                  onClick={mutation ? () => mutation(-1) : undefined}
                >
                  <Icon path={mdiChevronDown} size={1} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default StatBar;
