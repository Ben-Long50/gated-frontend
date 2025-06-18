import { mdiArrowULeftBottom, mdiMinus, mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import { ReactNode, useContext } from 'react';
import { AuthContext } from 'src/contexts/AuthContext';
import useProfitsMutation from 'src/hooks/useProfitsMutation/useProfitsMutation';
import useRadialMenuStore from 'src/stores/radialMenuStore';
import { Character } from 'src/types/character';
import RadialMenu from '../RadialMenu';

const ProfitRadialMenu = ({
  character,
  containerRef,
}: {
  character: Character;
  containerRef: ReactNode;
}) => {
  const { apiUrl } = useContext(AuthContext);
  const editProfits = useProfitsMutation(apiUrl, character.id);

  const setMenu = useRadialMenuStore((state) => state.setMenu);

  return (
    <RadialMenu
      elementId={character.id}
      containerRef={containerRef}
      array={[
        {
          label: 'Current Profits',
          element: (
            <div className="flex justify-center">
              <p className="text-2xl font-semibold !text-inherit">
                {character.profits || 0}
              </p>
            </div>
          ),
        },
        {
          label: 'Add Profit',
          element: (
            <div
              onClick={() => {
                editProfits.mutate(1);
              }}
            >
              <Icon className="text-inherit" path={mdiPlus} />
            </div>
          ),
        },
        {
          label: 'Back',
          element: (
            <div
              onClick={() => {
                setMenu('character', 'large', character.id);
              }}
            >
              <Icon className="text-inherit" path={mdiArrowULeftBottom} />
            </div>
          ),
        },
        {
          label: 'Remove Profit',
          element: (
            <div
              onClick={() => {
                editProfits.mutate(-1);
              }}
            >
              <Icon className="text-inherit" path={mdiMinus} />
            </div>
          ),
        },
      ]}
    />
  );
};

export default ProfitRadialMenu;
