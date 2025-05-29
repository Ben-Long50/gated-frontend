import { mdiLoading } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

const Loading = ({
  className,
  size,
}: {
  className?: string;
  size?: number;
}) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`${theme} flex h-full flex-col items-center justify-center bg-transparent md:gap-8`}
    >
      <Icon
        className={`spin ${className ? className : 'text-accent'}`}
        path={mdiLoading}
        size={size || 5}
      />
    </div>
  );
};

export default Loading;
