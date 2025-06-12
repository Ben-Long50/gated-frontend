import { Character } from 'src/types/character';
import ConditionModal from './modals/ConditionModal';
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
  mdiCardTextOutline,
  mdiMinus,
  mdiPlus,
} from '@mdi/js';
import useProfitsMutation from 'src/hooks/useProfitsMutation/useProfitsMutation';
import AffiliationIcon from './icons/AffiliationIcon';
import ShopIcon from './icons/ShopIcon';
import ShopModal from './modals/ShopModal';
import useModalStore from 'src/stores/modalStore';

const CharacterRadialMenu = ({
  character,
  className,
}: {
  character: Character;
  className?: string;
}) => {
  const { apiUrl, user } = useContext(AuthContext);
  const location = useLocation();
  const parts = location.pathname.split('/');
  const [profitMenu, setProfitMenu] = useState(false);
  const [affiliationMenu, setAffiliationMenu] = useState(false);
  const navigate = useNavigate();

  const editProfits = useProfitsMutation(apiUrl, character.id);

  const setBackgroundPath = useModalStore((state) => state.setBackgroundPath);

  const path = (() => {
    if (parts.includes('characters')) {
      return `${character.id}`;
    } else {
      return `characters/${character.id}`;
    }
  })();

  const openConditionModal = () => {
    setBackgroundPath(location.pathname);
    navigate(`${path}/conditions`);
  };

  const openAffiliationModal = () => {
    setBackgroundPath(location.pathname);
    navigate(`${path}/affiliations`);
  };

  const openShopModal = () => {
    setBackgroundPath(location.pathname);
    navigate(`${path}/shop/global`);
  };

  const toggleProfitMenu = () => {
    setProfitMenu(!profitMenu);
  };

  const toggleAffiliationMenu = () => {
    setAffiliationMenu(!affiliationMenu);
  };

  const userPermissions =
    character.userId === user?.id || character.campaign?.ownerId === user?.id;

  if (!user || !character) return;

  if (profitMenu)
    return (
      <RadialMenu className={`${className}`} size="large">
        <div className="flex justify-center">
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

  if (affiliationMenu)
    return (
      <RadialMenu className={`${className}`} size="large">
        <div onClick={() => navigate(`${path}/affiliations/create`)}>
          <Icon className="text-inherit" path={mdiPlus} />
        </div>
        <div
          onClick={() => {
            toggleAffiliationMenu();
          }}
        >
          <Icon className="text-inherit" path={mdiArrowULeftBottom} />
        </div>
        <div onClick={() => openAffiliationModal()}>
          <Icon path={mdiCardTextOutline} className="size-8 text-inherit" />
        </div>
      </RadialMenu>
    );

  return (
    <RadialMenu className={`${className}`} size="large">
      {userPermissions && (
        <div onClick={() => openConditionModal()}>
          <ConditionIcon className="text-inherit" />
        </div>
      )}
      {userPermissions && (
        <div
          onClick={() => {
            toggleProfitMenu();
          }}
        >
          <ProfitsIcon className="text-inherit" />
        </div>
      )}
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
          toggleAffiliationMenu();
        }}
      >
        <AffiliationIcon className="text-inherit" />
      </div>
      {character.userId === user.id && (
        <div onClick={() => openShopModal()}>
          <ShopIcon className="text-inherit" />
        </div>
      )}
    </RadialMenu>
  );
};

export default CharacterRadialMenu;
