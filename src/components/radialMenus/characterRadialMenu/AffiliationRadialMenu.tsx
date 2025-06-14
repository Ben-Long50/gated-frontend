import { mdiArrowULeftBottom, mdiCardTextOutline, mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import { useLocation, useNavigate } from 'react-router-dom';
import useModalStore from 'src/stores/modalStore';
import useRadialMenuStore from 'src/stores/radialMenuStore';
import { Character } from 'src/types/character';
import RadialMenu from '../RadialMenu';
import { ReactNode } from 'react';

const AffiliationRadialMenu = ({
  character,
  containerRef,
}: {
  character: Character;
  containerRef: ReactNode;
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const parts = location.pathname.split('/');

  const setBackgroundPath = useModalStore((state) => state.setBackgroundPath);

  const setMenu = useRadialMenuStore((state) => state.setMenu);
  const setMenuOpen = useRadialMenuStore((state) => state.setMenuOpen);

  const openAffiliationModal = () => {
    setBackgroundPath(location.pathname);
    navigate(`${path}/affiliations`);
  };

  const path = (() => {
    if (parts.includes('characters')) {
      return `${character.id}`;
    } else {
      return `characters/${character.id}`;
    }
  })();

  return (
    <RadialMenu
      elementId={character.id}
      containerRef={containerRef}
      array={[
        <div
          onClick={() => {
            navigate(`${path}/affiliations/create`);
            setMenuOpen(false);
          }}
        >
          <Icon className="text-inherit" path={mdiPlus} />
        </div>,
        <div
          onClick={() => {
            setMenu('character', 'large', character.id);
          }}
        >
          <Icon className="text-inherit" path={mdiArrowULeftBottom} />
        </div>,
        <div
          onClick={() => {
            openAffiliationModal();
            setMenuOpen(false);
          }}
        >
          <Icon path={mdiCardTextOutline} className="size-8 text-inherit" />
        </div>,
      ]}
    />
  );
};

export default AffiliationRadialMenu;
