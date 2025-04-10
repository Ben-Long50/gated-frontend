import { mdiTriangleDown } from '@mdi/js';
import Icon from '@mdi/react';

const ArrowHeader1 = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <div className={`${className} flex items-center gap-4`}>
      <Icon
        className="text-primary shrink-0"
        path={mdiTriangleDown}
        size={0.625}
        rotate={-90}
      />
      <h1>{title}</h1>
    </div>
  );
};

export default ArrowHeader1;
