import {
  Children,
  cloneElement,
  isValidElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

const RadialMenu = ({
  className,
  size,
  children,
}: {
  className?: string;
  size: 'large' | 'medium' | 'small';
  children: ReactNode;
}) => {
  const [menuVisibility, setMenuVisibility] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  const toggleMenuVisibility = () => {
    setMenuVisibility(!menuVisibility);
  };

  const menuRef = useRef(null);

  useEffect(() => {
    const closeMenu = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuVisibility(false);
      }
    };

    document.addEventListener('mousedown', closeMenu);
    return () => document.removeEventListener('mousedown', closeMenu);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (menuVisibility) {
      setTimeout(() => setCoordinates({ x, y }), 300);
    } else {
      setCoordinates({ x, y });
    }

    toggleMenuVisibility();
  };

  let radius = 0;
  let iconSize = 0;

  switch (size) {
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

  const segmentCount = Children.count(children);

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

  return (
    <div
      ref={menuRef}
      className={`${className} absolute inset-0 z-20 cursor-pointer`}
      onClick={(e) => handleClick(e)}
    >
      <div
        className={`${menuVisibility ? 'visible scale-100' : 'invisible scale-0'} timing pointer-events-none absolute grid size-48 -translate-x-1/2 -translate-y-1/2 place-content-center items-start overflow-hidden rounded-full shadow-md shadow-black transition-transform`}
        style={{
          height: diameter,
          width: diameter,
          gridTemplateAreas: 'center',
          top: `${coordinates.y}px`,
          left: `${coordinates.x}px`,
        }}
      >
        {Children.map(children, (child, index) => {
          if (!isValidElement(child)) return null;

          const onClick = child.props?.onClick;
          const active = child.props['data-active'] ?? true;

          return (
            <button
              key={index}
              className={`${!active ? 'opacity-50' : 'hover:bg-yellow-300'} bg-tertiary timing group pointer-events-auto flex items-start justify-center`}
              style={{
                height: diameter / 2 - (diameter / 2) * centerOffset,
                width: pieWidthOutside,
                transform: `rotate(${(360 / segmentCount) * index}deg) translateY(-50%) translateY(-${(diameter / 2) * centerOffset}px)`,
                gridArea: 'center',
                clipPath: `polygon(0% 0%, 100% 0%, ${(pieWidthOutside + pieWidthInside) / 2}px 100%, ${(pieWidthOutside - pieWidthInside) / 2}px 100%)`,
              }}
              onClick={
                active
                  ? (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (onClick) onClick(e);
                      toggleMenuVisibility();
                    }
                  : undefined
              }
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className={`${hoveredIndex === index && active ? 'text-black' : 'text-secondary'}`}
                style={{
                  height: iconSize,
                  width: iconSize,
                  transform: `translateY(${offset}px) rotate(-${(360 / segmentCount) * index}deg)`,
                }}
              >
                {cloneElement(child, { onClick: undefined, active: undefined })}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RadialMenu;
