import { useContext } from 'react';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import CloudinaryImage from './CloudinaryImage';
import { Item } from 'src/types/item';

const ItemPicture = ({
  item,
  className,
}: {
  item: Item;
  className?: string;
}) => {
  const { accentPrimary, rarityColorMap } = useContext(ThemeContext);
  return (
    <ThemeContainer
      borderColor={rarityColorMap[item.rarity] || accentPrimary}
      chamfer="medium"
      className={`${className} relative mb-auto shrink-0 opacity-100`}
      overflowHidden={true}
    >
      <div
        className="absolute inset-0 z-10 opacity-50 clip-6"
        style={{
          backgroundImage: `radial-gradient(circle, transparent 65%, ${rarityColorMap[item.rarity]} 100%)`,
        }}
      />
      <CloudinaryImage
        className="timing w-full clip-6"
        position={item.picture?.position}
        publicId={item.picture?.publicId}
      />
    </ThemeContainer>
  );
};

export default ItemPicture;
