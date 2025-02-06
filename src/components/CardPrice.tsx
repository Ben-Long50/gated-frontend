import { mdiCartMinus, mdiCartPlus, mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import ProfitsIcon from './icons/ProfitsIcon';
import useActiveCharacterQuery from '../hooks/useActiveCharacterQuery/useActiveCharacterQuery';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import useeditCartMutation from '../hooks/useEditCartMutation/useEditCartMutation';
import Loading from './Loading';

const CardPrice = ({
  price,
  category,
  itemId,
  handleRemove,
}: {
  price: number;
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
    <>
      {editCart.isPending ? (
        <Loading className="text-secondary" size={1} />
      ) : (
        <button
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
          {cartIds.includes(itemId) ? (
            <Icon
              className="text-tertiary timing hover:text-yellow-300"
              path={mdiCartMinus}
              size={1}
            />
          ) : (
            <Icon
              className="text-tertiary timing hover:text-yellow-300"
              path={mdiCartPlus}
              size={1}
            />
          )}
        </button>
      )}
      {price ? (
        <p>{price + 'p'}</p>
      ) : (
        <Icon className="text-secondary" path={mdiClose} size={1.5} />
      )}
    </>
  );
};

export default CardPrice;
