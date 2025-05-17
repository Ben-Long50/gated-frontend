import { useQuery } from '@tanstack/react-query';
import getArmor from './getArmor';
import { Item } from 'src/types/item';

const useArmorQuery = (apiUrl: string) => {
  return useQuery<Item[]>({
    queryKey: ['armor'],
    queryFn: async () => await getArmor(apiUrl),
  });
};

export default useArmorQuery;
