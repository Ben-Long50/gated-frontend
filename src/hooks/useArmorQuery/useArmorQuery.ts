import { useQuery } from '@tanstack/react-query';
import getArmor from './getArmor';

const useArmorQuery = (apiUrl, authToken) => {
  return useQuery({
    queryKey: ['armor'],
    queryFn: async () => await getArmor(apiUrl, authToken),
  });
};

export default useArmorQuery;
