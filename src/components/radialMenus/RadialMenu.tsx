import useRadialMenuStore from 'src/stores/radialMenuStore';
import {
  isValidElement,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ThemeContext } from 'src/contexts/ThemeContext';

const RadialMenu = ({
  elementId,
  containerRef,
  array,
}: {
  elementId: number;
  containerRef: ReactNode;
  array: { label: string; element: ReactNode }[];
}) => {
  const { accentPrimary } = useContext(ThemeContext);

  const menuOpen = useRadialMenuStore((state) => state.menuOpen);
  const menuId = useRadialMenuStore((state) => state.menuId);
  const menuSize = useRadialMenuStore((state) => state.menuSize);
  const setMenuOpen = useRadialMenuStore((state) => state.setMenuOpen);
  const coordinates = useRadialMenuStore((state) => state.coordinates);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const menuRef = useRef(null);

  useEffect(() => {
    if (!containerRef?.current) return;

    const closeMenu = (e: MouseEvent) => {
      if (!containerRef.current.contains(e.target as Node) && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('click', closeMenu);
    return () => window.removeEventListener('click', closeMenu);
  }, [containerRef, menuOpen]);

  const elements = array.map((item) => item.element);
  const labels = array.map((item) => item.label);

  let radius = 0;
  let iconSize = 0;

  switch (menuSize) {
    case 'large':
      radius = 80;
      iconSize = 32;
      break;
    case 'medium':
      radius = 67.5;
      iconSize = 26;
      break;
    case 'small':
      radius = 55;
      iconSize = 20;
      break;
    default:
      break;
  }

  const segmentCount = array?.length;

  const active = true;

  const diameter = radius ? radius * 2 : 192;

  const angle = 360 / (2 * segmentCount);

  const angleInRadians = angle * (Math.PI / 180);

  const pieGap = (diameter / segmentCount) * 0.1;

  const pieWidthOutside =
    segmentCount === 2
      ? diameter
      : diameter * Math.tan(angleInRadians) - pieGap;

  const offset = iconSize
    ? Math.ceil(((diameter * 4) / 11.5 - iconSize) / 2)
    : 0;

  const centerOffset = 0.25;

  const pieWidthInside =
    diameter * centerOffset * Math.tan(angleInRadians) - pieGap;

  const sliceDims = {
    segmentCount,
    diameter,
    pieWidthOutside,
    pieWidthInside,
    offset,
    centerOffset,
  };

  return (
    <div
      className="absolute z-20"
      style={{ top: `${coordinates.y}px`, left: `${coordinates.x}px` }}
    >
      {hoveredIndex !== null && (
        <p
          className={`timing bg-primary absolute whitespace-nowrap rounded border px-1 text-sm`}
          style={{
            transform: `translateX(-50%) translateY(-${diameter / 2 + diameter * 0.2}px)`,
            borderColor: accentPrimary,
          }}
        >
          {labels[hoveredIndex]}
        </p>
      )}
      <div
        ref={menuRef}
        className={`${menuId === elementId && menuOpen ? 'visible scale-100' : 'invisible scale-0'} timing shadow-color grid size-48 -translate-x-1/2 -translate-y-1/2 place-content-center items-start overflow-hidden rounded-full shadow-md transition-transform`}
        style={{
          height: diameter,
          width: diameter,
          gridTemplateAreas: 'center',
        }}
      >
        {elements?.map((element, index) => {
          if (!isValidElement(element)) return null;

          const onClick = element.props.onClick || null;

          return (
            <button
              key={index}
              className={`${!active && 'opacity-50'} bg-tertiary timing group pointer-events-auto flex items-start justify-center`}
              style={{
                backgroundColor: hoveredIndex === index && accentPrimary,
                height:
                  sliceDims.diameter / 2 -
                  (sliceDims.diameter / 2) * sliceDims.centerOffset,
                width: sliceDims.pieWidthOutside,
                transform: `rotate(${(360 / sliceDims.segmentCount) * index}deg) translateY(-50%) translateY(-${(sliceDims.diameter / 2) * sliceDims.centerOffset}px)`,
                gridArea: 'center',
                clipPath: `polygon(0% 0%, 100% 0%, ${(sliceDims.pieWidthOutside + sliceDims.pieWidthInside) / 2}px 100%, ${(sliceDims.pieWidthOutside - sliceDims.pieWidthInside) / 2}px 100%)`,
              }}
              onClick={(e) => {
                e.stopPropagation();
                if (onClick) {
                  onClick();
                }
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className={`${hoveredIndex === index && active ? 'text-black' : 'text-secondary'} pointer-events-none`}
                style={{
                  height: iconSize,
                  width: iconSize,
                  transform: `translateY(${sliceDims.offset}px) rotate(-${(360 / sliceDims.segmentCount) * index}deg)`,
                }}
              >
                {element}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RadialMenu;
