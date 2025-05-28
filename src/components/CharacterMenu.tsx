import { Character } from 'src/types/character';
import ConditionLinkField from './form_fields/ConditionLinkField';
import ConditionIcon from './icons/ConditionIcon';
import RadialMenu from './RadialMenu';
import { useLocation, useNavigate } from 'react-router-dom';
import EquipmentIcon from './icons/EquipmentIcon';
import CharacterIcon from './icons/CharacterIcon';
import { useState } from 'react';

const CharacterMenu = ({ character }: { character: Character }) => {
  const [conditionModal, setConditionModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const parts = location.pathname.split('/');

  console.log(parts);

  const toggleConditionModal = () => {
    setConditionModal(!conditionModal);
  };
  return (
    <RadialMenu className="absolute right-2 top-2 z-20" radius={80}>
      <div onClick={() => toggleConditionModal()}>
        <ConditionIcon className="text-inherit group-hover:scale-125" />
        <ConditionLinkField
          character={character}
          conditionModal={conditionModal}
          toggleConditionModal={toggleConditionModal}
        />
      </div>
      <div
        onClick={() =>
          navigate(
            parts.includes('campaigns')
              ? `characters/${character.id}/equipment`
              : `${character.id}/equipment`,
          )
        }
      >
        <EquipmentIcon className="text-inherit group-hover:scale-125" />
      </div>
      <div
        onClick={() =>
          navigate(
            parts.includes('campaigns')
              ? `characters/${character.id}`
              : `${character.id}`,
          )
        }
      >
        <CharacterIcon className="text-inherit group-hover:scale-125" />
      </div>
    </RadialMenu>
  );
};

export default CharacterMenu;
