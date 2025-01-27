import { useContext } from 'react';
import useActiveCharacterQuery from '../hooks/useActiveCharacterQuery/useActiveCharacterQuery';
import Loading from './Loading';
import WeaponCard from './WeaponCard';
import { AuthContext } from '../contexts/AuthContext';
import useWeapons from '../hooks/useWeapons';
import useArmor from '../hooks/useArmor';
import ArmorCard from './ArmorCard';
import { WeaponWithKeywords } from 'src/types/weapon';
import { ArmorWithKeywords } from 'src/types/armor';
import useCybernetics from '../hooks/useCybernetics';
import { CyberneticWithKeywords } from 'src/types/cybernetic';
import CyberneticCard from './CyberneticCard';

const Inventory = ({ category }) => {
  const { apiUrl } = useContext(AuthContext);

  const {
    data: character,
    isPending,
    isLoading,
  } = useActiveCharacterQuery(apiUrl);

  console.log(character?.characterInventory);

  const weapons = useWeapons(undefined, character?.characterInventory?.weapons);

  const armor = useArmor(undefined, character?.characterInventory?.armor);

  const cybernetics = useCybernetics(
    character?.characterInventory?.cybernetics,
  );

  if (isLoading || isPending) return <Loading />;

  return (
    <div className="flex max-w-5xl flex-col gap-8">
      <h1>Weapons</h1>
      {weapons.filteredWeapons.map((weapon: WeaponWithKeywords) => {
        return <WeaponCard key={weapon.id} weapon={weapon} />;
      })}
      <h1>Armor</h1>
      {armor.filteredArmor.map((armor: ArmorWithKeywords) => {
        return <ArmorCard key={armor.id} armor={armor} />;
      })}
      <h1>Cybernetics</h1>
      {cybernetics.filteredCybernetics.map(
        (cybernetic: CyberneticWithKeywords) => {
          return <CyberneticCard key={cybernetic.id} cybernetic={cybernetic} />;
        },
      )}
    </div>
  );
};

export default Inventory;
