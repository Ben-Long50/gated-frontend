import { useEffect, useRef, useState } from 'react';
import ThemeBorder from './ThemeBorder';

const ThemeContainer = (props) => {
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });

  const containerRef = useRef(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          height: Math.floor(containerRef.current.offsetHeight),
          width: Math.floor(containerRef.current.offsetWidth),
        });
      }
    };

    updateDimensions();

    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  return (
    <div className="relative">
      <ThemeBorder
        className="absolute right-[1px] top-[1px]"
        height={dimensions.height}
        width={dimensions.width}
        borderColor={props.borderColor}
        chamfer={props.chamfer}
      />
      <div ref={containerRef} className={`${props.className} timing relative`}>
        {props.children}
      </div>
    </div>
  );
};

export default ThemeContainer;
