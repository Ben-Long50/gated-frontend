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
    small:
      'rounded-tl-4xl rounded-br-4xl rounded-br-5xl rounded-tl-5xl shadow-md shadow-zinc-950',
    medium:
      'rounded-tl-5xl rounded-br-5xl rounded-br-5xl rounded-tl-5xl shadow-lg shadow-zinc-950',
    large:
      'rounded-tl-5xl rounded-br-5xl rounded-br-5xl rounded-tl-5xl shadow-lg shadow-zinc-950',
  };

  const chamferMapBg = {
    small: 'clip-4 rounded-bl-[2px] rounded-tr-[2px]',
    medium: 'clip-6 rounded-bl-[4px] rounded-tr-[4px]',
    large: 'clip-8 rounded-bl-[6px] rounded-tr-[6px]',
  };

  return (
    <div
      className={`${className} ${radiusMap[chamfer]} relative shadow-lg shadow-black`}
      style={style}
    >
      <ThemeBorder
        borderColor={borderColor}
        bgImageUrl={bgImageUrl}
        chamfer={chamfer}
      />
      <div
        className={`${!!overflowHidden && `overflow-hidden ${chamferMapBg[chamfer]}`} relative`}
      >
        {children}
      </div>
    </div>
  );
};

export default ThemeContainer;
