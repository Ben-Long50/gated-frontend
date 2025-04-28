import { useQuery } from '@tanstack/react-query';
import getWeaponById from './getWeaponById';

const useWeaponQuery = (apiUrl: string, weaponId: number, options: object) => {
  return useQuery({
    queryKey: ['weapon', weaponId],
    queryFn: async () => await getWeaponById(apiUrl, weaponId),
    throwOnError: false,
    ...options,
  });
};

export default useWeaponQuery;
