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

  const borderRadiusMap = {
    small: 'rounded-bl-[4px] rounded-tr-[4px]',
    medium: 'rounded-bl-[6px] rounded-tr-[6px]',
    large: 'rounded-bl-[8px] rounded-tr-[8px]',
  };

  const containerRadiusMap = {
    small: ' rounded-bl-[2px] rounded-tr-[2px]',
    medium: ' rounded-bl-[4px] rounded-tr-[4px]',
    large: ' rounded-bl-[6px] rounded-tr-[6px]',
  };

  return (
    <div
      className={`${className} ${radiusMap[chamfer]} relative mb-auto shadow-lg shadow-black`}
    >
      <ThemeBorder
        className={`${borderRadiusMap[chamfer]} timing`}
        borderColor={borderColor}
        chamfer={chamfer}
      />
      <div className={`${containerRadiusMap[chamfer]} overflow-hidden`}>
        {children}
      </div>
    </div>
  );
};

export default ThemeContainer;
