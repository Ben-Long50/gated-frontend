import {
  mdiChevronDown,
  mdiChevronUp,
  mdiCircle,
  mdiClose,
  mdiRectangle,
} from '@mdi/js';
import Icon from '@mdi/react';
import { ReactNode, useContext } from 'react';
import { LayoutContext } from '../contexts/LayoutContext';

const StatBar = ({
  title,
  total,
  current,
  color,
  mode,
  children,
  mutation,
}: {
  title: string;
  total: number;
  current: number;
  color: string;
  mode?: string;
  children: ReactNode;
  mutation?: (value: number) => void;
}) => {
  const { layoutSize } = useContext(LayoutContext);

  return (
    <>
      {layoutSize !== 'small' && layoutSize !== 'xsmall' && (
        <h3 className="text-xl font-semibold tracking-widest">{title}</h3>
      )}
      {children}
      <div className="flex flex-wrap items-center gap-2 justify-self-start max-sm:gap-1">
        {Array.from({
          length: total > current ? total : current,
        }).map((_, index) =>
          index < current ? (
            layoutSize === 'small' || layoutSize === 'xsmall' ? (
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
                  className="-my-2 scale-x-150 scale-y-50"
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
          ) : layoutSize === 'small' || layoutSize === 'xsmall' ? (
            <div key={index} className="relative">
              <Icon className="text-gray-400" path={mdiCircle} size={0.5} />
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
                className="-my-2 scale-x-150 scale-y-50 text-gray-400"
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
          <p className={`${current > total && 'text-error'}`}>{current}</p>/
          <p>{total}</p>
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
    </>
  );
};

export default StatBar;
