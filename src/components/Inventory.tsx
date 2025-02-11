import { useContext } from 'react';
import useActiveCharacterQuery from '../hooks/useActiveCharacterQuery/useActiveCharacterQuery';
import Loading from './Loading';
import { AuthContext } from '../contexts/AuthContext';
import VehicleMods from './VehicleMods';
import Weapons from './Weapons';
import Armor from './Armor';
import Cybernetics from './Cybernetics';
import Vehicles from './Vehicles';
import Items from './Items';

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
          mode="inventory"
          key={character?.id + ' ' + 'weapons'}
        />
      ) : category === 'armor' ? (
        <Armor
          title={namePrefix + ' ' + 'Armor'}
          fetchOptions={{
            itemList: character?.characterInventory?.armor,
            excludedKeywords: ['Cybernetic'],
          }}
          mode="inventory"
          key={character?.id + ' ' + 'armor'}
        />
      ) : category === 'cybernetics' ? (
        <Cybernetics
          title={namePrefix + ' ' + 'Cybernetics'}
          fetchOptions={{
            itemList: character?.characterInventory?.cybernetics,
          }}
          mode="inventory"
          key={character?.id + ' ' + 'cybernetics'}
        />
      ) : category === 'items' ? (
        <Items
          title={namePrefix + ' ' + 'Items'}
          fetchOptions={{
            itemList: character?.characterInventory?.items,
          }}
          mode="inventory"
          key={character?.id + ' ' + 'items'}
        />
      ) : category === 'gadgets' ? (
        <Items
          title={namePrefix + ' ' + 'Gadgets'}
          fetchOptions={{
            itemList: character?.characterInventory?.items,
            includedKeywords: ['gadget'],
          }}
          mode="inventory"
          key={character?.id + ' ' + 'gadgets'}
        />
      ) : category === 'anomalies' ? (
        <Items
          title={namePrefix + ' ' + 'Anomalies'}
          fetchOptions={{
            itemList: character?.characterInventory?.items,
            includedKeywords: ['anomaly'],
          }}
          mode="inventory"
          key={character?.id + ' ' + 'anomalies'}
        />
      ) : category === 'chemicalTherapy' ? (
        <Items
          title={namePrefix + ' ' + 'Chemical Therapy'}
          fetchOptions={{
            itemList: character?.characterInventory?.items,
            includedKeywords: ['chemicalTherapy'],
          }}
          mode="inventory"
          key={character?.id + ' ' + 'chemicalTherapy'}
        />
      ) : category === 'chemicalAssistance' ? (
        <Items
          title={namePrefix + ' ' + 'Chemical Assistance'}
          fetchOptions={{
            itemList: character?.characterInventory?.items,
            includedKeywords: ['chemicalAssistance'],
          }}
          mode="inventory"
          key={character?.id + ' ' + 'chemicalAssistance'}
        />
      ) : category === 'misc' ? (
        <Items
          title={namePrefix + ' ' + 'Misc. Consumables'}
          fetchOptions={{
            itemList: character?.characterInventory?.items,
            includedKeywords: ['misc'],
          }}
          mode="inventory"
          key={character?.id + ' ' + 'misc'}
        />
      ) : category === 'vehicle weapons' ? (
        <Weapons
          title={namePrefix + ' ' + 'Vehicle Weapons'}
          fetchOptions={{
            itemList: character?.characterInventory?.weapons,
            includedKeywords: ['Vehicle'],
          }}
          mode="inventory"
          key={character?.id + ' ' + 'vehicle weapons'}
        />
      ) : category === 'vehicle modifications' ? (
        <VehicleMods
          title={namePrefix + ' ' + 'Vehicle Mods'}
          fetchOptions={{
            itemList: character?.characterInventory?.modifications,
          }}
          mode="inventory"
          key={character?.id + ' ' + 'vehicle modifications'}
        />
      ) : category === 'vehicles' ? (
        <Vehicles
          title={namePrefix + ' ' + 'Vehicles'}
          fetchOptions={{ itemList: character?.characterInventory?.vehicles }}
          mode="inventory"
          key={character?.id + ' ' + 'vehicles'}
        />
      ) : (
        <h1>Invalid category</h1>
      )}
    </div>
  );
};

export default Inventory;
