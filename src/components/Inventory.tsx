import { useContext } from 'react';
import useActiveCharacterQuery from '../hooks/useActiveCharacterQuery/useActiveCharacterQuery';
import Loading from './Loading';
import { AuthContext } from '../contexts/AuthContext';
import VehicleMods from './VehicleMods';
import Weapons from './Weapons';
import Armor from './Armor';
import Cybernetics from './Cybernetics';
import Vehicles from './Vehicles';

const Inventory = ({ category }: { category: string }) => {
  const { apiUrl } = useContext(AuthContext);

  const {
    data: character,
    isPending,
    isLoading,
  } = useActiveCharacterQuery(apiUrl);

  const namePrefix = character?.firstName + ' ' + character?.lastName + "'s";

  if (isLoading || isPending) return <Loading />;

  return (
    <div className="flex w-full max-w-5xl flex-col gap-8">
      {category === 'weapons' ? (
        <Weapons
          title={namePrefix + ' ' + 'Weapons'}
          fetchOptions={{
            itemList: character?.characterInventory?.weapons,
            excludedKeywords: ['Vehicle', 'Cybernetic'],
          }}
          type="inventory"
          key={character?.id + ' ' + 'weapons'}
        />
      ) : category === 'armor' ? (
        <Armor
          title={namePrefix + ' ' + 'Armor'}
          fetchOptions={{
            itemList: character?.characterInventory?.armor,
            excludedKeywords: ['Cybernetic'],
          }}
          type="inventory"
          key={character?.id + ' ' + 'armor'}
        />
      ) : category === 'cybernetics' ? (
        <Cybernetics
          title={namePrefix + ' ' + 'Cybernetics'}
          fetchOptions={{
            itemList: character?.characterInventory?.cybernetics,
          }}
          type="inventory"
          key={character?.id + ' ' + 'cybernetics'}
        />
      ) : category === 'vehicle weapons' ? (
        <Weapons
          title={namePrefix + ' ' + 'Vehicle Weapons'}
          fetchOptions={{
            itemList: character?.characterInventory?.weapons,
            includedKeywords: ['Vehicle'],
          }}
          type="inventory"
          key={character?.id + ' ' + 'vehicle weapons'}
        />
      ) : category === 'vehicle modifications' ? (
        <VehicleMods
          title={namePrefix + ' ' + 'Vehicle Mods'}
          fetchOptions={{
            itemList: character?.characterInventory?.modifications,
          }}
          type="inventory"
          key={character?.id + ' ' + 'vehicle modifications'}
        />
      ) : category === 'vehicles' ? (
        <Vehicles
          title={namePrefix + ' ' + 'Vehicles'}
          fetchOptions={{ itemList: character?.characterInventory?.vehicles }}
          type="inventory"
          key={character?.id + ' ' + 'vehicles'}
        />
      ) : (
        <h1>Invalid category</h1>
      )}
    </div>
  );
};

export default Inventory;
