import { mdiTriangleDown } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext } from 'react';
import { LayoutContext } from 'src/contexts/LayoutContext';

const ArrowHeader1 = ({
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
        className={`${mobile ? 'mt-[10px]' : 'mt-[12px]'} text-primary shrink-0`}
        path={mdiTriangleDown}
        size={0.625}
        rotate={reverse ? 90 : -90}
      />
      <h1>{title}</h1>
    </div>
  );
};

export default ArrowHeader1;
