import { Character } from 'src/types/character';
import ConditionIcon from '../../icons/ConditionIcon';
import { useLocation, useNavigate } from 'react-router-dom';
import EquipmentIcon from '../../icons/EquipmentIcon';
import CharacterIcon from '../../icons/CharacterIcon';
import { useContext } from 'react';
import { AuthContext } from 'src/contexts/AuthContext';
import HangarIcon from '../../icons/HangarIcon';
import ProfitsIcon from '../../icons/ProfitsIcon';
import AffiliationIcon from '../../icons/AffiliationIcon';
import ShopIcon from '../../icons/ShopIcon';
import useModalStore from 'src/stores/modalStore';
import useCharacters from 'src/hooks/useCharacters';
import useRadialMenuStore from 'src/stores/radialMenuStore';
import ProfitRadialMenu from './ProfitRadialMenu';
import RadialMenu from '../RadialMenu';
import AffiliationRadialMenu from './AffiliationRadialMenu';

const CharacterRadialMenu = ({
  character,
  containerRef,
}: {
  character: Character;
  containerRef: ReactNode;
}) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const parts = location.pathname.split('/');
  const navigate = useNavigate();

  const { activeCharacter } = useCharacters();

  const setBackgroundPath = useModalStore((state) => state.setBackgroundPath);

  const setMenuOpen = useRadialMenuStore((state) => state.setMenuOpen);
  const setMenu = useRadialMenuStore((state) => state.setMenu);
  const menuType = useRadialMenuStore((state) => state.menuType);

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

  const openShopModal = () => {
    setBackgroundPath(location.pathname);
    if (character.npcTypes?.includes('shop') && character.userId !== user?.id) {
      navigate(`characters/${activeCharacter?.id}/shop/${character.id}/all`);
    } else {
      navigate(`${path}/shop/global/weapons`);
    }
  };

  const userPermissions =
    character?.userId === user?.id || character?.campaign?.ownerId === user?.id
      ? [
          {
            label: 'Conditions',
            element: (
              <div
                onClick={() => {
                  openConditionModal();
                  setMenuOpen(false);
                }}
              >
                <ConditionIcon className="text-inherit" />
              </div>
            ),
          },

          {
            label: 'Profits',
            element: (
              <div
                onClick={() => {
                  setMenu('profit', 'large', character.id);
                }}
              >
                <ProfitsIcon className="text-inherit" />
              </div>
            ),
          },
        ]
      : [];

  const shop =
    character?.userId === user?.id || character?.npcTypes?.includes('shop')
      ? [
          {
            label: 'Shop',
            element: (
              <div
                onClick={() => {
                  openShopModal();
                  setMenuOpen(false);
                }}
              >
                <ShopIcon className="text-inherit" />
              </div>
            ),
          },
        ]
      : [];

  if (!user || !character) return;

  if (menuType === 'profit')
    return (
      <ProfitRadialMenu character={character} containerRef={containerRef} />
    );

  if (menuType === 'affiliation')
    return (
      <AffiliationRadialMenu
        character={character}
        containerRef={containerRef}
      />
    );

  return (
    <RadialMenu
      elementId={character.id}
      containerRef={containerRef}
      array={[
        {
          label: 'Character Sheet',
          element: (
            <div
              onClick={() => {
                navigate(`${path}`);
                setMenuOpen(false);
              }}
            >
              <CharacterIcon className="text-inherit" />
            </div>
          ),
        },
        {
          label: 'Equipment',
          element: (
            <div
              onClick={() => {
                navigate(`${path}/equipment`);
                setMenuOpen(false);
              }}
            >
              <EquipmentIcon className="text-inherit" />
            </div>
          ),
        },
        {
          label: 'Drones & Vehicles',
          element: (
            <div
              onClick={() => {
                navigate(`${path}/deployments`);
                setMenuOpen(false);
              }}
            >
              <HangarIcon className="text-inherit" />
            </div>
          ),
        },

        {
          label: 'Affiliations',
          element: (
            <div
              onClick={() => {
                setMenu('affiliation', 'large', character.id);
              }}
            >
              <AffiliationIcon className="text-inherit" />
            </div>
          ),
        },
        ...userPermissions,
        ...shop,
      ]}
    />
  );
};

export default CharacterRadialMenu;
