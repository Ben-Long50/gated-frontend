import { mdiCartMinus, mdiCartPlus, mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import ProfitsIcon from './icons/ProfitsIcon';
import useActiveCharacterQuery from '../hooks/useActiveCharacterQuery/useActiveCharacterQuery';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import useAddToCartMutation from '../hooks/useAddToCartMutation/useAddToCartMutation';
import Loading from './Loading';

const CardPrice = ({ price, category, itemId }) => {
  const { apiUrl } = useContext(AuthContext);

  const { data: character } = useActiveCharacterQuery(apiUrl);
  const addToCart = useAddToCartMutation(apiUrl);

  const cartIds = Object.values(character.characterCart)
    .filter((item) => Array.isArray(item))
    .flat()
    .map((item) => item.id);

  return price ? (
    <>
      {addToCart.isPending ? (
        <Loading className="text-secondary" size={1} />
      ) : cartIds.includes(itemId) ? (
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            console.log('remove from cart');
          }}
        >
          <Icon
            className="text-tertiary timing hover:text-yellow-300"
            path={mdiCartMinus}
            size={1}
          />
        </button>
      ) : (
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            addToCart.mutate({ characterId: character?.id, category, itemId });
          }}
        >
          <Icon
            className="text-tertiary timing hover:text-yellow-300"
            path={mdiCartPlus}
            size={1}
          />
        </button>
      )}

      <ProfitsIcon className="size-6 shrink-0" />
      <p>{price + 'p'}</p>
    </>
  ) : (
    <Icon className="text-secondary" path={mdiClose} size={1.5} />
  );
};

export default CardPrice;
