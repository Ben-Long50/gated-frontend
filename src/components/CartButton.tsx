import { mdiCartPlus } from '@mdi/js';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import useEditCartMutation from '../hooks/useEditCartMutation/useEditCartMutation';
import BtnIcon from './buttons/BtnIcon';
import { Character } from 'src/types/character';

const CartButton = ({
  character,
  itemId,
}: {
  character: Character;
  itemId: number;
}) => {
  const { apiUrl } = useContext(AuthContext);

  const editCart = useEditCartMutation(
    apiUrl,
    character?.id,
    character?.characterCart?.id,
  );

  return (
    <BtnIcon
      path={mdiCartPlus}
      active={character ? true : false}
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
