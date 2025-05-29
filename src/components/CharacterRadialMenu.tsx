import { Character } from 'src/types/character';
import ConditionLinkField from './form_fields/ConditionLinkField';
import ConditionIcon from './icons/ConditionIcon';
import RadialMenu from './RadialMenu';
import { useLocation, useNavigate } from 'react-router-dom';
import EquipmentIcon from './icons/EquipmentIcon';
import CharacterIcon from './icons/CharacterIcon';
import { useState } from 'react';
import { mdiDotsHorizontal } from '@mdi/js';
import Icon from '@mdi/react';

const CharacterRadialMenu = ({
  character,
  className,
}: {
  character: Character;
  className: string;
}) => {
  const [conditionModal, setConditionModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const parts = location.pathname.split('/');

  const toggleConditionModal = () => {
    setConditionModal(!conditionModal);
  };

  return (
    <div className={`${className} group`}>
      <Icon
        path={mdiDotsHorizontal}
        className="text-secondary group-hover:text-accent shrink-0"
      />
      <RadialMenu className="absolute top-0 z-20" radius={80}>
        <div onClick={() => toggleConditionModal()}>
          <ConditionIcon className="size-8 text-inherit" />
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
          <EquipmentIcon className="size-8 text-inherit" />
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
          <CharacterIcon className="size-8 text-inherit" />
        </div>
      </RadialMenu>
    </div>
  );
};

export default CharacterRadialMenu;
