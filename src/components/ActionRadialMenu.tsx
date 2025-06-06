import ConditionIcon from './icons/ConditionIcon';
import RadialMenu from './RadialMenu';
import { useContext } from 'react';
import Icon from '@mdi/react';
import { mdiCardTextOutline } from '@mdi/js';
import { AuthContext } from 'src/contexts/AuthContext';
import useActivateActionMutation from 'src/hooks/useActivateActionMutation/useActivateActionMutation';
import { Action } from 'src/types/action';
import ActionIcon from './icons/ActionIcon';

const ActionRadialMenu = ({
  action,
  itemId,
  className,
}: {
  action: Action;
  itemId: number;
  className?: string;
}) => {
  const { apiUrl } = useContext(AuthContext);

  const activateAction = useActivateActionMutation(apiUrl, itemId, action.id);

  return (
    <RadialMenu className={`${className}`} size="large">
      <div onClick={() => activateAction.mutate(action.active)}>
        <ActionIcon className="size-8 text-inherit" />
      </div>
      <div data-active={false}>
        <ConditionIcon className="size-8 text-inherit" />
      </div>
      <div data-active={false}>
        <Icon path={mdiCardTextOutline} className="size-8 text-inherit" />
      </div>
    </RadialMenu>
  );
};

export default ActionRadialMenu;
