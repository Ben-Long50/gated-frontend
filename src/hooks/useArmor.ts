import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Keyword } from './useKeywords';
import useArmorQuery from './useArmorQuery/useArmorQuery';

interface Armor {
  id: number;
  name: string;
  description: string;
  stats: Partial<ArmorStats>;
  price: number;
  keywords: Keyword[];
}

interface ArmorStats {
  armor: number;
  ward: number;
  block: number;
  power: number;
  weight: number;
}

const useArmor = () => {
  const { apiUrl, authToken } = useContext(AuthContext);

  const {
    data: armor,
    isLoading,
    isPending,
  } = useArmorQuery(apiUrl, authToken);

  const [filteredArmor, setFilteredArmor] = useState<Armor[]>([]);

  useEffect(() => {
    if (armor) {
      setFilteredArmor(armor);
    }
  }, [armor]);

  const filterByQuery = (query: string) => {
    const filteredArmor = armor.filter((armor) =>
      armor.name?.toLowerCase().includes(query.toLowerCase()),
    );

    setFilteredArmor(filteredArmor);
  };

  const resetList = () => {
    setFilteredArmor(armor);
  };

  return {
    filteredArmor,
    filterByQuery,
    resetList,
    isLoading,
    isPending,
  };
};

export default useArmor;
