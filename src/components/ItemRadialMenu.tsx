import { Item } from 'src/types/item';
import ConditionModal from './modals/ConditionModal';
import ConditionIcon from './icons/ConditionIcon';
import RadialMenu from './RadialMenu';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import WeaponIcon from './icons/WeaponIcon';
import Icon from '@mdi/react';
import { mdiCardTextOutline } from '@mdi/js';
import { AuthContext } from 'src/contexts/AuthContext';
import useModalStore from 'src/stores/modalStore';

const ItemRadialMenu = ({
  item,
  path,
  className,
}: {
  item: Item;
  path?: string;
  className?: string;
}) => {
  const { user } = useContext(AuthContext);
  const [conditionModal, setConditionModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const parts = location.pathname.split('/');

  const setBackgroundPath = useModalStore((state) => state.setBackgroundPath);

  const toggleConditionModal = () => {
    if (!conditionModal) {
      setBackgroundPath(location.pathname);
    } else {
      setBackgroundPath(null);
    }
    setConditionModal(!conditionModal);
  };

  const detailsPath = (() => {
    if (path) return path;
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
    <RadialMenu className={`${className}`} size="large">
      <div
        onClick={() => toggleConditionModal()}
        data-active={item.userId === user?.id}
      >
        <ConditionIcon className="size-8 text-inherit" />
      </div>
      <div
        onClick={() =>
          navigate(parts.includes('campaigns') ? `${item.id}` : `${item.id}`)
        }
        data-active={false}
      >
        <WeaponIcon className="size-8 text-inherit" />
      </div>
      <div onClick={() => navigate(detailsPath)}>
        <Icon path={mdiCardTextOutline} className="size-8 text-inherit" />
      </div>
    </RadialMenu>
  );
};

export default ItemRadialMenu;
