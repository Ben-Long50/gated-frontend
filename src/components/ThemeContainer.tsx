import { ReactNode } from 'react';
import ThemeBorder from './ThemeBorder';

const ThemeContainer = ({
  className,
  borderColor,
  chamfer,
  children,
}: {
  className?: string;
  borderColor: string;
  chamfer: string;
  children: ReactNode;
}) => {
  const radiusMap = {
    small: 'rounded-tl-4xl rounded-br-4xl',
    medium: 'rounded-tl-5xl rounded-br-5xl',
    large: 'rounded-tl-5xl rounded-br-5xl',
  };

  return (
    <div
      className={`${className} ${radiusMap[chamfer]} relative shadow-lg shadow-black`}
    >
      <ThemeBorder borderColor={borderColor} chamfer={chamfer} />
      {children}
    </div>
  );
};

export default ThemeContainer;
