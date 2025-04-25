import { mdiTriangleDown } from '@mdi/js';
import Icon from '@mdi/react';

const ArrowHeader2 = ({
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
      className={`${className} text-left ${reverse && 'flex-row-reverse'} flex items-center gap-4`}
    >
      <Icon
        className="text-primary shrink-0"
        path={mdiTriangleDown}
        size={0.5}
        rotate={reverse ? 90 : -90}
      />
      <h2 className="z-10">{title}</h2>
    </div>
  );
};

export default ArrowHeader2;
