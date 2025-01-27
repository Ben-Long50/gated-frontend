import useActiveCharacterQuery from '../hooks/useActiveCharacterQuery/useActiveCharacterQuery';
import WeaponForm from './WeaponForm';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Loading from './Loading';

const WeaponModifyForm = () => {
  const { apiUrl } = useContext(AuthContext);

  const {
    data: character,
    isLoading,
    isPending,
  } = useActiveCharacterQuery(apiUrl);

  if (isLoading || isPending) return <Loading />;

  return <WeaponForm weaponList={character.characterInventory?.weapons} />;
};

export default WeaponModifyForm;
