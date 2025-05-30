import { mdiCartPlus } from '@mdi/js';
import Icon from '@mdi/react';
import useActiveCharacterQuery from '../hooks/useActiveCharacterQuery/useActiveCharacterQuery';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import useEditCartMutation from '../hooks/useEditCartMutation/useEditCartMutation';
import BtnIcon from './buttons/BtnIcon';
import useCharacters from 'src/hooks/useCharacters';

const CartButton = ({
  itemId,
  handleRemove,
}: {
  itemId: number;
  handleRemove?: () => void;
}) => {
  const { apiUrl } = useContext(AuthContext);

  const { activeCharacter } = useCharacters();

  const editCart = useEditCartMutation(
    apiUrl,
    activeCharacter?.id,
    activeCharacter?.characterCart?.id,
  );

  return (
    <BtnIcon
      path={mdiCartPlus}
      active={true}
      onClick={() => {
        if (activeCharacter) {
          editCart.mutate(
            {
              itemId,
              value: 1,
            },
            {
              onSuccess: () => {
                if (handleRemove) {
                  handleRemove();
                }
              },
            },
          );
        }
      }}
    ></BtnIcon>
  );
};

export default CartButton;
