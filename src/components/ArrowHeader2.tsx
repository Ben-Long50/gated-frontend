import { mdiTriangleDown } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext } from 'react';
import { LayoutContext } from 'src/contexts/LayoutContext';

const ArrowHeader2 = ({
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
        className={`${mobile ? 'mt-[9px]' : 'mt-[11px]'} text-primary shrink-0`}
        path={mdiTriangleDown}
        size={0.5}
        rotate={reverse ? 90 : -90}
      />
      <h2 className="z-10">{title}</h2>
    </div>
  );
};

export default ArrowHeader2;
