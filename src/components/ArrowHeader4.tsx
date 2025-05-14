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
        className={`${className ? 'text-inherit' : 'text-primary'} shrink-0`}
        path={mdiTriangleDown}
        size={0.375}
        rotate={-90}
      />
      <h4 className={`${className ? '!text-inherit' : 'text-primary'} `}>
        {title}
      </h4>
    </div>
  );
};

export default ArrowHeader4;
