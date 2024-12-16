import { mdiRectangle } from '@mdi/js';
import Icon from '@mdi/react';

const StatBar = (props) => {
  return (
    <div className="stat-bar-layout w-full items-center gap-8">
      <h3 className="text-xl font-semibold tracking-widest">{props.title}</h3>
      <div className="flex items-center gap-2">
        {Array.from({ length: props.total }).map((_, index) =>
          index < props.current ? (
            <Icon
              key={index}
              className="scale-x-150 scale-y-50"
              path={mdiRectangle}
              size={1}
              color={props.color}
            />
          ) : (
            <Icon
              key={index}
              className="scale-x-150 scale-y-50 text-gray-400"
              path={mdiRectangle}
              size={1}
            />
          ),
        )}
      </div>
      <p>
        {props.current} / {props.total}
      </p>
    </div>
  );
};

export default StatBar;
