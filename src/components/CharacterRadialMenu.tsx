import { Character } from 'src/types/character';
import ConditionLinkField from './form_fields/ConditionLinkField';
import ConditionIcon from './icons/ConditionIcon';
import RadialMenu from './RadialMenu';
import { useLocation, useNavigate } from 'react-router-dom';
import EquipmentIcon from './icons/EquipmentIcon';
import CharacterIcon from './icons/CharacterIcon';
import { useContext, useState } from 'react';
import { AuthContext } from 'src/contexts/AuthContext';
import HangarIcon from './icons/HangarIcon';

const CharacterRadialMenu = ({
  character,
  className,
}: {
  character: Character;
  className?: string;
}) => {
  const { user } = useContext(AuthContext);
  const [conditionModal, setConditionModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const parts = location.pathname.split('/');

  const toggleConditionModal = () => {
    setConditionModal(!conditionModal);
  };

  const path = (() => {
    if (parts.includes('campaigns')) {
      return `characters/${character.id}`;
    } else {
      return `${character.id}`;
    }
  })();

  return (
    <RadialMenu className={`${className}`} radius={80}>
      <div
        onClick={() => toggleConditionModal()}
        data-active={
          character.userId === user?.id ||
          character.campaign?.ownerId === user?.id
        }
      >
        <ConditionIcon className="size-8 text-inherit" />
        <ConditionLinkField
          character={character}
          conditionModal={conditionModal}
          toggleConditionModal={toggleConditionModal}
        />
      </div>
      <div onClick={() => navigate(`${path}/equipment`)}>
        <EquipmentIcon className="size-8 text-inherit" />
      </div>
      <div onClick={() => navigate(`${path}/deployments`)}>
        <HangarIcon className="size-8 text-inherit" />
      </div>
      <div onClick={() => navigate(`${path}`)}>
        <CharacterIcon className="size-8 text-inherit" />
      </div>
    </RadialMenu>
  );
};

export default CharacterRadialMenu;
