import { useQuery } from '@tanstack/react-query';
import getEquippedItems from './getEquippedItems';

const useEquipmentQuery = (
  apiUrl: string,
  characterId: number,
  inventoryId: number,
) => {
  return useQuery({
    queryKey: ', 'equipment', inventoryId],
    queryFn: async () =>
      await getEquippedItems(apiUrl, characterId, inventoryId),
  });
};

export default useEquipmentQuery;
