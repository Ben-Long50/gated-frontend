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
import ProfitsIcon from './icons/ProfitsIcon';
import Icon from '@mdi/react';
import {
  mdiArrowULeftBottom,
  mdiCurrencyUsd,
  mdiMinus,
  mdiPlus,
} from '@mdi/js';
import useProfitsMutation from 'src/hooks/useProfitsMutation/useProfitsMutation';

const CharacterRadialMenu = ({
  character,
  className,
}: {
  character: Character;
  className?: string;
}) => {
  const { apiUrl, user } = useContext(AuthContext);
  const [conditionModal, setConditionModal] = useState(false);
  const [profitMenu, setProfitMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const parts = location.pathname.split('/');

  const editProfits = useProfitsMutation(apiUrl, character.id);

  const toggleConditionModal = () => {
    setConditionModal(!conditionModal);
  };

  const toggleProfitMenu = () => {
    setProfitMenu(!profitMenu);
  };

  const path = (() => {
    if (parts.includes('campaigns')) {
      return `characters/${character.id}`;
    } else {
      return `${character.id}`;
    }
  })();

  return !profitMenu ? (
    <RadialMenu className={`${className}`} radius={80} iconSize={32}>
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
        <EquipmentIcon className="text-inherit" />
      </div>
      <div onClick={() => navigate(`${path}/deployments`)}>
        <HangarIcon className="text-inherit" />
      </div>
      <div onClick={() => navigate(`${path}`)}>
        <CharacterIcon className="text-inherit" />
      </div>
      <div
        onClick={() => {
          toggleProfitMenu();
        }}
        // data-active={character.campaign?.ownerId === user?.id}
      >
        <Icon className="text-inherit" path={mdiCurrencyUsd} />
      </div>
    </RadialMenu>
  ) : (
    <RadialMenu className={`${className}`} radius={80} iconSize={32}>
      <div>
        <p className="text-2xl font-semibold !text-inherit">
          {character.profits || 0}
        </p>
      </div>
      <div
        onClick={() => {
          editProfits.mutate(1);
        }}
      >
        <Icon className="text-inherit" path={mdiPlus} />
      </div>
      <div
        onClick={() => {
          toggleProfitMenu();
        }}
      >
        <Icon className="text-inherit" path={mdiArrowULeftBottom} />
      </div>
      <div
        onClick={() => {
          editProfits.mutate(-1);
        }}
      >
        <Icon className="text-inherit" path={mdiMinus} />
      </div>
    </RadialMenu>
  );
};

export default CharacterRadialMenu;
