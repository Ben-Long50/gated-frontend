import { mdiTriangleDown } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext } from 'react';
import { LayoutContext } from 'src/contexts/LayoutContext';

const ArrowHeader3 = ({
  title,
  className,
  reverse,
}: {
  title: string;
  className?: string;
  reverse?: boolean;
}) => {
  const { mobile } = useContext(LayoutContext);

  return (
    <div
      className={`${className} text-left ${reverse && 'flex-row-reverse'} flex items-start gap-4`}
    >
      <Icon
        className={`${mobile ? 'mt-[8px]' : 'mt-[10px]'} text-primary shrink-0`}
        path={mdiTriangleDown}
        size={0.4375}
        rotate={reverse ? 90 : -90}
      />
      <h3>{title}</h3>
    </div>
  );
};

export default ArrowHeader3;
