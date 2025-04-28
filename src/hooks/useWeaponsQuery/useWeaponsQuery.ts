import { useQuery, useQueryClient } from '@tanstack/react-query';
import getWeapons from './getWeapons';
import { Weapon } from 'src/types/weapon';
import { useEffect } from 'react';

const useWeaponsQuery = (apiUrl: string) => {
  const queryClient = useQueryClient();

  const weapons = useQuery<Weapon[]>({
    queryKey: ['weapons'],
    queryFn: async () => await getWeapons(apiUrl),
    throwOnError: false,
  });

  useEffect(() => {
    if (weapons.data) {
      weapons.data?.forEach((weapon) => {
        queryClient.setQueryData(['weapon', weapon.id], weapon);
      });
    }
  }, [weapons.data, queryClient]);

  return weapons;
};

export default useWeaponsQuery;
