import CloudinaryImage from './CloudinaryImage';
import { Character } from 'src/types/character';

const CharacterPictureRound = ({
  character,
  className,
}: {
  character: Character;
  className?: string;
}) => {
  return (
    <div className="z-10 aspect-square size-12 shrink-0 overflow-hidden rounded-full shadow-md shadow-black">
      <CloudinaryImage
        className={`${className}`}
        url={character.picture?.imageUrl}
        alt={`${character.firstName} ${character.lastName}'s image`}
        position={character.picture?.position}
      />
    </div>
  );
};

export default CharacterPictureRound;
