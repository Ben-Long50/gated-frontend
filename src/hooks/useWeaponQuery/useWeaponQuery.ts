import { useQuery } from '@tanstack/react-query';
import getWeaponById from './getWeaponById';

const useWeaponQuery = (apiUrl: string, weaponId?: string) => {
  return useQuery({
    queryKey: ['weapon', weaponId],
    queryFn: async () => await getWeaponById(apiUrl, weaponId),
    throwOnError: false,
    enabled: !!weaponId,
  });
};

export default useWeaponQuery;
