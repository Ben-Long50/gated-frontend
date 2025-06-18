import ConditionIcon from '../icons/ConditionIcon';
import { ReactNode, useContext } from 'react';
import Icon from '@mdi/react';
import { mdiCardTextOutline } from '@mdi/js';
import { AuthContext } from 'src/contexts/AuthContext';
import useActivateActionMutation from 'src/hooks/useActivateActionMutation/useActivateActionMutation';
import { Action } from 'src/types/action';
import ActionIcon from '../icons/ActionIcon';
import RadialMenu from './RadialMenu';
import useRadialMenuStore from 'src/stores/radialMenuStore';

const ActionRadialMenu = ({
  action,
  itemId,
  containerRef,
}: {
  action: Action;
  itemId: number;
  containerRef: ReactNode;
}) => {
  const { apiUrl } = useContext(AuthContext);

  const activateAction = useActivateActionMutation(apiUrl, itemId, action.id);

  const setMenuOpen = useRadialMenuStore((state) => state.setMenuOpen);

  return (
    <RadialMenu
      elementId={action.id}
      containerRef={containerRef}
      array={[
        {
          label: 'Activate Action',
          element: (
            <div
              onClick={() => {
                activateAction.mutate(action.active);
                setMenuOpen(false);
              }}
            >
              <ActionIcon className="size-8 text-inherit" />
            </div>
          ),
        },
        {
          label: 'Nothing',
          element: (
            <div>
              <ConditionIcon className="size-8 text-inherit" />
            </div>
          ),
        },
        {
          label: 'Nothing',
          element: (
            <div>
              <Icon path={mdiCardTextOutline} className="size-8 text-inherit" />
            </div>
          ),
        },
      ]}
    />
  );
};

export default ActionRadialMenu;
