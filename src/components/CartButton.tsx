import { mdiCartPlus } from '@mdi/js';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import useEditCartMutation from '../hooks/useEditCartMutation/useEditCartMutation';
import BtnIcon from './buttons/BtnIcon';
import useCharacters from 'src/hooks/useCharacters';

const CartButton = ({ itemId }: { itemId: number }) => {
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
      active={activeCharacter ? true : false}
      onClick={() => {
        editCart.mutate({
          itemId,
          value: 1,
        });
      }}
    />
  );
};

export default CartButton;
