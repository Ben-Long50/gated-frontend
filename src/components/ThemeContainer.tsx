import { CSSProperties, ReactNode } from 'react';
import ThemeBorder from './ThemeBorder';

const ThemeContainer = ({
  className,
  style,
  borderColor,
  chamfer,
  children,
  bgImageUrl,
  overflowHidden,
}: {
  className?: string;
  style?: CSSProperties;
  borderColor: string;
  chamfer: 'small' | 'medium' | 'large';
  children: ReactNode;
  bgImageUrl?: string;
  overflowHidden?: boolean;
}) => {
  const radiusMap = {
    small: 'rounded-br-[27px] rounded-tl-[27px] shadow-md',
    medium: 'rounded-br-[35px] rounded-tl-[35px] shadow-lg',
    large: 'rounded-br-[50px]  rounded-tl-[50px] shadow-lg',
  };

  const chamferMapBg = {
    small: 'clip-4 rounded-bl-[2px] rounded-tr-[2px]',
    medium: 'clip-6 rounded-bl-[4px] rounded-tr-[4px]',
    large: 'clip-8 rounded-bl-[6px] rounded-tr-[6px]',
  };

  return (
    <div
      className={`${className} ${radiusMap[chamfer]} shadow-color relative shadow-lg`}
      style={style}
    >
      <ThemeBorder
        borderColor={borderColor}
        bgImageUrl={bgImageUrl}
        chamfer={chamfer}
      />
      <div
        className={`${!!overflowHidden && `overflow-hidden ${chamferMapBg[chamfer]}`} relative h-full`}
      >
        {children}
      </div>
    </div>
  );
};

export default ThemeContainer;
