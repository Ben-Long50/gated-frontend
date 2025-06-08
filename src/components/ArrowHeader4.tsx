import { mdiTriangleDown } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext } from 'react';
import { LayoutContext } from 'src/contexts/LayoutContext';

const ArrowHeader4 = ({
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
        className={`${mobile ? 'mt-[7px]' : 'mt-[9px]'} text-primary shrink-0`}
        path={mdiTriangleDown}
        size={0.375}
        rotate={reverse ? 90 : -90}
      />
      <h4>{title}</h4>
    </div>
  );
};

export default ArrowHeader4;
