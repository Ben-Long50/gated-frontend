import { mdiCartMinus, mdiCartPlus } from '@mdi/js';
import Icon from '@mdi/react';
import useActiveCharacterQuery from '../hooks/useActiveCharacterQuery/useActiveCharacterQuery';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import useeditCartMutation from '../hooks/useEditCartMutation/useEditCartMutation';
import Loading from './Loading';

const CartButton = ({
  category,
  itemId,
  handleRemove,
}: {
  category: string;
  itemId: number;
  handleRemove?: () => void;
}) => {
  const { apiUrl } = useContext(AuthContext);

  const { data: character } = useActiveCharacterQuery(apiUrl);
  const editCart = useeditCartMutation(apiUrl);

  const cartIds = character?.characterCart
    ? Object.values(character?.characterCart)
        .filter((item) => Array.isArray(item))
        .flat()
        .map((item) => item.id)
    : [];

  return (
    <button
      className="hover:bg-primary timing group grid size-10 shrink-0 place-items-center rounded-full bg-yellow-300 shadow-md shadow-black hover:ring-2 hover:ring-yellow-300"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        editCart.mutate(
          {
            characterId: character?.id,
            cartId: character?.characterCart.id,
            category,
            itemId,
          },
          {
            onSuccess: () => {
              if (handleRemove) {
                handleRemove();
              }
            },
          },
        );
      }}
    >
      {editCart.isPending ? (
        <Loading
          className="text-zinc-950 group-hover:text-yellow-300"
          size={1}
        />
      ) : cartIds.includes(itemId) ? (
        <Icon
          className="timing text-zinc-950 group-hover:text-yellow-300"
          path={mdiCartMinus}
          size={1}
        />
      ) : (
        <Icon
          className="timing text-zinc-950 group-hover:text-yellow-300"
          path={mdiCartPlus}
          size={1}
        />
      )}
    </button>
  );
};

export default CartButton;
