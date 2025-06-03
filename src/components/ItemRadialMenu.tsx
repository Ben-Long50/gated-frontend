import { Item } from 'src/types/item';
import ConditionLinkField from './form_fields/ConditionLinkField';
import ConditionIcon from './icons/ConditionIcon';
import RadialMenu from './RadialMenu';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import WeaponIcon from './icons/WeaponIcon';
import Icon from '@mdi/react';
import { mdiCardTextOutline } from '@mdi/js';
import { AuthContext } from 'src/contexts/AuthContext';

const ItemRadialMenu = ({
  item,
  className,
}: {
  item: Item;
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

  const detailsPath = (() => {
    if (parts.includes('equipment') || parts.includes('deployments')) {
      return `${item?.itemTypes[0]}/${item?.id}`;
    } else if (parts.includes('codex') || parts.includes('inventory')) {
      return `${item?.id}`;
    } else return '';
  })();

  return (
    <RadialMenu className={`${className}`} size="large">
      <div
        onClick={() => toggleConditionModal()}
        data-active={item.userId === user?.id}
      >
        <ConditionIcon className="size-8 text-inherit" />
        <ConditionLinkField
          item={item}
          conditionModal={conditionModal}
          toggleConditionModal={toggleConditionModal}
        />
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
