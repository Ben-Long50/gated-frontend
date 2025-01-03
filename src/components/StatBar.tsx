import { mdiCircle, mdiRectangle } from '@mdi/js';
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
        {Array.from({ length: props.total }).map((_, index) =>
          index < props.current ? (
            layoutSize === 'small' || layoutSize === 'xsmall' ? (
              <Icon
                key={index}
                className=""
                path={mdiCircle}
                size={0.5}
                color={props.color}
              />
            ) : (
              <Icon
                key={index}
                className="-my-2 scale-x-150 scale-y-50"
                path={mdiRectangle}
                size={1}
                color={props.color}
              />
            )
          ) : layoutSize === 'small' || layoutSize === 'xsmall' ? (
            <Icon
              key={index}
              className="text-gray-400"
              path={mdiCircle}
              size={0.5}
            />
          ) : (
            <Icon
              key={index}
              className="-my-2 scale-x-150 scale-y-50 text-gray-400"
              path={mdiRectangle}
              size={1}
            />
          ),
        )}
      </div>
      {props.mode !== 'edit' && (
        <p className={`text-tertiary justify-self-end whitespace-nowrap`}>
          {props.current} / {props.total}
        </p>
      )}
    </>
  );
};

export default StatBar;
