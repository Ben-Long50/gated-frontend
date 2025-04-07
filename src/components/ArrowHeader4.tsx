import { mdiTriangleDown } from '@mdi/js';
import Icon from '@mdi/react';

const ArrowHeader4 = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <div className={`${className} flex items-center gap-4`}>
      <Icon
        className="text-primary"
        path={mdiTriangleDown}
        size={0.375}
        rotate={-90}
      />
      <h4>{title}</h4>
    </div>
  );
};

export default ArrowHeader4;
