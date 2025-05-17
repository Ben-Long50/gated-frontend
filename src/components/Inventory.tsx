import { useContext } from 'react';
import useActiveCharacterQuery from '../hooks/useActiveCharacterQuery/useActiveCharacterQuery';
import Loading from './Loading';
import { AuthContext } from '../contexts/AuthContext';
import Modifications from './Modifications';
import Weapons from './Weapons';
import Armor from './Armor';
import Cybernetics from './Cybernetics';
import Vehicles from './Vehicles';
import Items from './Items';
import { useLocation } from 'react-router-dom';
import Drones from './Drones';
import useInventory from 'src/hooks/useInventory';

const Inventory = () => {
  const { apiUrl } = useContext(AuthContext);
  const location = useLocation();
  const parts = location.pathname.split('/').filter(Boolean);
  const category = parts.pop();

  const {
    data: character,
    isPending,
    isLoading,
  } = useActiveCharacterQuery(apiUrl);

  const { inventory } = useInventory(character?.characterInventory);

  if (isLoading || isPending) return <Loading />;

  return (
    <div className="flex w-full max-w-6xl flex-col gap-8">
      {category === 'weapons' ? (
        <Weapons
          weaponList={inventory?.weapons}
          key={character?.id + ' ' + 'weapons'}
        />
      ) : category === 'armors' ? (
        <Armor
          armorList={inventory?.armor}
          key={character?.id + ' ' + 'armor'}
        />
      ) : category === 'augmentations' ? (
        <Cybernetics
          cyberneticList={inventory?.cybernetics}
          key={character?.id + ' ' + 'cybernetics'}
        />
      ) : category === 'items' ? (
        <Items
          itemList={inventory?.items}
          key={character?.id + ' ' + 'items'}
        />
      ) : category === 'vehicles' ? (
        <Vehicles
          vehicleList={inventory?.vehicles}
          key={character?.id + ' ' + 'vehicles'}
        />
      ) : category === 'modifications' ? (
        <Modifications
          modificationList={inventory?.modifications}
          key={character?.id + ' ' + 'vehicle modifications'}
        />
      ) : category === 'drones' ? (
        <Drones
          droneList={inventory?.drones}
          key={character?.id + ' ' + 'drones'}
        />
      ) : (
        <h1>Invalid category</h1>
      )}
    </div>
  );
};

export default Inventory;
