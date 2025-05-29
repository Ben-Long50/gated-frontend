import { useContext } from 'react';
import useActiveCharacterQuery from '../hooks/useActiveCharacterQuery/useActiveCharacterQuery';
import Loading from './Loading';
import { AuthContext } from '../contexts/AuthContext';
import Items from './Items';
import { useLocation } from 'react-router-dom';
import useInventory from 'src/hooks/useInventory';

const Inventory = () => {
  const { apiUrl } = useContext(AuthContext);
  const location = useLocation();
  const parts = location.pathname.split('/').filter(Boolean);
  const category = parts[parts.length - 1];

  const {
    data: character,
    isPending,
    isLoading,
  } = useActiveCharacterQuery(apiUrl);

  const { inventory } = useInventory(character?.characterInventory);

  if (isLoading || isPending) return <Loading />;

  const itemList = inventory[category];

  return (
    <div className="flex w-full max-w-6xl flex-col gap-8">
      <Items itemList={itemList} key={character?.id + ' ' + category} />
    </div>
  );
};

export default Inventory;
