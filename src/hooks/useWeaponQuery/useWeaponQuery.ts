import { useQuery } from '@tanstack/react-query';
import getWeaponById from './getWeaponById';

const useWeaponQuery = (apiUrl, authToken, weaponId) => {
  return useQuery({
    queryKey: ['weapon', weaponId],
    queryFn: async () => await getWeaponById(apiUrl, authToken, weaponId),
    throwOnError: false,
  });
};

export default useWeaponQuery;
