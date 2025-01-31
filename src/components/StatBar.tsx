import { mdiCircle, mdiClose, mdiRectangle } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext } from 'react';
import { LayoutContext } from '../contexts/LayoutContext';

const StatBar = (props) => {
  const { layoutSize } = useContext(LayoutContext);

  return (
    <>
      {layoutSize !== 'small' && layoutSize !== 'xsmall' && (
        <h3 className="text-xl font-semibold tracking-widest">{props.title}</h3>
      )}
      {props.children}
      <div className="flex flex-wrap items-center gap-2 justify-self-start max-sm:gap-1">
        {Array.from({
          length: props.total > props.current ? props.total : props.current,
        }).map((_, index) =>
          index < props.current ? (
            layoutSize === 'small' || layoutSize === 'xsmall' ? (
              <div className="relative">
                <Icon
                  key={index}
                  path={mdiCircle}
                  size={0.5}
                  color={props.color}
                />
                {index > props.total - 1 && (
                  <Icon
                    path={mdiClose}
                    className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2 text-red-600"
                    size={1}
                  />
                )}
              </div>
            ) : (
              <div className="relative">
                <Icon
                  key={index}
                  className="-my-2 scale-x-150 scale-y-50"
                  path={mdiRectangle}
                  size={1}
                  color={props.color}
                />

                {index > props.total - 1 && (
                  <Icon
                    path={mdiClose}
                    className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2 text-red-600"
                    size={1.5}
                  />
                )}
              </div>
            )
          ) : layoutSize === 'small' || layoutSize === 'xsmall' ? (
            <div className="relative">
              <Icon
                key={index}
                className="text-gray-400"
                path={mdiCircle}
                size={0.5}
              />
              {index > props.total - 1 && (
                <Icon
                  path={mdiClose}
                  className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2 text-red-600"
                  size={1}
                />
              )}
            </div>
          ) : (
            <div className="relative">
              <Icon
                key={index}
                className="-my-2 scale-x-150 scale-y-50 text-gray-400"
                path={mdiRectangle}
                size={1}
              />
              {index > props.total - 1 && (
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
      {props.mode !== 'edit' && (
        <p className={`text-tertiary justify-self-end whitespace-nowrap`}>
          <span className={`${props.current > props.total && 'text-error'}`}>
            {props.current}
          </span>{' '}
          / <span>{props.total}</span>
        </p>
      )}
    </>
  );
};

export default StatBar;
