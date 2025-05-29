import { Item } from 'src/types/item';
import ConditionLinkField from './form_fields/ConditionLinkField';
import ConditionIcon from './icons/ConditionIcon';
import RadialMenu from './RadialMenu';
import { useLocation, useNavigate } from 'react-router-dom';
import CharacterIcon from './icons/CharacterIcon';
import { useState } from 'react';
import WeaponIcon from './icons/WeaponIcon';
import { mdiDotsHorizontal } from '@mdi/js';
import Icon from '@mdi/react';

const ItemRadialMenu = ({
  item,
  className,
}: {
  item: Item;
  className?: string;
}) => {
  const [conditionModal, setConditionModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const parts = location.pathname.split('/');

  const toggleConditionModal = () => {
    setConditionModal(!conditionModal);
  };

  return (
    <div className={className}>
      <Icon
        path={mdiDotsHorizontal}
        className="text-secondary hover:text-accent shrink-0"
      />
      <RadialMenu radius={80}>
        <div onClick={() => toggleConditionModal()}>
          <ConditionIcon className="size-8 text-inherit group-hover:scale-125" />
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
        >
          <WeaponIcon className="size-8 text-inherit group-hover:scale-125" />
        </div>
        <div
          onClick={() =>
            navigate(
              parts.includes('campaigns') ? `items/${item.id}` : `${item.id}`,
            )
          }
        >
          <CharacterIcon className="size-8 text-inherit group-hover:scale-125" />
        </div>
      </RadialMenu>
    </div>
  );
};

export default ItemRadialMenu;
