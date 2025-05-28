import { mdiDotsHorizontal } from '@mdi/js';
import BtnIcon from './buttons/BtnIcon';
import { useState } from 'react';
import ConditionIcon from './icons/ConditionIcon';
import { Character } from 'src/types/character';
import ConditionLinkField from './form_fields/ConditionLinkField';

const CharacterMenu = ({
  className,
  character,
}: {
  className?: string;
  character: Character;
}) => {
  const [menuVisibility, setMenuVisibility] = useState(false);
  const [conditionModal, setConditionModal] = useState(false);

  const toggleConditionModal = () => {
    setConditionModal(!conditionModal);
  };

  return (
    <div className={`${className}`}>
      <BtnIcon
        active={true}
        path={mdiDotsHorizontal}
        onClick={() => {
          setMenuVisibility(!menuVisibility);
        }}
      />
      <div
        className={`${menuVisibility ? 'visible opacity-100' : 'invisible opacity-0'} timing bg-tertiary pointer-events-none absolute left-1/2 top-1/2 grid size-48 -translate-x-1/2 -translate-y-1/2 place-content-center place-items-center rounded-full shadow-md shadow-black`}
        style={{
          gridTemplateAreas: 'center',
          WebkitMaskImage: 'radial-gradient(transparent 0, black 40px)',
          maskImage: 'radial-gradient(transparent 40px, black 40px)',
        }}
      >
        <button
          className="bg-tertiary timing group pointer-events-auto size-8"
          style={{
            transform: 'rotate(-90deg) translateY(-68px) rotate(90deg)',
            gridArea: 'center',
          }}
          onClick={() => toggleConditionModal()}
        >
          <ConditionIcon className="group-hover:text-accent timing text-secondary" />
          <ConditionLinkField
            character={character}
            conditionModal={conditionModal}
            toggleConditionModal={toggleConditionModal}
          />
        </button>
        <button
          className="bg-tertiary timing group pointer-events-auto size-8"
          style={{
            transform: 'rotate(-135deg) translateY(-68px) rotate(135deg)',
            gridArea: 'center',
          }}
        >
          <ConditionIcon className="group-hover:text-accent timing text-secondary" />
        </button>
      </div>
    </div>
  );
};

export default CharacterMenu;
