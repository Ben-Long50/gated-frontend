import { mdiTriangleDown } from '@mdi/js';
import Icon from '@mdi/react';

const ArrowHeader2 = ({
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
        size={0.5}
        rotate={-90}
      />
      <h2>{title}</h2>
    </div>
  );
};

export default ArrowHeader2;
