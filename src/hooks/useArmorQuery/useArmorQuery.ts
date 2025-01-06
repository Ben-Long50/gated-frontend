import { useQuery } from '@tanstack/react-query';
import getArmor from './getArmor';

const useArmorQuery = (apiUrl: string) => {
  return useQuery({
    queryKey: ['armor'],
    queryFn: async () => await getArmor(apiUrl),
  });
};

export default useArmorQuery;
