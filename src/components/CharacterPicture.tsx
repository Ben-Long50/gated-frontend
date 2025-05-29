import { useContext } from 'react';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import CloudinaryImage from './CloudinaryImage';
import { Character } from 'src/types/character';

const CharacterPicture = ({
  character,
  className,
}: {
  character: Character;
  className?: string;
}) => {
  const { accentPrimary } = useContext(ThemeContext);

  return (
    <ThemeContainer
      className="aspect-square"
      chamfer="medium"
      borderColor={accentPrimary}
      overflowHidden={true}
    >
      <CloudinaryImage
        className={`${className}`}
        url={character.picture?.imageUrl}
        alt={`${character.firstName} ${character.lastName}'s image`}
        position={character.picture?.position}
      />
    </ThemeContainer>
  );
};

export default CharacterPicture;
