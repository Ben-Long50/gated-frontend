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
  className: string;
}) => {
  const { accentPrimary } = useContext(ThemeContext);

  return (
    <div className="grid grid-cols-[1fr_auto_1fr]">
      <ThemeContainer
        className="col-span-1 col-start-2 rounded-br-5xl rounded-tl-5xl shadow-lg shadow-slate-950"
        chamfer="medium"
        borderColor={accentPrimary}
      >
        <CloudinaryImage
          className={`${className} bg-primary w-full`}
          detailsOpen={true}
          url={character.picture?.imageUrl}
          alt={`${character.firstName} ${character.lastName}'s image`}
        />
      </ThemeContainer>
    </div>
  );
};

export default CharacterPicture;
