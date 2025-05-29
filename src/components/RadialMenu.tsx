import { mdiDotsHorizontal } from '@mdi/js';
import BtnIcon from './buttons/BtnIcon';
import {
  Children,
  cloneElement,
  isValidElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import Icon from '@mdi/react';

const RadialMenu = ({
  className,
  radius,
  children,
}: {
  className?: string;
  radius?: number;
  children: ReactNode;
}) => {
  const [menuVisibility, setMenuVisibility] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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

  const segmentCount = Children.count(children);

  const diameter = radius ? radius * 2 : 192;

  const angle = 360 / (2 * segmentCount);

  const angleInRadians = angle * (Math.PI / 180);

  const pieGap = (diameter / segmentCount) * 0.1;

  const pieWidthOutside =
    segmentCount === 2
      ? diameter
      : diameter * Math.tan(angleInRadians) - pieGap;

  const pieWidthInside = diameter * 0.05 * Math.tan(angleInRadians) - pieGap;

  return (
    <div className={`${className}`}>
      <button
        className="group p-2"
        onClick={() => {
          setMenuVisibility(true);
        }}
      >
        <Icon
          className="text-secondary group-hover:text-accent size-8"
          path={mdiDotsHorizontal}
        />
      </button>
      <div
        ref={menuRef}
        className={`${menuVisibility ? 'visible opacity-100' : 'invisible opacity-0'} timing pointer-events-none absolute left-1/2 top-1/2 grid size-48 -translate-x-1/2 -translate-y-1/2 place-content-center place-items-center rounded-full shadow-md shadow-black`}
        style={{
          height: diameter,
          width: diameter,
          gridTemplateAreas: 'center',
          WebkitMaskImage: `radial-gradient(transparent  ${diameter / 5}px, black  ${diameter / 5}px)`,
          maskImage: `radial-gradient(transparent ${diameter / 5}px, black  ${diameter / 5}px)`,
        }}
      >
        {Children.map(children, (child, index) => {
          if (!isValidElement(child)) return null;

          const childOnClick = child.props?.onClick;

          return (
            <button
              key={index}
              className="bg-tertiary timing group pointer-events-auto flex items-start justify-center pt-2.5 hover:bg-yellow-300"
              style={{
                height: diameter / 2 - (diameter / 2) * 0.05,
                width: pieWidthOutside,
                transform: `rotate(${(360 / segmentCount) * index}deg) translateY(-50%) translateY(-${(diameter / 2) * 0.05}px)`,
                gridArea: 'center',
                clipPath: `polygon(0% 0%, 100% 0%, ${(pieWidthOutside + pieWidthInside) / 2}px 100%, ${(pieWidthOutside - pieWidthInside) / 2}px 100%)`,
              }}
              onClick={(e) => {
                e.stopPropagation();
                childOnClick(e);
              }}
              // onMouseUp={(e) => {
              //   e.stopPropagation();
              //   childOnClick(e);
              // }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className={`${hoveredIndex === index ? 'text-black' : 'text-secondary'} row-start-1 size-8`}
                style={{
                  transform: `rotate(-${(360 / segmentCount) * index}deg)`,
                }}
              >
                {cloneElement(child, { onClick: undefined })}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RadialMenu;
