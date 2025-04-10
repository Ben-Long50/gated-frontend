import { useContext } from 'react';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import { WeaponWithKeywords } from 'src/types/weapon';
import { ArmorWithKeywords } from 'src/types/armor';
import { CyberneticWithKeywords } from 'src/types/cybernetic';
import { VehicleWithWeapons } from 'src/types/vehicle';
import CloudinaryImage from './CloudinaryImage';
import { Item } from 'src/types/item';

const ItemPicture = ({
  item,
  className,
}: {
  item:
    | WeaponWithKeywords
    | ArmorWithKeywords
    | CyberneticWithKeywords
    | VehicleWithWeapons
    | Item;
  className?: string;
}) => {
  const { accentPrimary, rarityColorMap } = useContext(ThemeContext);
  return (
    <ThemeContainer
      borderColor={rarityColorMap[item.rarity] || accentPrimary}
      chamfer="medium"
      className={`${className} relative mb-auto shrink-0 opacity-100`}
    >
      <div
        className="absolute inset-0 z-10 opacity-50 clip-6"
        style={{
          backgroundImage: `radial-gradient(circle, transparent 65%, ${rarityColorMap[item.rarity]} 100%)`,
        }}
      />
      <CloudinaryImage
        className="timing clip-6"
        url={item.picture?.imageUrl}
        alt={item.name + ' ' + 'picture'}
      />
    </ThemeContainer>
  );
};

export default ItemPicture;
