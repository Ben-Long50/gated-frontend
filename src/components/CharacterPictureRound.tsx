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
      {character.picture?.imageUrl ? (
        <CloudinaryImage
          className={`${className}`}
          publicId={character?.picture?.publicId}
          position={character?.picture?.position}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-yellow-300">
          <h2 className="size-10 pl-0.5 pt-1 text-center !text-zinc-950">
            {character.firstName ? character.firstName[0] : character.name[0]}
          </h2>
        </div>
      )}
    </div>
  );
};

export default CharacterPictureRound;
