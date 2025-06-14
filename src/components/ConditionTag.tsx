import { ConditionReference } from 'src/types/condition';
import { useRef } from 'react';
import useRadialMenuStore from 'src/stores/radialMenuStore';
import ConditionRadialMenu from './radialMenus/ConditionRadialMenu';

const ConditionTag = ({ condition }: { condition: ConditionReference }) => {
  const containerRef = useRef(null);

  const menuOpen = useRadialMenuStore((state) => state.menuOpen);
  const setMenuOpen = useRadialMenuStore((state) => state.setMenuOpen);
  const setMenu = useRadialMenuStore((state) => state.setMenu);
  const setCoordinates = useRadialMenuStore((state) => state.setCoordinates);

  const handleMenu = (e: MouseEvent) => {
    if (!containerRef.current) return;
    setMenu('condition', 'medium', condition.id);

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (!menuOpen) {
      setCoordinates(x, y);
    }
    setMenuOpen(!menuOpen);
  };

  const conditionName = condition?.stacks
    ? condition?.condition?.name.replace(/X/g, condition?.stacks?.toString())
    : condition?.condition?.name;

  return (
    <div
      ref={containerRef}
      className={`bg-primary hover:bg-tertiary timing shadow-color relative cursor-pointer select-none rounded border border-red-400 border-opacity-50 px-2 text-base shadow-md hover:border-opacity-100`}
      onClick={(e) => {
        e.stopPropagation();
        handleMenu(e);
      }}
    >
      <p className="whitespace-nowrap text-base">{conditionName}</p>
      <ConditionRadialMenu condition={condition} containerRef={containerRef} />
    </div>
  );
};

export default ConditionTag;
