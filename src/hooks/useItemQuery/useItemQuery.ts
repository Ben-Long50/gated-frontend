import { useQuery } from '@tanstack/react-query';
import getItemById from './getItemById';
import getWeaponById from '../useWeaponQuery/getWeaponById';
import getArmorById from '../useArmorPieceQuery/getArmorById';
import getCyberneticById from '../useCyberneticQuery/getCyberneticById';
import getVehicleById from '../useVehicleQuery/getVehicleById';
import getDroneById from '../useDroneQuery/getDroneById';
import getModificationById from '../useModificationQuery/getModificationById';
import { Item } from 'src/types/item';

const useItemQuery = (apiUrl: string, itemId: number, category: string) => {
  return useQuery<Item>({
    queryKey: [category, itemId],
    queryFn: async () => {
      switch (category) {
        case 'weapon':
          return await getWeaponById(apiUrl, itemId);
        case 'armor':
          return await getArmorById(apiUrl, itemId);
        case 'augmentation':
          return await getCyberneticById(apiUrl, itemId);
        case 'vehicle':
          return await getVehicleById(apiUrl, itemId);
        case 'drone':
          return await getDroneById(apiUrl, itemId);
        case 'modification':
          return await getModificationById(apiUrl, itemId);
        case 'item':
          return await getItemById(apiUrl, itemId);
        default:
          break;
      }
    },

    enabled: !!category,
  });
};

export default useItemQuery;
