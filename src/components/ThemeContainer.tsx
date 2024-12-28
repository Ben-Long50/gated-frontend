import { useEffect, useRef, useState } from 'react';
import ThemeBorder from './ThemeBorder';

const ThemeContainer = (props) => {
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });

  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new ResizeObserver(updateDimensions);

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const updateDimensions = () => {
    if (containerRef.current) {
      setDimensions({
        height: Math.floor(containerRef.current.offsetHeight),
        width: Math.floor(containerRef.current.offsetWidth),
      });
    }
  };

  return (
    <div ref={containerRef} className={`${props.className} relative my-auto`}>
      <ThemeBorder
        className="absolute right-[1px] top-[1px]"
        height={dimensions.height}
        width={dimensions.width}
        borderColor={props.borderColor}
        chamfer={props.chamfer}
      />
      {props.children}
    </div>
  );
};

export default ThemeContainer;
