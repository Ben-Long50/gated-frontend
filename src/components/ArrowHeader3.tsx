import { mdiTriangleDown } from '@mdi/js';
import Icon from '@mdi/react';

const ArrowHeader3 = ({
  title,
  className,
  reverse,
}: {
  title: string;
  className?: string;
  reverse?: boolean;
}) => {
  return (
    <div
      className={`${className} ${reverse && 'flex-row-reverse'} flex items-center gap-4`}
    >
      <Icon
        className="text-primary shrink-0"
        path={mdiTriangleDown}
        size={0.4375}
        rotate={reverse ? 90 : -90}
      />
      <h3>{title}</h3>
    </div>
  );
};

export default ArrowHeader3;
