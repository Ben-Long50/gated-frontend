import { useContext } from 'react';
import { ThemeContext } from 'src/contexts/ThemeContext';
import { Picture } from 'src/types/picture';

const ThemeBorder = ({
  borderColor,
  chamfer,
  bgImageUrl,
}: {
  borderColor: string;
  chamfer: string;
  bgImageUrl?: Picture;
}) => {
  const { theme } = useContext(ThemeContext);

  const chamferMapBorder = {
    small: 'clip-3 rounded-bl-[4px] rounded-tr-[4px]',
    medium: 'clip-5 rounded-bl-[6px] rounded-tr-[6px]',
    large: 'clip-7 rounded-bl-[8px] rounded-tr-[8px]',
  };

  const chamferMapBg = {
    small: 'clip-4 rounded-bl-[2px] rounded-tr-[2px]',
    medium: 'clip-6 rounded-bl-[4px] rounded-tr-[4px]',
    large: 'clip-8 rounded-bl-[6px] rounded-tr-[6px]',
  };

  return (
    <>
      <div
        className={`${chamferMapBorder[chamfer]} timing absolute right-[2px] top-[2px] z-0 h-full w-full`}
        style={{
          backgroundColor: `${borderColor}`,
        }}
      />
      <div
        className={`${chamferMapBg[chamfer]} bg-primary absolute z-0 h-full w-full`}
        style={{
          backgroundImage: `url(${bgImageUrl?.imageUrl})`,
          backgroundPosition: bgImageUrl?.position
            ? `${bgImageUrl.position.x}% ${bgImageUrl.position.y}%`
            : '50% 50%',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      />
      {bgImageUrl && (
        <div
          className={`${chamferMapBg[chamfer]} absolute w-full bg-white bg-opacity-50 dark:bg-black`}
        />
      )}
    </>
  );
};

export default ThemeBorder;
