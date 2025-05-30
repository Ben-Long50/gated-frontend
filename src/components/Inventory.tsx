import Loading from './Loading';
import Items from './Items';
import { useLocation } from 'react-router-dom';
import useInventory from 'src/hooks/useInventory';
import useCharacters from 'src/hooks/useCharacters';

const Inventory = () => {
  const location = useLocation();
  const parts = location.pathname.split('/').filter(Boolean);
  const category = parts[parts.length - 1];

  const { activeCharacter, isLoading } = useCharacters();

  const { inventory } = useInventory(activeCharacter?.characterInventory);

  if (isLoading) return <Loading />;

  const itemList = inventory[category];

  return (
    <div className="flex w-full max-w-6xl flex-col gap-8">
      <Items itemList={itemList} key={activeCharacter?.id + ' ' + category} />
    </div>
  );
};

export default Inventory;
