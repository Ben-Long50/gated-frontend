import { mdiCartPlus } from '@mdi/js';
import Icon from '@mdi/react';
import useActiveCharacterQuery from '../hooks/useActiveCharacterQuery/useActiveCharacterQuery';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import useEditCartMutation from '../hooks/useEditCartMutation/useEditCartMutation';
import BtnIcon from './buttons/BtnIcon';

const CartButton = ({
  itemId,
  handleRemove,
}: {
  itemId: number;
  handleRemove?: () => void;
}) => {
  const { apiUrl } = useContext(AuthContext);

  const { data: character } = useActiveCharacterQuery(apiUrl);

  const editCart = useEditCartMutation(
    apiUrl,
    character?.id,
    character?.characterCart.id,
  );

  return (
    <BtnIcon
      path={mdiCartPlus}
      active={true}
      onClick={() => {
        if (character) {
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
