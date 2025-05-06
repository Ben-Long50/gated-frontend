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

  if (isLoading || isPending) return <Loading />;

  return (
    <div className="flex w-full max-w-6xl flex-col gap-8">
      {category === 'weapons' ? (
        <Weapons
          weaponList={character?.characterInventory?.weapons}
          key={character?.id + ' ' + 'weapons'}
        />
      ) : category === 'armor' ? (
        <Armor
          armorList={character?.characterInventory?.armor}
          key={character?.id + ' ' + 'armor'}
        />
      ) : category === 'cybernetics' ? (
        <Cybernetics
          cyberneticList={character?.characterInventory?.cybernetics}
          key={character?.id + ' ' + 'cybernetics'}
        />
      ) : category === 'items' ? (
        <Items
          itemList={character?.characterInventory?.items}
          key={character?.id + ' ' + 'items'}
        />
      ) : category === 'vehicles' ? (
        <Vehicles
          vehicleList={character?.characterInventory?.vehicles}
          key={character?.id + ' ' + 'vehicles'}
        />
      ) : category === 'modifications' ? (
        <Modifications
          modificationList={character?.characterInventory?.modifications}
          key={character?.id + ' ' + 'vehicle modifications'}
        />
      ) : category === 'drones' ? (
        <Drones
          droneList={character?.characterInventory?.drones}
          key={character?.id + ' ' + 'drones'}
        />
      ) : (
        <h1>Invalid category</h1>
      )}
    </div>
  );
};

export default Inventory;
