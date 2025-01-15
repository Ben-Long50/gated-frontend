import { useQuery } from '@tanstack/react-query';
import getWeaponsByKeyword from './getWeaponsByKeyword';

const useWeaponsByKeywordQuery = (apiUrl: string, keywordNames: string[]) => {
  return useQuery({
    queryKey: ['weaponsByKeyword', keywordNames],
    queryFn: async () => await getWeaponsByKeyword(apiUrl, keywordNames),
    throwOnError: false,
  });
};

export default useWeaponsByKeywordQuery;
