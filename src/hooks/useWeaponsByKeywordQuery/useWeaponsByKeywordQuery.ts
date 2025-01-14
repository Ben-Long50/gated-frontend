import { useQuery } from '@tanstack/react-query';
import getWeaponsByKeyword from './getWeaponsByKeyword';

const useWeaponsByKeywordQuery = (apiUrl: string, keywordName: string) => {
  return useQuery({
    queryKey: ['weaponsByKeyword', keywordName],
    queryFn: async () => await getWeaponsByKeyword(apiUrl, keywordName),
    throwOnError: false,
  });
};

export default useWeaponsByKeywordQuery;
