import { mdiCartMinus, mdiCartPlus } from '@mdi/js';
import Icon from '@mdi/react';
import useActiveCharacterQuery from '../hooks/useActiveCharacterQuery/useActiveCharacterQuery';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Loading from './Loading';
import useEditCartMutation from '../hooks/useEditCartMutation/useEditCartMutation';

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

  const editCart = useEditCartMutation(
    apiUrl,
    character?.id,
    character?.characterCart.id,
  );

  return (
    <button
      className="hover:bg-primary timing group grid size-10 shrink-0 place-items-center rounded-full bg-yellow-300 shadow-md shadow-black hover:ring-2 hover:ring-yellow-300"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        if (character) {
          editCart.mutate(
            {
              category,
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
    >
      <Icon
        className="timing text-zinc-950 group-hover:text-yellow-300"
        path={mdiCartPlus}
        size={1}
      />
    </button>
  );
};

export default CartButton;
