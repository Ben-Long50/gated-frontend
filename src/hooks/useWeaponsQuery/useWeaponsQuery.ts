import { useQuery, useQueryClient } from '@tanstack/react-query';
import getWeapons from './getWeapons';
import { useEffect } from 'react';
import { Item } from 'src/types/item';

const useWeaponsQuery = (apiUrl: string) => {
  const queryClient = useQueryClient();

  const weapons = useQuery<Item[]>({
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
