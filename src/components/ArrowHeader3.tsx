import { mdiTriangleDown } from '@mdi/js';
import Icon from '@mdi/react';

const ArrowHeader3 = ({
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
        size={0.4375}
        rotate={-90}
      />
      <h3>{title}</h3>
    </div>
  );
};

export default ArrowHeader3;
