import { Item } from 'src/types/item';
import ConditionIcon from '../../icons/ConditionIcon';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import WeaponIcon from '../../icons/WeaponIcon';
import Icon from '@mdi/react';
import { mdiCardTextOutline } from '@mdi/js';
import { AuthContext } from 'src/contexts/AuthContext';
import useModalStore from 'src/stores/modalStore';
import RadialMenu from '../RadialMenu';
import useRadialMenuStore from 'src/stores/radialMenuStore';

const ItemRadialMenu = ({
  item,
  containerRef,
}: {
  item: Item;
  containerRef: ReactNode;
}) => {
  const { user } = useContext(AuthContext);
  const [conditionModal, setConditionModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const parts = location.pathname.split('/');

  const setBackgroundPath = useModalStore((state) => state.setBackgroundPath);

  const setMenuOpen = useRadialMenuStore((state) => state.setMenuOpen);

  const openConditionModal = () => {
    if (!conditionModal) {
      setBackgroundPath(location.pathname);
      if (parts?.includes('inventory')) {
        navigate(`${item?.id}/conditions`);
      } else {
        navigate(`${item?.itemTypes[0]}s/${item?.id}/conditions`);
      }
    } else {
      setBackgroundPath(null);
    }
    setConditionModal(!conditionModal);
  };

  const detailsPath = (() => {
    if (parts.includes('equipment') || parts.includes('deployments')) {
      return `../inventory/${item?.itemTypes[0]}s/${item?.id}`;
    } else if (
      parts.includes('codex') ||
      parts.includes('inventory') ||
      parts.includes('shop')
    ) {
      return `${item?.id}`;
    } else return ``;
  })();

  return (
    <RadialMenu
      elementId={item.id}
      containerRef={containerRef}
      array={[
        {
          label: 'Conditions',
          element: (
            <div
              onClick={() => {
                if (item.userId === user?.id) {
                  openConditionModal();
                  setMenuOpen(false);
                }
              }}
            >
              {parts.includes('conditions') && <Outlet />}
              <ConditionIcon className="size-8 text-inherit" />
            </div>
          ),
        },
        {
          label: 'Nothing',
          element: (
            <div>
              <WeaponIcon className="size-8 text-inherit" />
            </div>
          ),
        },
        {
          label: 'Item Detials',
          element: (
            <div
              onClick={() => {
                navigate(detailsPath);
                setMenuOpen(false);
              }}
            >
              <Icon path={mdiCardTextOutline} className="size-8 text-inherit" />
            </div>
          ),
        },
      ]}
    />
  );
};

export default ItemRadialMenu;
