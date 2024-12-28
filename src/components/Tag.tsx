import { useState } from 'react';

const Tag = (props) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="bg-primary relative self-start rounded border border-yellow-300 border-opacity-50 px-2 text-base"
      onClick={(e) => e.stopPropagation()}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <p className="text-base">{props.label}</p>
      {hover && (
        <div className="bg-primary scrollbar-secondary absolute left-full top-full z-10 max-h-28 w-48 -translate-x-4 -translate-y-4 overflow-y-auto bg-opacity-90 p-3 clip-4">
          <p className="text-tertiary text-sm">{props.description}</p>
        </div>
      )}
    </div>
  );
};

export default Tag;
